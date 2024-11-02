import React, { useState } from 'react';
import styles from './OrderHistory.module.css';

interface CartItem {
    id: number;
    name: string;
    price: number;
}

interface Order {
    id: number;
    items: CartItem[]; // This should match your data structure in App.tsx
    date: Date;
    status: string;
}

interface OrderHistoryProps {
    orders: Order[];
    onUpdateStatus: (id: number, status: string) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const handleChangeStatus = (orderId: number) => {
        if (selectedStatus) {
            onUpdateStatus(orderId, selectedStatus);
            setSelectedStatus(null);
        }
    };

    return (
        <div className={styles.orderHistory}>
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} className={styles.orderItem}>
                            <strong>Order #{order.id}</strong> - {order.date.toLocaleString()}<br />
                            <strong>Status:</strong> {order.status}<br />
                            <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus || ''}>
                                <option value="" disabled>Select status</option>
                                <option value="received">Received</option>
                                <option value="sent">Sent</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <button onClick={() => handleChangeStatus(order.id)}>Update Status</button>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.name} - ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
