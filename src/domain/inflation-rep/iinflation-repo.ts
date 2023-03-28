import { InflationModel } from "./inflation-model";

export interface IInflationRepo {
    save(inflationModel: InflationModel): Promise<Partial<InflationModel>>
    findAll(findArgs: unknown): Promise<Partial<InflationModel>[]>
}