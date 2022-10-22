import { catchError, EMPTY, Subject, map, combineLatest, filter } from 'rxjs';
import { Component } from '@angular/core';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )

    pageTitle$ = this.product$  
      .pipe(
        map(p => p ? `Product Detail for: ${p.productName}` : null)
      )

    productSuppliers$ = this.productService.selectedProductSuppliers$
      .pipe(
        catchError( err => {
          this.errorMessageSubject.next(err);
          return EMPTY;
        })
      )

    vm$ = combineLatest([
      this.product$,
      this.productSuppliers$,
      this.pageTitle$
    ]).pipe(
      filter(([product]) => Boolean(product)),
      map(([product, productSuppliers, pageTitle]) =>
      ({ product, productSuppliers, pageTitle}))
    );

  constructor(private productService: ProductService) { }

}
