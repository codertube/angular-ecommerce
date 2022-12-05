import {Product} from "./product.model";

export class ProductOrder {
    product: Product;
    quantity: number;
    isProductInCart: boolean;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}