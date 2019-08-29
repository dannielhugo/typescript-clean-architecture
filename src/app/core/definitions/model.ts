import { Entity } from '../entities/entity';

export interface Model {
  toEntity(): Entity;
}
