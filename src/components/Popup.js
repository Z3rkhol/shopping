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
                <div className="items-container">
                    {listData.items.map(item => (
                        <div key={item.id} className="item-entry d-flex justify-content-between">
                            <div className="item-box">{item.name}</div>
                            <div className="quantity-box">{`${item.quantity} ${item.unit}`}</div>
                            <div className="buttons-box">
                                <button className="btn btn-success btn-sm">Hotovo</button>
                                <button className="btn btn-danger btn-sm">Odebrat</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="close-btn">&times;</button>
            </div>
        </div>
    );
};


export default Popup;