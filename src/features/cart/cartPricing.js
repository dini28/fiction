export const FREE_SHIPPING_THRESHOLD = 150;
export const SHIPPING_FEE = 9.99;
export const MAX_QUANTITY_PER_ITEM = 10;

export const getShippingCost = (subtotal) =>
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
