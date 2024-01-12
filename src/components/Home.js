import React from 'react';
import ListCard from './ListCard';

const Home = () => {
    // Placeholder shopping lists
    const shoppingLists = [
        { id: 1, title: 'Nákup' },
        { id: 2, title: 'PC Parts' },
        { id: 3, title: 'Věci pro auto' },
        { id: 4, title: 'Babičky nákup' },
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">NÁKUPNÍ SEZNAMY</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center"> {/* Adjusted for spacing and centering */}
                {shoppingLists.map(list => (
                    <ListCard key={list.id} list={list} />
                ))}
            </div>
        </div>
    );
};

export default Home;