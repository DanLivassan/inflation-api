import { Injectable } from "@nestjs/common";
import { IProductRepo } from "src/domain/product/iproduct-repo";
import { Product } from "src/domain/product/product-model";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ProductPrismaRepo implements IProductRepo {
    constructor(private readonly prismaService: PrismaService) { }
    async save(product: Product): Promise<Partial<Product>> {
        return await this.prismaService.product.create({ data: product })
    }
    async findAll(): Promise<Partial<Product>[]> {
        return await this.prismaService.product.findMany()
    }
}