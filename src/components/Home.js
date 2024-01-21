import React, { useState, useEffect, useCallback } from 'react';
import ListCard from './ListCard';
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();
    const [shoppingLists, setShoppingLists] = useState(() => {
        const savedLists = localStorage.getItem('shoppingLists');
        return savedLists ? JSON.parse(savedLists) : [
            { id: 1, titleKey: 'shoppingLists.1' },
            { id: 2, titleKey: 'shoppingLists.2' },
            { id: 3, titleKey: 'shoppingLists.3' },
            { id: 4, titleKey: 'shoppingLists.4' },
        ];
    });

    console.log(shoppingLists)

    useEffect(() => {
        localStorage.setItem('shoppingLists', JSON.stringify(shoppingLists));
    }, [shoppingLists]);

    const translatedLists = shoppingLists.map(list => ({
        ...list,
        title: t(`shoppingLists.${list.id}`)
    }));

    const updateListItems = useCallback((listId, newItems) => {
        setShoppingLists(currentLists => currentLists.map(list =>
            list.id === listId ? { ...list, items: newItems } : list
        ));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{t('home.title')}</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                {translatedLists.map(list => (
                    <ListCard key={list.id} list={list} updateListItems={updateListItems} />
                ))}
            </div>
        </div>
    );
};

export default Home;