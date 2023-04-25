import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { DEFAULT_MAP_NAME } from "../lib/constants";

@Entity()
export class Map extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "map_id",
  })
  id: string;

  @Column({ nullable: false, default: DEFAULT_MAP_NAME })
  name: string;

  @Column("text", { nullable: true })
  description?: string;

  @ManyToOne((type) => User, (user) => user.maps)
  user: User;
}
