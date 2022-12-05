import { Component } from '@angular/core';
import {EcommerceService} from "./ecommerce/services/ecommerce.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EcommerceService]
})
export class AppComponent {
  title = 'angular-ecommerce';
}
