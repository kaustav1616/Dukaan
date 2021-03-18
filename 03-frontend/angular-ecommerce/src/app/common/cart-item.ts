<<<<<<< HEAD
import { CartProduct } from './cart-product';
=======
import { Product } from './product';
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d

export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

<<<<<<< HEAD
    constructor(cartProduct: CartProduct) {
        this.id = cartProduct.id;
        this.name = cartProduct.name;
        this.imageUrl = cartProduct.imageUrl;
        this.unitPrice = cartProduct.unitPrice;
=======
    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
        this.quantity = 1;
    }
}