import { Product } from "src/domain/product/product-model";
import { IProductRepo } from "src/domain/product/iproduct-repo";
import { IProductScraper } from "src/domain/product/iproduct-scraper";

export class getBeerPriceUseCase {
    constructor(private productScraper: IProductScraper, private readonly productRepo: IProductRepo) { }
    async execute() {
        const products = await this.productScraper.getProducts({ termo: 'CERVEJA' })
        const savedProducts: Partial<Product>[] = []
        for (const product of products) {
            const p = new Product(Product.convertProps(product.produto))
            const created = await this.productRepo.save(p)
            savedProducts.push(created)
        }
        return savedProducts
    }
}