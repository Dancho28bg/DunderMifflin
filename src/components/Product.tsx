import React from 'react';
import styles from './ProductList.module.css';
import { ProductType } from './ProductTypes';

interface ProductProps {
    product: ProductType;
    addToCart: (product: ProductType) => void;
}

const Product: React.FC<ProductProps> = ({ product, addToCart }) => {
    return (
        <div className={styles.productItem}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button
                onClick={() => addToCart(product)}
                className={styles.productItemButton}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
