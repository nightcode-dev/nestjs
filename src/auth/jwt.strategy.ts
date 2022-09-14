import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { JwtPayload } from "./DTO/jwt-payload.interface";
import { User } from "./user.entity";
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private authRepo: Repository<User>,
    ){
        super({
            secretOrKey:"safePassword",
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username} = payload
        const user:User = await this.authRepo.findOne({
            where:{
                username
            }
        })

        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}