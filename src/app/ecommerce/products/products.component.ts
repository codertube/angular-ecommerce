import {Component, OnInit} from '@angular/core';
import {ProductOrder} from "../models/product-order.model";
import {EcommerceService} from "../services/ecommerce.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ProductOrders} from "../models/product-orders.model";
import {Product} from "../models/product.model";
import { Category } from '../models/category.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    productOrders: ProductOrder[] = [];
    products: Product[] = [];
    selectedProductOrder: ProductOrder;
    private shoppingCartOrders: ProductOrders;
    sub: Subscription;
    productSelected: boolean = false;
    categories: Category[];
    //selectedCategory: any;
    public selectedCategory: Category = {
        id: 0,
        type: "All"
     }

    constructor(private ecommerceService: EcommerceService) {
        // this.categories=[
        //     {id:0, type:"All"},
        //     {id:1, type:"Bakes"},
        //     {id:2, type:"Used-Items"}];
        // this.selectedCategory = this.categories[0];
    }

    ngOnInit() {
        this.productOrders = [];
        this.onResetClick();
        this.loadCategories();
        this.loadProducts();
        this.loadOrders();
    }

    onChange(value:any){
        this.selectedCategory = (this.categories.filter(obj=>obj.type===value))[0];
    }

    imageClick(clickedProduct: ProductOrder) {
        clickedProduct.quantity++;
        clickedProduct.product.unitsInStock--;
    }

    reduceQuantity(clickedProduct: ProductOrder){
        if(clickedProduct.quantity>0 && clickedProduct.product.unitsInStock<=clickedProduct.product.quantity){
            clickedProduct.quantity--;
            clickedProduct.product.unitsInStock++;
        }
    }

    addToCart(order: ProductOrder) {
        order.isProductInCart = true;
        this.ecommerceService.SelectedProductOrder = order;
        this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
        this.productSelected = true;
    }

    removeFromCart(productOrder: ProductOrder) {
        productOrder.isProductInCart = false;
        let index = this.getProductIndex(productOrder.product);
        if (index > -1) {
            this.shoppingCartOrders.productOrders.splice(
                this.getProductIndex(productOrder.product), 1);
        }
        this.ecommerceService.ProductOrders = this.shoppingCartOrders;
        this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        productOrder.product.unitsInStock = productOrder.product.unitsInStock + productOrder.quantity;
        productOrder.quantity = 0;
        this.productSelected = false;
    }

    getProductIndex(product: Product): number {
        return this.ecommerceService.ProductOrders.productOrders.findIndex(
            value => value.product === product);
    }

    isProductSelected(product: Product): boolean {
        return this.getProductIndex(product) > -1;
    }

    loadProducts() {
        this.ecommerceService.getAllProducts()
            .subscribe(
                (products: any) => {
                    this.products = products;
                    this.products.forEach(product => {
                        this.productOrders.push(new ProductOrder(product, 0));
                    })
                },
                (error) => console.log(error)
            );
    }

    loadCategories() {
        this.ecommerceService.getAllCategories()
            .subscribe(
                (categories: any) => {
                    this.categories = categories;
                },
                (error) => console.log(error)
            );
    }

    loadOrders() {
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        });
    }

    reset() {
        this.productOrders = [];
        this.loadProducts();
        this.ecommerceService.ProductOrders.productOrders = [];
        this.loadOrders();
        this.productSelected = false;
    }

    onResetClick(){
        this.sub = this.ecommerceService.isResetClicked.subscribe(() => {
            if(this.ecommerceService.resetClicked){
                this.productOrders = [];
                this.loadProducts();
            }
        });
    }
}
