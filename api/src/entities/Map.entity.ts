import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { DEFAULT_MAP_NAME } from "../lib/constants";
import { Layer } from "./Layer.entity";

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

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;

  @OneToMany((type) => Layer, (layer) => layer.map)
  layers: Layer[];
}
