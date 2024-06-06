import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../order-service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService,  private location: Location) { }

  ngOnInit(): void {
    const orderId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    if (orderId) {
      this.order = this.orderService.getOrderById(orderId);
    }
  }

  goBack(): void {
    this.location.back(); 
  }
}
