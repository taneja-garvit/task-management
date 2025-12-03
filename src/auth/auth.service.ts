import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async login(user: any) {
        const expectedUser = this.configService.get<string>('AUTH_USERNAME');
        const expectedPass = this.configService.get<string>('AUTH_PASSWORD');

        if (!expectedUser || !expectedPass) {
            throw new UnauthorizedException('Server auth configuration missing');
        }

        if (user.username !== expectedUser || user.password !== expectedPass) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
