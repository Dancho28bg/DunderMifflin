import React from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.logo}>
                <img src="/images/logo.png" alt="logo" />
            </div>
        </div>
    );
};

export default NavBar;
