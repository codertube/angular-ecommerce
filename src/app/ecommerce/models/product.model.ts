import { Category } from "./category.model";

export class Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    unitsInStock: number;
    category:Category;

    constructor(id: number, name: string, price: number, pictureUrl: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = pictureUrl;
    }
}