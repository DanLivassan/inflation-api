export interface IProductScraper {
    getHeaders()
    getProducts(data: { gtin?: string, termo?: string }): Promise<any[]>
}
