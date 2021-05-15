import {
  Entity, Column, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';

@Entity('users')
export default class Users extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'cid' })
    cid: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'level' })
    level: number;

    static async checkLevel(cid: string, password: string, level: number): Promise<number> {
      const user = await Users.findOne({
        where: {
          cid,
        },
      });

      if (user.password === password) {
        if (user.level > level) {
          return 0;
        }

        return -1;
      }
      return -2;
    }
}
