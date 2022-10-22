/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode?: string; //? -> nullable fields
  description?: string;
  price?: number;
  categoryId?: number;
  categoryName?: string;
  quantityInStock?: number;
  searchKey?: string[];
  supplierIds?: number[];
}
