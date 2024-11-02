// ProductTypes.ts
export interface CartItem {
    id: number; // Unique ID for the cart item
    paperId: number; // ID of the product
    name: string; // Product name
    price: number; // Product price
    quantity: number; // Quantity of the product
}

export interface Order {
    id: number; // Unique ID for the order
    items: CartItem[]; // This will match the items structure in your order
    date: Date; // Date of the order
    status: string; // Status of the order
}

export interface ProductType {
    id: number;
    name: string;
    price: number;
    stock: number;
    discontinued: boolean;
    image: string; // Add the image property here
}



export interface OrderEntry {
    id: number; // Ensure this is included if necessary for the cart
    paperId: number; // Corresponds to the ProductType id
    quantity: number;
}



export interface OrderDto {
    customerId: number; // Customer ID
    orderEntries: Omit<OrderEntry, 'id'>[]; // Exclude id for the DTO
    date: Date; // Date of the order
    status: string; // Order status
}
