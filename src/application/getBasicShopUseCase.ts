import { Product } from "src/domain/product/product-model";
import { IProductRepo } from "src/domain/product/iproduct-repo";
import { IProductScraper } from "src/domain/product/iproduct-scraper";
import { BASIC_PRODUCTS } from "src/domain/product/constants/basic-products";
import { asyncAwait } from "src/infra/utils/async-await";

export class GetBasicShopUseCase {
    constructor(private productScraper: IProductScraper, private readonly productRepo: IProductRepo) { }
    async execute() {
        const savedProducts: Partial<Product>[] = []
        for (const product of BASIC_PRODUCTS) {
            console.info(`--- Getting ${product} ---`)
            const products = await this.productScraper.getProducts({ gtin: product.gtin })
            await asyncAwait(3000)
            console.info(`--- Start Processing ${product} ---`)
            for (const product of products) {
                const p = new Product(Product.convertProps(product.produto))
                const created = await this.productRepo.save(p)
                savedProducts.push(created)
            }
            console.info(`--- End Processing ${product} ---`)
        }
        return savedProducts
    }
}