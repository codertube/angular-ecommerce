import {Component, OnInit} from '@angular/core';
import {ProductOrders} from "../models/product-orders.model";
import {Subscription} from "rxjs/internal/Subscription";
import {EcommerceService} from "../services/ecommerce.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders: ProductOrders;
    total: number;
    totalStr: string;
    paid: boolean;
    sub: Subscription;
    paidAmount: number;
    balanceAmount: number;
    balanceAmountStr: string;

    constructor(private ecommerceService: EcommerceService) {
        this.orders = this.ecommerceService.ProductOrders;
    }

    ngOnInit() {
        this.paid = false; 
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            this.orders = this.ecommerceService.ProductOrders;
        });
        this.loadTotal();
    }

    pay(amount:number) {
        this.paid = true;
        if(this.paidAmount > this.total){
            this.balanceAmount = this.paidAmount - this.total;
            this.balanceAmountStr = this.balanceAmount.toFixed(2);
        }else{
            this.balanceAmount = 0;
        }
        this.ecommerceService.saveOrder(this.orders).subscribe();
        
    }

    loadTotal() {
        this.sub = this.ecommerceService.TotalChanged.subscribe(() => {
            this.total = this.ecommerceService.Total;
            this.totalStr = this.total.toFixed(2);
        });
    }
}