import React from 'react';
import styles from './Cart.module.css';
import { ProductType } from './ProductTypes';

interface OrderEntry {
    paperId: number; // This corresponds to the ProductType id
    quantity: number;
}

interface CartProps {
    items: OrderEntry[]; // These are the items in the cart
    removeFromCart: (productId: number) => void; // Function to remove an item from the cart
    handleCheckout: () => void; // Function to handle checkout
    products: ProductType[]; // Added products prop to access product details
}

const Cart: React.FC<CartProps> = ({ items, removeFromCart, handleCheckout, products }) => {
    const itemCount: { [key: number]: { count: number; paperId: number } } = {};

    // Aggregate item quantities based on paperId
    items.forEach(item => {
        if (itemCount[item.paperId]) {
            itemCount[item.paperId].count += item.quantity;
        } else {
            itemCount[item.paperId] = { count: item.quantity, paperId: item.paperId };
        }
    });

    // Calculate total price based on the actual product prices
    const totalPrice = Object.values(itemCount).reduce((total, item) => {
        const product = products.find(p => p.id === item.paperId); // Find product by id
        return total + (product ? product.price * item.count : 0); // Add product price to total
    }, 0);

    return (
        <div className={styles.cart}>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>No items in cart</p> // Message if cart is empty
            ) : (
                <ul>
                    {Object.entries(itemCount).map(([id, { count }]) => {
                        const product = products.find(p => p.id === Number(id)); // Find product for each item
                        return (
                            <li key={id}>
                                {count}x {product ? product.name : 'Unknown Product'} - ${product ? (product.price * count).toFixed(2) : 'N/A'}
                                <button
                                    onClick={() => removeFromCart(Number(id))} // Remove button
                                    className={styles.removeButton}>
                                    Remove
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
            {items.length > 0 && (
                <>
                    <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
                    <button
                        onClick={handleCheckout} // Checkout button
                        className={styles.checkoutButton}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
