import { DEFAULT_MAP_LAYER_NAME } from "../lib/constants";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Map } from "./Map.entity";

@Entity({ name: "map_layer" })
export class Layer extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "map_layer_id",
  })
  id: string;

  @Column({ nullable: false, default: DEFAULT_MAP_LAYER_NAME })
  name: string;

  @ManyToOne((type) => Map, (map) => map.layers)
  map: Map;
}
