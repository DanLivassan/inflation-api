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
    productCode: string, ncm: bigint, ncmGroup: string, description: string, price: number, picture: string
}
export class Product {
    productCode: string;
    ncm: bigint;
    ncmGroup: string;
    description: string;
    price: number;
    picture: string;

    constructor({ description, ncm, ncmGroup, picture, price, productCode }: IProps) {
        this.description = description;
        this.ncm = ncm;
        this.ncmGroup = ncmGroup;
        this.picture = picture;
        this.price = price;
        this.productCode = productCode
    }

    toJSON() {
        return {
            description: this.description,
            ncm: this.ncm,
            ncmGroup: this.ncmGroup,
            price: this.price,
            picture: this.picture,
            productCode: this.productCode
        }
    }

    static convertProps(objectFromAPI: any): IProps {
        return {
            description: objectFromAPI.descricao,
            price: objectFromAPI.precoUnitario,
            picture: objectFromAPI.foto,
            productCode: objectFromAPI.codProduto,
            ncm: objectFromAPI.ncm,
            ncmGroup: objectFromAPI.ncmGroup
        }
    }
}

new Product({ description: "description", ncm: BigInt(115), ncmGroup: "group", picture: "picture", price: 1, productCode: "code" })