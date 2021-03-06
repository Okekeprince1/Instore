import { types } from 'mobx-state-tree';
import { store } from '../stores'

export const ProductModel = types.model('ProductModel', {
    id: types.identifier,
    name: types.string,
    imageUrl: types.number,
    unitPrice: types.number,
    kgPrice: types.number,
    cartQty: 0,
    inCart: false

}).views(self => ({
    get price () {
        return self.unitPrice.toFixed(2)
    },
    get totalPrice () {
        return (self.cartQty * self.unitPrice).toFixed(2)
    }
})).actions(self => ({
    incCartQty() {
        self.cartQty += 1
    },
    decCartQty() {
        self.cartQty -= 1
    },
    addToCart() {
        store.shoppingCartStore.addProduct(self);
        self.inCart = true;
        self.incCartQty(); 
    },
    removeFromCart() {
        store.shoppingCartStore.removeProduct(self);
        self.inCart = false;
        self.cartQty = 0;
    }
}))