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

    const handleRestockChange = (id: number, amount: number) => {
        setRestockAmounts(prevAmounts => ({ ...prevAmounts, [id]: amount }));
    };

    return (
        <div className={styles.management}>
            <h2>Product Management</h2>

            <div>
                <h3>Add New Product</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <button onClick={addProduct}>Add Product</button>
            </div>

            <h3>Product List</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id} className={styles.managementItem}>
                        {product.name} - ${product.price.toFixed(2)} <br />
                        <button onClick={() => onDiscontinue(product.id)}>Discontinue</button>
                        <input
                            type="number"
                            value={restockAmounts[product.id] || ''}
                            placeholder="Restock amount"
                            onChange={(e) => handleRestockChange(product.id, parseInt(e.target.value, 10))}
                        />
                        <button onClick={() => onRestock(product.id, restockAmounts[product.id] || 0)}>Restock</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;
