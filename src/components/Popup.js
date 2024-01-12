import React from 'react';
import './popup.css';

const Popup = ({ listData, onClose }) => {
    if (!listData) {
        return null;
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{listData.title}</h2>
                <ul className="list-group">
                    {listData.items.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name}
                            <span>{`${item.quantity} ${item.unit}`}</span>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="btn btn-secondary">Close</button>
            </div>
        </div>
    );
};

export default Popup;