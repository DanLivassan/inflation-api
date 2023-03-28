import { IInflationRepo } from "src/domain/inflation-rep/iinflation-repo";

export class GetDailyPricesUseCase {
    constructor(
        private readonly inflationRepo: IInflationRepo
    ) {

    }
    async execute() {

        return await this.inflationRepo.findAll({})
    }
}