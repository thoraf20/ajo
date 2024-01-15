import { Status } from '../utils'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@Unique(['name', 'slug'])
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: true })
  logo: string

  @Column({ nullable: false })
  slug: string

  @Column({ nullable: true, enum: Status, default: Status.ACTIVE })
  status: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}