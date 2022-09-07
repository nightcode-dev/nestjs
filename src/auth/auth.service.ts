import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepo: Repository<User>,
  ) {}

  async signup(createUserDto:CreateUserDto):Promise<void>{
    const { username,password } = createUserDto
    const user = this.authRepo.create({username,password})
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
}
