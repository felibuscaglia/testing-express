import { DEFAULT_MAP_LAYER_NAME } from "../lib/constants";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Map } from "./Map.entity";
import { Place } from "./Place.entity";

@Entity({ name: "map_layer" })
export class Layer extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "map_layer_id",
  })
  id: string;

  @Column({ nullable: false, default: DEFAULT_MAP_LAYER_NAME })
  name: string;

  @Column({ nullable: false })
  mapId: string;

  @ManyToOne((type) => Map, (map) => map.layers)
  @JoinColumn({ name: "mapId" })
  map: Map;

  @OneToMany((type) => Place, (place) => place.layer)
  places: Place[];
}
