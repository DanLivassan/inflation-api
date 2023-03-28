import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { IInflationRepo } from "src/domain/inflation-rep/iinflation-repo";
import { InflationModel } from "src/domain/inflation-rep/inflation-model";
import { Product } from "src/domain/product/product-model";
import { PrismaService } from "./prisma.service";

@Injectable()
export class InflationPrismaRepo implements IInflationRepo {
    constructor(private readonly prismaService: PrismaService) { }
    async save(inflation: InflationModel): Promise<Partial<InflationModel>> {
        return await this.prismaService.inflationRepresentation.create({ data: inflation })
    }
    async findAll(findManyArgs?: Prisma.InflationRepresentationFindManyArgs): Promise<Partial<InflationModel>[]> {
        return await this.prismaService.inflationRepresentation.findMany(findManyArgs)
    }
}