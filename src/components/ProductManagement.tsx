import React, { useState } from 'react';
import styles from './ProductManagement.module.css';
import { ProductType } from './ProductTypes';

interface ProductManagementProps {
    products: ProductType[];
    onDiscontinue: (id: number) => void;
    onRestock: (id: number, amount: number) => void;
    onAddProduct: (newProduct: ProductType) => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ products, onDiscontinue, onRestock, onAddProduct }) => {
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    
    const [restockAmounts, setRestockAmounts] = useState<{ [key: number]: number }>({});

    const addProduct = () => {
        if (newProduct.name.trim() === '' || newProduct.price.trim() === '' || isNaN(Number(newProduct.price))) {
            alert("Please enter valid product details.");
            return;
        }

        const product: ProductType = {
            id: Date.now(),
            name: newProduct.name,
            price: Number(newProduct.price),
            stock: 5,
            image: '/images/default.jpg',
            discontinued: false 
        };

        onAddProduct(product);
        setNewProduct({ name: '', price: '' }); 
    };

    const handleRestockChange = (id: number, value: number) => {
        setRestockAmounts(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className={styles.productManagement}>
            <h2>Product Management</h2>

            <label>
                Product Name:
                <input
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
            </label>

            <label>
                Price ($):
                <input
                    type="number"
                    placeholder="Enter product price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
            </label>

            <button onClick={addProduct}>Add Product</button>

            <h3>Manage Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id} className={styles.productItem}>
                        <span>{product.name} - ${product.price} (Stock: {product.stock})</span>
                        <div className={styles.restockContainer}>
                            <input
                                type="number"
                                placeholder="Restock"
                                min="1" 
                                value={restockAmounts[product.id] || 0} 
                                onChange={(e) => handleRestockChange(product.id, Number(e.target.value))}
                                className={styles.restockInput}
                            />
                            <button onClick={() => {
                                if (restockAmounts[product.id] > 0) {
                                    onRestock(product.id, restockAmounts[product.id]);
                                    setRestockAmounts(prev => ({ ...prev, [product.id]: 0 }));
                                } else {
                                    alert('Please enter a valid restock amount');
                                }
                            }} className={styles.restockButton}>
                                Restock
                            </button>
                            <button onClick={() => onDiscontinue(product.id)} className={styles.discontinueButton}>Discontinue</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
