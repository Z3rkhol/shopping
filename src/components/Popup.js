import React, { useState, useEffect } from 'react';
import './popup.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTheme } from './Theme';
import { useTranslation } from 'react-i18next';

const MySwal = withReactContent(Swal);

var finished = false;

function Popup({ listData, onClose, updateListItems }) {
    const { t } = useTranslation();

    const [items, setItems] = useState(listData.items || []);
    const { theme } = useTheme();

    const handleAddItem = () => {
        Swal.fire({
            title: t('popup.enterItemDetails'),
            html: `
            <input id="swal-input-name" class="swal2-input" placeholder="${t('popup.itemName')}">
            <input id="swal-input-quantity" type="number" class="swal2-input" placeholder="${t('popup.quantity')}">`,
            showCancelButton: true,
            confirmButtonText: t('popup.confirmAdd'),
            preConfirm: () => {
                const name = document.getElementById('swal-input-name').value;
                const quantity = document.getElementById('swal-input-quantity').value;
                if (!name || !quantity) {
                    Swal.showValidationMessage(t('popup.enterAll'));
                    return false;
                }
                return { name, quantity: parseInt(quantity, 10) };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, quantity } = result.value;
                const existingItemIndex = items.findIndex(item => item.name === name);
                if (existingItemIndex !== -1) {
                    // Update quantity if item exists
                    const updatedItems = items.map((item, index) =>
                        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
                    );
                    if (!areArraysEqual(items, updatedItems)) {
                        setItems(updatedItems);
                    }} else {
                    // Add new item
                    const newItem = {
                        id: `temp-id-${items.length + 1}`,
                        name,
                        quantity,
                        unit: 'ks',
                        finished: false
                    };
                    setItems(prevItems => [...prevItems, newItem]);
                }
            }
        });
    };

    const handleDelete = (itemId) => {
        Swal.fire({
            title: t('popup.confirmDeletion'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('popup.yesDelete')
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedItems = items.filter(item => item.id !== itemId);
                if (!areArraysEqual(items, updatedItems)) {
                    setItems(updatedItems);
                    updateListItems(listData.id, updatedItems); // Update items in the parent component
                }
                Swal.fire(
                    t('popup.deleted'),
                    t('popup.itemDeleted'),
                    'success'
                );
            }
        });
    };

    const areArraysEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

    const handleClear = () => {
        Swal.fire({
            title: t('popup.confirmClear'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('popup.yesDelete')
        }).then((result) => {
            if (result.isConfirmed) {
                setItems([]);
                Swal.fire({
                    title: t('popup.cleared'),
                    text: t('popup.listCleared'),
                    icon: 'success',
                });
            }
        });
    };

    const handleMarkAsComplete = (itemId) => {
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, finished: !item.finished }; // Toggle the 'finished' state
            }
            return item;
        });
        setItems(updatedItems);

        Swal.fire({
            title: updatedItems.find(item => item.id === itemId).finished ? t('popup.itemCompleted') : t('popup.itemIncomplete'),
            icon: updatedItems.find(item => item.id === itemId).finished ? 'success' : 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleFinished = () => {
        if(finished === false){
            Swal.fire({
                title: 'Označeno jako hotovo!',
                icon: 'info',
                confirmButtonText: 'X',
                showConfirmButton: false,
                showCloseButton: true
            })
            finished = true;
        } else {
            Swal.fire({
                title: 'Označeno jako nesplněno!',
                icon: 'info',
                confirmButtonText: 'X',
                showConfirmButton: false,
                showCloseButton: true
            })
            finished = false;
        }
    };

    const handleManageUsers = () => {
        MySwal.fire({
            title: t('popup.manageUsers'),
            html: `
                <div>
                    <input id="swal-input1" class="swal2-input" placeholder="${t('popup.username')}"/>
                    <ul class="list-group mt-2">
                        <li class="list-group-item">Kuba</li>
                        <li class="list-group-item">Honza</li>
                    </ul>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: t('popup.addUser'),
            cancelButtonText: t('popup.cancel'),
            didOpen: () => {
                // This function runs when the alert is displayed
                document.getElementById('swal-input1').focus();
            },
            preConfirm: () => {
                const username = document.getElementById('swal-input1').value;
                if (!username) {
                    Swal.showValidationMessage('Please enter a username');
                    return false;
                }
                return { username };
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                Swal.fire({
                    title: `Uživatel ${result.value.username} přidán!`,
                    icon: 'success',
                    confirmButtonText: 'X',
                    showConfirmButton: false,
                    showCloseButton: true
                });
            }
        });
    };

    const handleArchive = () => {
        Swal.fire({
            title: t('popup.archived'),
            icon: 'info',
            confirmButtonText: 'X',
            showConfirmButton: false,
            showCloseButton: true
        })
    };

    useEffect(() => {
        updateListItems(listData.id, items);
    }, [items, listData.id, updateListItems]);

    const renderItemEntry = (item) => (
        <div key={item.id} className="item-entry d-flex justify-content-between">
            <div className={`item-box ${item.finished ? 'finished' : ''}`}>
                {item.name}
            </div>
            <div className="quantity-box">{`${item.quantity} ${item.unit}`}</div>
            <div className="buttons-box">
                {item.finished && <span className="item-finished-mark">✔</span>}
                <button onClick={() => handleMarkAsComplete(item.id)} className={`btn btn-${item.finished ? 'secondary' : 'success'} btn-sm`}>
                    {item.finished ? 'Zrušit' : 'Hotovo'}
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">Odstranit</button>
            </div>
        </div>
    );

    return (
        <div className={`popup-overlay ${theme}`}>
            <div className={`popup-content ${theme}`}>
                <h2>{listData.title}</h2>
                <div className="items-container">
                    {items.map(renderItemEntry)}
                </div>
                <button onClick={onClose} className="close-btn">&times;</button>
                <div className="text-center mt-3">
                    <button onClick={handleAddItem} className="btn btn-primary">{t('popup.addItem')}</button>
                </div>
                <div className="popup-buttons text-center mt-3">
                    <button onClick={handleManageUsers} className="btn btn-info m-2">{t('popup.manageUsers')}</button>
                    <button onClick={handleFinished} className="btn btn-warning m-2">{t('popup.itemFinishedMark')}</button>
                    <button onClick={handleArchive} className="btn btn-secondary m-2">{t('popup.archive')}</button>
                    <button onClick={handleClear} className="btn btn-danger m-2">{t('popup.deleteItems')}</button>
                </div>
            </div>
        </div>
    );
};


export default Popup;