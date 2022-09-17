import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Tasks} from '../tasks/tasks.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique:true
  })
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Tasks,tasks => tasks.user,{eager:true})
  tasks:Tasks[]
}
