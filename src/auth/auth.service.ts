import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './user.entity';
import * as bcyrpt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './DTO/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepo: Repository<User>,
    private jwtService:JwtService
  ) {}

  async signup(createUserDto:CreateUserDto):Promise<void>{
    const { username,password } = createUserDto

    var salt = await bcyrpt.genSalt()
    var saltpassword = await bcyrpt.hash(password,salt)

    const user = this.authRepo.create({username,password:saltpassword})
    try{
      await this.authRepo.save(user)
    }catch(err){
      if(err.code == 'ER_DUP_ENTRY'){
        throw new ConflictException('username already exists')
      }else{
        throw new InternalServerErrorException()
      }
    }
  }

  async signin(createUserDto:CreateUserDto):Promise<{acessToken}>{
    const {username,password} = createUserDto
    const user = await this.authRepo.findOne({
      where:{
        username
      }
    })
    if(user && (await bcyrpt.compare(password,user.password))){
      const payload:JwtPayload = {username}
      const acessToken : string = await this.jwtService.sign(payload)
      return { acessToken}
    } else {
      throw new UnauthorizedException('are you sure?i cant find any user with this username and password')
    }

  }
}
