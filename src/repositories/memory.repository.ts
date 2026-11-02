import { Entity } from "../models/entities";

/** Contrato assíncrono: permite trocar o armazenamento em memória por banco no futuro. */
export interface Repository<T extends Entity> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | undefined>;
  create(entity: T): Promise<T>;
  update(id: number, changes: Partial<T>): Promise<T | undefined>;
  delete(id: number): Promise<boolean>;
}

export class MemoryRepository<T extends Entity> implements Repository<T> {
  private readonly items = new Map<number, T>();

  async findAll(): Promise<T[]> { return [...this.items.values()]; }
  async findById(id: number): Promise<T | undefined> { return this.items.get(id); }
  async create(entity: T): Promise<T> {
    this.items.set(entity.id, entity);
    return entity;
  }
  async update(id: number, changes: Partial<T>): Promise<T | undefined> {
    const current = this.items.get(id);
    if (!current) return undefined;
    const updated = Object.assign(current, changes);
    this.items.set(id, updated);
    return updated;
  }
  async delete(id: number): Promise<boolean> { return this.items.delete(id); }
}
