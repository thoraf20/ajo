import { Status } from '../utils'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Organization } from './organization'

@Entity()
@Unique(['name'])
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @Index()
  organizationId!: string

  @ManyToOne(() => Organization)
  organization!: Organization

  @Column({ nullable: false })
  name: string

  @Column({ nullable: true, enum: Status, default: Status.ACTIVE })
  status: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
