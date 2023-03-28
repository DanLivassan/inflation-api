import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { IProductRepo } from "src/domain/product/iproduct-repo";
import { Product } from "src/domain/product/product-model";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ProductPrismaRepo implements IProductRepo {
    constructor(private readonly prismaService: PrismaService) { }
    async save(product: Product): Promise<Partial<Product>> {
        return await this.prismaService.product.create({ data: product })
    }
    async findAll(productFindManyArgs?: Prisma.ProductFindManyArgs): Promise<Partial<Product>[]> {

        return await this.prismaService.product.findMany(productFindManyArgs)
    }
}