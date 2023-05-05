import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Layer } from "./Layer.entity";

@Entity({ name: "map_place" })
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "map_place_id",
  })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 13, scale: 13, nullable: false })
  latitude: number;

  @Column('decimal', { precision: 13, scale: 13, nullable: false })
  longitude: number;

  @Column({ nullable: false })
  layerId: string;

  @ManyToOne((type) => Layer, (layer) => layer.places)
  @JoinColumn({ name: "layerId" })
  layer: Layer;
}
