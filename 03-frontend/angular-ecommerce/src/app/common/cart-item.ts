import { CartProduct } from './cart-product';

export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(cartProduct: CartProduct) {
        this.id = cartProduct.id;
        this.name = cartProduct.name;
        this.imageUrl = cartProduct.imageUrl;
        this.unitPrice = cartProduct.unitPrice;
        this.quantity = 1;
    }
}