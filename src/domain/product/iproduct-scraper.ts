export interface IProductScraper {
    getHeaders()
    getProducts(termo: string): Promise<any[]>
}
