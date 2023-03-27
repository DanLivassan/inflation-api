import { Product } from "./product-model";

export interface IProductRepo {
    save(product: Product): Promise<Partial<Product>>
    findAll(): Promise<Partial<Product>[]>
}