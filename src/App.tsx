import React, { useState, useRef } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import ProductManagement from './components/ProductManagement';
import styles from './App.module.css';
import { ProductType } from './components/ProductTypes';

interface CartItem {
    id: number;
    name: string;
    price: number;
}

interface Order {
    id: number;
    items: CartItem[];
    date: Date;
    status: string;
}

const App: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [products, setProducts] = useState<ProductType[]>([
        { id: 1, name: 'Paper Pack - 100 Sheets', price: 10, image: '/images/paper1.jpg', stock: 5, discontinued: false },
        { id: 2, name: 'Paper Box - 5 Packs', price: 40, image: '/images/paper2.jpg', stock: 5, discontinued: false },
    ]);
    const productListRef = useRef<HTMLDivElement | null>(null);

    const addToCart = (product: CartItem) => {
        const productInStock = products.find(p => p.id === product.id);
        if (productInStock && productInStock.stock > 0) {
            setCartItems((prevItems) => [...prevItems, product]);
            setProducts((prevProducts) =>
                prevProducts.map(p =>
                    p.id === product.id ? { ...p, stock: p.stock - 1 } : p
                )
            );
        } else {
            alert("This product is out of stock!");
        }
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => {
            const updatedCart = prevItems.filter(item => item.id !== productId);
            const productInCart = prevItems.find(item => item.id === productId);

            if (productInCart) {
                setProducts((prevProducts) =>
                    prevProducts.map(p =>
                        p.id === productId ? { ...p, stock: p.stock + 1 } : p
                    )
                );
            }
            return updatedCart;
        });
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        const newOrder: Order = {
            id: orderHistory.length + 1,
            items: cartItems,
            date: new Date(),
            status: 'received',
        };

        setOrderHistory((prevOrders) => [...prevOrders, newOrder]);
        setCartItems([]);
    };

    const scrollToProductList = () => {
        productListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDiscontinue = (id: number) => {
        setProducts((prevProducts) =>
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
        setProducts((prevProducts) =>
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

        setProducts((prevProducts) => [
            ...prevProducts,
            { ...newProduct, stock: 5, discontinued: false }
        ]);
    };

    const updateOrderStatus = (id: number, status: string) => {
        setOrderHistory((prevOrders) =>
            prevOrders.map(order =>
                order.id === id ? { ...order, status } : order
            )
        );

        // Call API to update the order status
        fetch(`YOUR_API_URL/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(status)
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
            <Cart items={cartItems} removeFromCart={removeFromCart} handleCheckout={handleCheckout} />
        </div>
    );
};

export default App;
