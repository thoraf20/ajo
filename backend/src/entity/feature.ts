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
@Unique(['name'])
export class Feature extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ unique: true, nullable: false })
  name: string

  @Column('simple-array')
  permission: string[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
