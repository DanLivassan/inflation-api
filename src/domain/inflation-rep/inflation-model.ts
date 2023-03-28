

interface IProps {
    totalPrice: number, createdAt: Date
}
export class InflationModel {
    createdAt: Date;
    totalPrice: number;

    constructor({ createdAt, totalPrice }: IProps) {
        this.createdAt = createdAt;
        this.totalPrice = totalPrice;
    }

    toJSON() {
        return {
            createdAt: this.createdAt,
            totalPrice: this.totalPrice,

        }
    }


}
