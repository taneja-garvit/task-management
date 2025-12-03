import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createTeam(name: string): Promise<Team> {
        const team = this.teamRepository.create({ name, members: [] });
        return this.teamRepository.save(team);
    }

    async createUser(username: string): Promise<User> {
        const user = this.userRepository.create({ username });
        return this.userRepository.save(user);
    }

    async addMember(teamId: string, username: string): Promise<Team> {
        let user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            user = await this.createUser(username);
        }

        console.log(`Looking for team with ID: ${teamId}`);
        try {
            const team = await this.teamRepository.findOne({ where: { _id: new ObjectId(teamId) } as any });
            console.log('Team found:', team);
            if (!team) {
                throw new NotFoundException('Team not found');
            }

            if (!team.members || !Array.isArray(team.members)) {
                team.members = [];
            }

            if (!team.members.find(m => m.username === username)) {
                team.members.push({ username: user.username });
                try {
                    return await this.teamRepository.save(team);
                } catch (saveError) {
                    console.error('Error saving team with new member:', saveError);
                    throw new InternalServerErrorException('Failed to add member to team');
                }
            }

            return team;
        } catch (error) {
            console.error('Error finding team:', error);
            throw error;
        }
    }

    async findAllTeams(): Promise<Team[]> {
        return this.teamRepository.find();
    }
}
