// App.tsx
import React, { useState, useRef } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import ProductManagement from './components/ProductManagement';
import styles from './App.module.css';
import { ProductType, Order, CartItem } from './components/ProductTypes';

const App: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [products, setProducts] = useState<ProductType[]>([
        { id: 1, name: 'Paper Pack - 100 Sheets', price: 10, stock: 5, discontinued: false, image: '/images/paper1.jpg' },
        { id: 2, name: 'Paper Box - 5 Packs', price: 40, stock: 5, discontinued: false, image: '/images/paper2.jpg' },
    ]);

    const productListRef = useRef<HTMLDivElement | null>(null);

    const addToCart = (product: ProductType) => {
        const existingItem = cartItems.find(item => item.paperId === product.id);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity
            setCartItems([...cartItems]);
        } else {
            setCartItems([...cartItems, {
                id: Date.now(),
                paperId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            }]);
        }

        // Decrease product stock
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === product.id ? { ...p, stock: p.stock - 1 } : p
            )
        );
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => {
            const updatedCart = prevItems.filter(item => item.paperId !== productId);
            const productInCart = prevItems.find(item => item.paperId === productId);
            if (productInCart) {
                setProducts(prevProducts =>
                    prevProducts.map(p =>
                        p.id === productId ? { ...p, stock: p.stock + productInCart.quantity } : p
                    )
                );
            }
            return updatedCart;
        });
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const newOrder: Order = {
            id: Date.now(), // Generate a unique ID for the order
            items: cartItems.map(item => ({
                id: item.id, // Use the ID from the CartItem
                paperId: item.paperId,
                name: item.name,
                price: item.price,
                quantity: item.quantity // Include the quantity
            })),
            date: new Date(), // Include the date
            status: 'received', // Initial status
        };

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(order => {
                setOrderHistory(prevOrders => [...prevOrders, { ...order, date: new Date() }]);
                setCartItems([]); // Clear the cart after successful checkout
                alert("Checkout successful!");
            })
            .catch(error => {
                console.error('Error creating order:', error);
                alert("There was a problem with your checkout. Please try again.");
            });
    };


    const scrollToProductList = () => {
        productListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDiscontinue = (id: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, discontinued: true, stock: 0 } : product
            )
        );
    };

    const handleRestock = (id: number, amount: number) => {
        if (amount <= 0) {
            alert("Restock amount must be greater than zero.");
            return;
        }
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, stock: product.stock + amount } : product
            )
        );
    };

    const handleAddProduct = (newProduct: ProductType) => {
        if (!newProduct.name || !newProduct.price || isNaN(newProduct.price)) {
            alert("Invalid product details. Please check the name and price.");
            return;
        }

        setProducts(prevProducts => [
            ...prevProducts,
            { ...newProduct, stock: 5, discontinued: false }
        ]);
    };

    const updateOrderStatus = (id: number, status: string) => {
        fetch(`http://localhost:5000/orders/${id}/status`, { // Replace with your actual API URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status }) // Adjust to match your API if necessary
        }).catch(error => {
            console.error('Error updating order status:', error);
        });
    };

    return (
        <div className={styles.app}>
            <NavBar />
            <Hero onExploreProducts={scrollToProductList} />
            <div ref={productListRef}>
                <ProductList addToCart={addToCart} products={products} />
            </div>
            <ProductManagement
                products={products}
                onDiscontinue={handleDiscontinue}
                onRestock={handleRestock}
                onAddProduct={handleAddProduct}
            />
            <OrderHistory orders={orderHistory} onUpdateStatus={updateOrderStatus} />
            <Cart
                items={cartItems}
                products={products} // Pass the products prop here
                removeFromCart={removeFromCart}
                handleCheckout={handleCheckout}
            />
        </div>
    );
};

export default App;
