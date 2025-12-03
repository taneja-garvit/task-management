import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('teams')
@UseGuards(AuthGuard)
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Post()
    create(@Body('name') name: string) {
        return this.teamService.createTeam(name);
    }

    @Post(':id/members')
    addMember(@Param('id') id: string, @Body('username') username: string) {
        return this.teamService.addMember(id, username);
    }

    @Get()
    findAll() {
        return this.teamService.findAllTeams();
    }
}
