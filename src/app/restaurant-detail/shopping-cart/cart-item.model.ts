import { MenuItem } from "../menu-item/menu-item.model";

export class CartItem {

    // os parametros do construtor são publicos porque CartItem é instanciado 
    // dentro do serviço 'shopping-cart.service'
    
    // 1 CartItem contem 1 MenuItem e sua quantidade inicial é 1

    constructor(public menuItem: MenuItem, 
                public quantity: number = 1) {}

    // metodo que calcula o total por item
    value(): number {
        return this.menuItem.price * this.quantity
    }
}
