import React, { useState } from 'react';
import { ProductType } from './ProductTypes';
import styles from './ProductList.module.css';

interface ProductListProps {
    products: ProductType[];
    addToCart: (product: ProductType) => void; // Use ProductType instead of a simplified object
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.productOverview}>
            <h2>Product List</h2>

            <div className={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.productList}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className={styles.productItem}>
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p className={styles.stockText}>In Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
                        <button
                            onClick={() => {
                                if (product.stock > 0) {
                                    addToCart(product); // Pass the whole product
                                } else {
                                    alert('Product out of stock');
                                }
                            }}
                            className={styles.productItemButton}
                            disabled={product.stock <= 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
