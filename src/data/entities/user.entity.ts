import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100, nullable: false })
    user_name: string

    @Column({ type: 'varchar', length: 100 })
    email: string

    @Column({ type: 'varchar', length: 250, nullable: true })
    avatar: string

    @Column({ type: 'bit', default: false, })
    verified: number

    @Column({ type: 'datetime2', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ type: 'datetime2', nullable: true })
    updated_at: Date
}