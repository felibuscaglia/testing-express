import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Map extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "map_id",
  })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column("text", { nullable: true })
  description?: string;

  @ManyToOne((type) => User, (user) => user.maps)
  user: User;
}
