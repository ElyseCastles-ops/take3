import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../..";
import { useAuth } from "../../context/AuthContext";
import Card from "../cards/card";
import { openCardModal, openNewCardModal } from "../cards/cardActions";
import CardModal from "../cards/cardModal";
import NewCardModal from "../cards/newCardModal";
import Box from "./box";
import { openEditBoxModal, updateSelectedBox } from "./boxActions";
import EditBoxModal from "./editBoxModal";



const BoxView = () => {

    const box = useSelector((state: RootState) => state.boxReducer.box)
    const fill = useSelector((state: RootState) => state.boxReducer.box?.fill)
    const cards = useSelector((state: RootState) => state.cardReducer.cards)
    const commander = cards.find(element => element.commander === true)

    const [starred, setStarred] = useState(box?.starred)
    const dispatch = useDispatch()
    const {updateBox, getBox} = useAuth();

    const handleFavorite = () => {
        if (box) {
            updateBox(box, {starred: !starred}).then(() => {
                getBox(box.id).then((ret: Box) => {
                    dispatch(updateSelectedBox(ret))
                })
            })
            setStarred(!starred)
        }
        
    }

    const handleNewCards = () => {
        dispatch(openNewCardModal())
    }

    const handleEditBox = () => {
        dispatch(openEditBoxModal())
    }

    const handleOpenCardModal = (card: Card) => {
        dispatch(openCardModal(card))
    }

    return (
        <div className="page-content">
            <div className="mb-d-flex mb-flex-row mb-flex-wrap box-header">
                <h2 className="box-header-name">{box?.name}</h2>
                <div className="mb-star-icon box-star mb-d-flex mb-align-items-center" onClick={handleFavorite}>
                    {starred ? <p>&#9733;</p> : <p>&#9734;</p>}
                </div>
                <div className="mb-d-flex mb-align-items-center box-capacity">
                    <span>{fill}</span>/<span>{box?.capacity}</span>
                </div>
                <div className="mb-button-primary" onClick={handleNewCards}><p>Add New Card(s)</p></div>
                <div className="mb-button-secondary" onClick={handleEditBox}><p>Edit Box</p></div>
            </div>
            <div className="mb-d-flex mb-flex-col">
                {box?.type === "commander" && commander &&
                    <div className="commander card mb-d-flex mb-flex-col" onClick={()=> handleOpenCardModal(commander)}>
                        Commander
                        <div className="card-name mb-d-flex mb-flex-row">{commander?.name}</div>
                        <div className="mb-d-flex mb-flex-row">
                            <div className="card-field">Quantity: {commander?.quantity}</div>
                            <div className="card-field">Quantity (Foil): {commander?.foil}</div>
                        </div>
                    </div>
                }
                {
                    cards.filter(card => card.commander !== true).map((card, index) => {
                        //console.log("CARD", card);
                        return <div key={index} className="card mb-d-flex mb-flex-col" onClick={()=> handleOpenCardModal(card)}>
                            <div className="card-name mb-d-flex mb-flex-row">{card.name}</div>
                            <div className="mb-d-flex mb-flex-row">
                                
                                <div className="card-field">Quantity: {card.quantity}</div>
                                <div className="card-field">Quantity (Foil): {card.foil}</div>
                            </div>
                        </div>
                    })
                }
            </div>
            {
                box && <NewCardModal />
            }
            <EditBoxModal />
            <CardModal />
        </div>
    )
}

export default BoxView;