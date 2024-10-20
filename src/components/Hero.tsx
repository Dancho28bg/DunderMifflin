import React from 'react';
import styles from './Hero.module.css';

interface HeroProps {
    onExploreProducts: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreProducts }) => {
    return (
        <div className={styles.hero}>
            <button className={styles.heroButton} onClick={onExploreProducts}>
                EXPLORE PRODUCTS
            </button>
        </div>
    );
};

export default Hero;
