import React, { useState, useEffect, useCallback   } from 'react';
import ListCard from './ListCard';

function Home() {
    const [shoppingLists, setShoppingLists] = useState(() => {
        const savedLists = localStorage.getItem('shoppingLists');
        return savedLists ? JSON.parse(savedLists) : [
            { id: 1, title: 'Nákup' },
            { id: 2, title: 'PC Parts' },
            { id: 3, title: 'Věci pro auto' },
            { id: 4, title: 'Babičky nákup' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('shoppingLists', JSON.stringify(shoppingLists));
    }, [shoppingLists]);

    const updateListItems = useCallback((listId, newItems) => {
        setShoppingLists(currentLists => currentLists.map(list =>
            list.id === listId ? { ...list, items: newItems } : list
        ));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">NÁKUPNÍ SEZNAMY</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                {shoppingLists.map(list => (
                    <ListCard key={list.id} list={list} updateListItems={updateListItems} />
                ))}
            </div>
        </div>
    );
};

export default Home;