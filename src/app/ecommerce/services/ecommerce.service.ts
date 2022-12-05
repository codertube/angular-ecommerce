import {ProductOrder} from "../models/product-order.model";
import {Subject} from "rxjs/internal/Subject";
import {ProductOrders} from "../models/product-orders.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class EcommerceService {
    private productsUrl = "/api/products";
    private ordersUrl = "/api/orders";
    private categoriesUrl = "/api/categories";

    private productOrder: ProductOrder;
    private orders: ProductOrders = new ProductOrders();
    private resetClick:boolean;

    private productOrderSubject = new Subject<void>();
    private ordersSubject = new Subject<void>();
    private totalSubject = new Subject<void>();
    private resetClickedSubject = new Subject<void>();

    private total: number;

    ProductOrderChanged = this.productOrderSubject.asObservable();
    OrdersChanged = this.ordersSubject.asObservable();
    TotalChanged = this.totalSubject.asObservable();
    isResetClicked = this.resetClickedSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    getAllProducts() {
        return this.http.get(this.productsUrl);
    }

    getAllCategories() {
        return this.http.get(this.categoriesUrl);
    }

    saveOrder(order: ProductOrders) {
        return this.http.post(this.ordersUrl, order);
    }

    set SelectedProductOrder(value: ProductOrder) {
        this.productOrder = value;
        this.productOrderSubject.next();
    }

    get SelectedProductOrder() {
        return this.productOrder;
    }

    set ProductOrders(value: ProductOrders) {
        this.orders = value;
        this.ordersSubject.next();
    }

    get ProductOrders() {
        return this.orders;
    }

    set resetClicked(value: boolean) {
        this.resetClick = value;
        this.resetClickedSubject.next();
    }

    get resetClicked() {
        return this.resetClick;
    }

    get Total() {
        return this.total;
    }

    set Total(value: number) {
        this.total = value;
        this.totalSubject.next();
    }
}