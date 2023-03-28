import { IInflationRepo } from "src/domain/inflation-rep/iinflation-repo";
import { InflationModel } from "src/domain/inflation-rep/inflation-model";
import { IProductRepo } from "src/domain/product/iproduct-repo";

export class CalculateBasicDailyPriceUseCase {
    constructor(
        private readonly productRepo: IProductRepo,
        private readonly inflationRepo: IInflationRepo
    ) {

    }
    async execute() {
        const now = new Date()
        now.setHours(0, 0, 0, 0);
        const productsOfTheDay = await this.productRepo.findAll({ where: { createdAt: { gte: now } } })
        const productCodePriceMap = {}
        for (const product of productsOfTheDay) {
            if (!productCodePriceMap[product.productCode]) {
                productCodePriceMap[product.productCode] = product.price
                continue
            }
            else if (productCodePriceMap[product.productCode] > product.price) {
                productCodePriceMap[product.productCode] = product.price
            }
        }
        let total = 0
        Object.values(productCodePriceMap).forEach((value: number) => {
            total = total + value
        })
        await this.inflationRepo.save(new InflationModel({ totalPrice: total, createdAt: new Date() }))
    }
}