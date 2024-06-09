import { Component } from '@angular/core';
import { IItemCart } from '../../../domain/models/interfaces/Iproduct';
import { GenericService } from '../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent {
  orderId: string = '';
  orderStatus: string = '';
  orderDetails: IItemCart[] = [];

  constructor(private service: GenericService) { }

  getOrderDetails() {
    this.service.getById<any>('Orders/', this.orderId).subscribe(data => {
      if (!data.getError() && data) {
        this.orderDetails = data.getResponse().orderDetails.map((detail: any) => ({
          name: detail.product.name,
          quantity: detail.quantity,
          value: detail.value
        }));
        console.log(data);
        this.orderStatus = this.mapOrderStatus(Number(data.getResponse().orderStatus));
      } else {
        this.orderDetails = [];
        this.orderStatus = 'No encontrada';
      }
    });
  }

  mapOrderStatus(status: number): string {
    console.log(status);
    switch (status) {
      case 0:
        return 'Nuevo';
      case 1:
        return 'Preparado';
      case 2:
        return 'Entregado';
      case 3:
        return 'Pagado';
      default:
        return 'Desconocido';
    }
  }
  
}
