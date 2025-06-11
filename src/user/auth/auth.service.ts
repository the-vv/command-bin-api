import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user.service";
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { userDocument } from "../schema/user.schema";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async signIn(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error("Account not found, please register first.");
        }
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id as string, email: user.email, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id as string,
                name: user.name,
                email: user.email
            }
        };
    }

    public async signUp(name: string, email: string, password: string) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException("Email already exists, please login instead.");
        }
        const hashedPassword = hashSync(password, 10);
        const newUser: userDocument = await this.userService.create({ name, email, password: hashedPassword });
        return {
            id: newUser.id as string,
            name: newUser.name,
            email: newUser.email
        };
    }

}