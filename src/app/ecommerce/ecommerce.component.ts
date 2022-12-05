import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from "./products/products.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {EcommerceService} from "./services/ecommerce.service";

@Component({
    selector: 'app-ecommerce',
    templateUrl: './ecommerce.component.html',
    styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
    collapsed = true;
    orderFinished = false;

    @ViewChild('productsRef')
    productsRef: ProductsComponent;

    @ViewChild('shoppingCartRef')
    shoppingCartRef: ShoppingCartComponent;

    @ViewChild('ordersRef')
    ordersRef: OrdersComponent;

    constructor(private ecommerceService: EcommerceService) {
    }

    ngOnInit() {
    }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

    finishOrder(orderFinished: boolean) {
        this.orderFinished = orderFinished;
    }

    reset() {
        this.orderFinished = false;
        //this.productsC.reset();
        this.shoppingCartRef.reset();
        this.ordersRef.paid = false;
    }
}