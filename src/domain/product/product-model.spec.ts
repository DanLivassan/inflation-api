import { Product } from "./product-model";

const payloadExample = {
    "score": null,
    "codProduto": "414670800001771033",
    "tipoNFe": 65,
    "gtin": null,
    "anp": null,
    "ncm": 22030000,
    "cod_nfce": "6157783987",
    "ncmGrupo": "BEBIDAS ALCOOLICAS",
    "descricao": "CERVEJA CORONA EXTRA (330ML) (LONG NECK)",
    "precoUnitario": 6.49,
    "precoLiquido": 0.49,
    "precoBruto": 0.49,
    "desconto": 6,
    "unidade": "UN",
    "data": "2023-03-24 20:09:31-00:00",
    "intervalo": "há 15 hora(s), 36 minuto(s) e 51 segundo(s)",
    "timeSpan": 56211,
    "foto": "https://api.precodahora.sefaz.ba.gov.br/v1/images/default"
}

interface IProps {
    productCode: string, ncm: string, ncmGroup: string, description: string, price: number, picture: string
}
describe('Product model test', () => {
    it('should create a product', () => {
        const props = Product.convertProps(payloadExample)
        const product = new Product(props)
        expect(product).toBeTruthy()
    })
    it('should return as JSON', () => {
        const props = Product.convertProps(payloadExample)
        const product = new Product(props)
        expect(product.toJSON()).toStrictEqual({
            "description": "CERVEJA CORONA EXTRA (330ML) (LONG NECK)",
            "ncm": 22030000,
            "ncmGroup": undefined,
            "picture": "https://api.precodahora.sefaz.ba.gov.br/v1/images/default",
            "price": 6.49,
            "productCode": "414670800001771033",
        })
    })
});