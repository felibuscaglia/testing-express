import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Map } from "./Map.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany((type) => Map, (map) => map.user)
  maps: Map[];
}
