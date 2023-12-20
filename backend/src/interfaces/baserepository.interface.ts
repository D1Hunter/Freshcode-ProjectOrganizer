export interface IBaseRepository<T> {
    create(dto: Object): Promise<T>;
    getOneById(id: string): Promise<T | null>;
    getAll(): Promise<Array<T>>;
    update(id: string, dto: Object): Promise<T>;
    delete(id: string): Promise<T | null>;
}