import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'


@Entity('users')
export default class Users extends BaseEntity {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "cid"})
    cid: string;

    @Column({name: "password"})
    password: string;

    @Column({name: "level"})
    level: number;

    static async checkLevel(cid: string, password: string, level: number): Promise<number> {
        let user = await Users.findOne({
            where: {
                cid: cid
            }
        })

        if(user.password == password){
            if(user.level > level) {
                return 0
            }
            else {
                return -1
            }
        } else {
            return -2
        }
    }
}