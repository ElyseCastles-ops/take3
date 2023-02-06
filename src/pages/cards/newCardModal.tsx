import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { useAuth } from "../../context/AuthContext";
import Box from "../boxes/box";
import { updateSelectedBox } from "../boxes/boxActions";
import Card from "./card";
import { closeNewCardModal, loadCards } from "./cardActions";

// interface BoxProps {
//     cards: Array<Card>,
//     box: Box
// }


const NewCardModal = () => {

    const dispatch = useDispatch();
    const {addOrUpdateCards, updateBox, getCards, getBox} = useAuth();

    const newCardModalOpen = useSelector((state: RootState) => state.cardReducer.newCardModalOpen);
    const selectedBox = useSelector((state: RootState) => state.boxReducer.box)
    const existingCards = useSelector((state: RootState) => state.cardReducer.cards)

    const [fill, setFill] = useState(selectedBox?.fill)
    const capacity = selectedBox?.capacity;

    const [addCard, setAddCard] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardQuantity, setCardQuantity] = useState("");
    const [cardFoil, setCardFoil] = useState("");

    let [newDict, setNewDict] = useState<Array<Card>>([]);;
    let [updateDict, setUpdateDict] = useState<Array<Card>>([]);

    const CAPACITY_ERROR = "Error: Unable to add card(s). Quantity exceeded the boxes/decks max capacity.";
    const COLOR_ERROR = "Error: Card colors do not match box colors";
    const QUANTITY_ERROR = "Error: To add a card to a box it must have a non-zero quantity or foil quantity.";
    const CARD_ERROR = "Error: MTG card not found.";
    const COMMANDER_ERROR = "Error: Commander deck already contains this card."
    const COMMANDER_LIMIT_ERROR = "Error: Only one of each card allowed in commander deck."
    const GENERIC_ERROR = "Error occured while trying to add card."
    const SUCCESS_MSG = "Card succesfully added.";
    const [msg, setMsg] = useState("");

    const handleClose = () => {
        dispatch(closeNewCardModal())
        clearCardAdd()
        setNewDict([])
        setUpdateDict([])
        setMsg("")
        setAddCard(false)
        setFill(selectedBox?.fill)
    }

    const handleAddNewCard = () => {
        setAddCard(!addCard)
        setMsg("")
    }

    const clearCardAdd = () => {
        setCardName("")
        setCardQuantity("")
        setCardFoil("")
    }

    const handleCreateNewCard = () => {
        if (newDict.length !== 0 || updateDict.length !== 0) {
            addOrUpdateCards(newDict, updateDict, selectedBox).then(() => [
                updateBox(selectedBox, {fill: Number(fill)}).then(() => {
                    getBox(selectedBox?.id).then((box: Box) => {
                        dispatch(updateSelectedBox(box))
                    })
                })
            ]).then(() => {
                getCards(selectedBox?.id).then((cardList: Card[]) => {
                    dispatch(loadCards(cardList))
                })
            })
        }
        
        handleClose()
    }

    const handleCloseAddCard = () => {
        setAddCard(!addCard);
        clearCardAdd()
    }

    const handleAddCardToList = () => { 
        if (cardName !== "") {
            console.log("CARD NAME VALID")
            if (+cardFoil > 0 || +cardQuantity > 0) {
                console.log("CARD QUANTITIES OK")
                if (fill !== undefined && capacity !== undefined && fill + Number(cardFoil) + Number(cardQuantity) <= capacity) {
                    console.log("CARD MEETS DECK LIMITS")
                    let inBox = existingCards.findIndex(card => card.name === cardName);
                    let inNewList = newDict.findIndex(card => card.name === cardName);
                    let inUpdateList = updateDict.findIndex(card => card.name === cardName);
                    if (inUpdateList > -1) { //card already in update list
                        console.log("ALREADY IN UPDATE", inUpdateList)
                        if (selectedBox?.type !== "commander") {
                            updateDict[inUpdateList].quantity += +cardQuantity;
                            updateDict[inUpdateList].foil += +cardFoil;
                            setFill(fill + +cardQuantity + +cardFoil)
                        } else {
                            setMsg(COMMANDER_ERROR)
                        }
                    }
                    else if (inNewList > -1) { //card already in new card list
                        console.log("ALREADY IN NEW CARD LIST", inNewList)
                        if (selectedBox?.type !== "commander") {
                            newDict[inNewList].quantity += +cardQuantity;
                            newDict[inNewList].foil += +cardFoil;
                            setFill(fill + +cardQuantity + +cardFoil)
                        } else {
                            setMsg(COMMANDER_ERROR)
                        }
                        
                    } else if (inBox > -1) { //card already in box
                        console.log("ALREADY IN CARDS LIST", inBox)
                        if (selectedBox?.type !== "commander") {
                            const dupe = existingCards[inBox];
                            let updateCard = new Card(dupe.name, dupe.quantity + Number(cardQuantity), dupe.foil + Number(cardFoil), dupe.commander, dupe.id)
                            setUpdateDict(cards => [...cards, updateCard])
                            setFill(fill + +cardQuantity + +cardFoil)
                        } else {
                            setMsg(COMMANDER_ERROR)
                        }

                    } else { //card not found
                        console.log("NEW CARD")
                        if (selectedBox?.type !== "commander"){
                            const newCard = new Card(cardName, Number(cardQuantity), Number(cardFoil), false);
                            setNewDict(cards => [...cards, newCard])
                            setFill(fill + +cardQuantity + +cardFoil)
                        } else if (selectedBox.type === "commander") {
                            if ((+cardQuantity == 1 || +cardFoil == 1) && !(+cardQuantity == 1 && +cardFoil == 1) ) {
                                const newCard = new Card(cardName, Number(cardQuantity), Number(cardFoil), false);
                                setNewDict(cards => [...cards, newCard])
                                setFill(fill + +cardQuantity + +cardFoil)
                            } else {
                                //Commander error
                                setMsg(COMMANDER_LIMIT_ERROR)
                            }
                        } else {
                            //generic error
                            setMsg(GENERIC_ERROR)
                        }
                    }
                } else {
                    //Card quantity exceeds box limit
                    setMsg(CAPACITY_ERROR)
                }
            } else {
                //Foil and quantity values must have at least one non-zero value
                setMsg(QUANTITY_ERROR)
            }
        } else {
            //No card name given 
            setMsg(CARD_ERROR)
        }

        handleCloseAddCard();
    }

    const handleCloseMsg = () => {
        setMsg("")
    }


    useEffect(() => {
        if (msg === SUCCESS_MSG) {
            const timeout = setTimeout(() => {
                setMsg("")
              }, 5000);
          
             return () => clearTimeout(timeout);
        }
    }, [msg])

    return (
        <div className={`mb-justify-center mb-align-items-center mb-modal ${newCardModalOpen ? "visible" : ""}`}>
            <div className="mb-modal-content">
                <div className="mb-modal-header mb-d-flex mb-flex-row mb-justify-between ">
                    <div className="mb-d-flex mb-flex-row">
                        <div className="mb-d-flex mb-align-items-center">Add New Card(s)</div>
                        {!addCard &&<div className="mb-button-primary" onClick={handleAddNewCard}>+</div>}
                    </div>
                    
                    <div className="mb-button-secondary" onClick={handleClose}>x</div>
                </div>
                <div className="mb-modal-body">
                    {
                        addCard && <div className="mb-d-flex mb-flex-col add-card-input">
                            <div className="mb-d-flex mb-flex-col mb-input-long">
                                <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Card Name</p></div>
                                
                                <input value={cardName} onChange={event => setCardName(event.target.value)} />
                            </div>
                            <div className="mb-d-flex">
                                <div className="mb-d-flex mb-flex-col mb-input-short mb-short-l">
                                    <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Quantity</p></div>
                                    <input value={cardQuantity} type="number" min="0" onChange={event => setCardQuantity(event.target.value)}/>
                                </div>
                                <div className="mb-d-flex mb-flex-col mb-input-short mb-short-r">
                                    <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Quantity (Foil)</p></div>
                                    <input value={cardFoil} type="number" min="0" onChange={event => setCardFoil(event.target.value)}/>
                                </div>
                            </div>
                            <div className="mb-d-flex flex-row ">
                                <div className="mb-button-secondary mb-button-sm discard-button" onClick={handleCloseAddCard}><p>Discard</p></div>
                                <div className="mb-button-primary mb-button-sm" onClick={handleAddCardToList}><p>Add to List</p></div>
                            </div>
                        </div>
                    }
                    {
                        msg !== "" && <div className="mb-d-flex mb-align-items-center message-box mb-justify-between">
                            <div className="mb-d-flex mb-justify-between message"><p>{msg}</p></div>
                            <div className="mb-button-primary mb-button-xs" onClick={handleCloseMsg}><p>x</p></div>
                        </div>
                    }
                    {
                        Object.keys(newDict).length === 0 && Object.keys(updateDict).length === 0 && <div className="mb-d-flex mb-justify-center mb-align-items-center no-content">No New Cards to Add</div>
                    }
                    
                    {
                        Object.keys(newDict).length !== 0 && 
                        <div className="mb-d-flex mb-flex-col card-content">
                            <div className="subtitle">New Cards</div>
                            { Object.values(newDict).map((card, index) => (
                                <div key={index} className="mb-d-flex mb-flex-col mb-font popup-card">
                                    <div className="mb-text-left card-name">{(card as Card).name}</div>
                                    <div className="mb-d-flex mb-flex-row">
                                        <div className="card-field">Quantity: {(card as Card).quantity}</div>
                                        <div className="card-field">Quantity (Foil): {(card as Card).foil}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    
                    {
                        Object.keys(updateDict).length !== 0 && 
                        <div className="mb-d-flex mb-flex-col card-content">
                            <div className="subtitle">Updated Cards</div>
                            { Object.values(updateDict).map((card, index) => (
                                <div key={index} className="mb-d-flex mb-flex-col mb-font popup-card">
                                    <div className="mb-text-left card-name">{(card as Card).name}</div>
                                    <div className="mb-d-flex mb-flex-row">
                                        <div className="card-field">Quantity: {(card as Card).quantity}</div>
                                        <div className="card-field">Quantity (Foil): {(card as Card).foil}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                </div>
                <div className="mb-modal-footer mb-d-flex mb-justify-between mb-align-items-center">

                    <div className="footer-context">{fill}/{capacity}</div>
                    <div className="mb-d-flex">
                        <div className="mb-button-secondary" onClick={handleClose}><p>Cancel</p></div>
                        <div className="mb-button-primary" onClick={handleCreateNewCard}><p>Add</p></div>
                    </div>
                </div>
                
            </div>
            
                
        </div>
    )
}

export default NewCardModal;