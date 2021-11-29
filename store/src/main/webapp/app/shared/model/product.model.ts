import { IProductCategory } from '@/shared/model/product-category.model';

import { Size } from '@/shared/model/enumerations/size.model';
export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number;
  psize?: Size;
  imageContentType?: string | null;
  image?: string | null;
  productCategory?: IProductCategory | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public price?: number,
    public psize?: Size,
    public imageContentType?: string | null,
    public image?: string | null,
    public productCategory?: IProductCategory | null
  ) {}
}
