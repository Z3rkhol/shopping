import React from "react";
import Popup from './Popup';
import { useTranslation } from 'react-i18next';

function ListCard({ list, updateListItems }){
    const { t } = useTranslation();

    const [showPopup, setShowPopup] = React.useState(false);

    const handleShow = () => {
        setShowPopup(true);
    };

    const handleDelete = () => {
        // TEMPORARY
        console.log('Deleting list', list.id);
    };

    return (
        <>
            <div className="col-md-6 mb-3 d-flex justify-content-center">
                <div className="card card-fixed-size card-custom">
                    <div className="card-body d-flex flex-column justify-content-between align-items-center">
                        <h5 className="card-title">{list.title}</h5>
                        <div className="button-group d-flex flex-column mb-2">
                            <button onClick={handleShow} className="btn btn-primary mb-2">{t('listCard.show')}</button>
                            <button onClick={handleDelete} className="btn btn-danger">{t('listCard.delete')}</button>
                        </div>
                    </div>
                </div>
                {showPopup && <Popup listData={list} onClose={() => setShowPopup(false)} updateListItems={updateListItems} />}
            </div>
        </>
    );
};

export default ListCard;