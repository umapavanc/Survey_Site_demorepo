import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable, from } from 'rxjs';
//import { Order } from './order.model';

@Injectable()
export class StaticDataSource {
    private surveys: Survey[] =
        [
            new Survey(1, 'Survey 1', 'Author 1', 4, 10),
            new Survey(2, 'Survey 2', 'Author 1', 5, 10),
            new Survey(3, 'Survey 3', 'Author 3', 20, 10),
            new Survey(4, 'Survey 4', 'Author 1', 21, 10),
            new Survey(5, 'Survey 5', 'Author 2', 14, 10),
            new Survey(6, 'Survey 6', 'Author 2', 2, 10),
            new Survey(7, 'Survey 7', 'Author 3', 0, 10),


        ];

    getSurvey(): Observable<Survey[]> {
        return from([this.surveys]);
    }

    /* saveOrder(order: Order): Observable<Order>
     {
       console.log(JSON.stringify(order));
       return from ([order]);
     }*/
}
