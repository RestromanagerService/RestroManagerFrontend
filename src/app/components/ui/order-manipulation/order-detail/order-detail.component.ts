import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: any;

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.genericService.getById<any>('Orders/', orderId).subscribe(
        (response: HttpResponseWrapper<any>) => {
          if (!response.getError()) {
            this.order = response.getResponse();
          } else {
            console.error('Error fetching order:', response.getResponseMessage());
          }
        },
        (error: any) => {
          console.error('Error fetching order:', error);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  getStatusClass(status: number): string {
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
