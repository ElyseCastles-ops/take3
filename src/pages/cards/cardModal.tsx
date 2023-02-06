import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import { RootState } from "../../";
import { closeCardModal, loadCards } from "./cardActions";
import { useAuth } from "../../context/AuthContext";
import { updateSelectedBox } from "../boxes/boxActions";
import Box from "../boxes/box";
import Card from "./card";
import blank from "../../assets/images/blank_card.png"


interface MTGLegalitiesProps {
    format: string;
    legality: string;
}

interface MTGProps {
    artist: string;
    cmc: number;
    colorIdentity: Array<string>;
    colors: Array<string>;
    flavor: string;
    foreignNames: string;
    id: string;
    imageUrl: string;
    layout: string;
    legalities: Array<MTGLegalitiesProps>;
    manaCost: string;
    multiverseid: string;
    name: string;
    number: string;
    originalText: string;
    origialType: string;
    printings: Array<string>;
    rarity: string;
    set: string;
    setName: string;
    subtypes: Array<string>;
    text: string;
    type: string;
    types: Array<string>;
    variations: Array<string>;

}


const CardModal = () => {

    const dispatch = useDispatch();
    const { getBox, updateBox, deleteCard, getCards, updateSingleCard } = useAuth();

    const cardModalOpen = useSelector((state: RootState) => state.cardReducer.cardModalOpen);
    const box = useSelector((state: RootState) => state.boxReducer.box)
    const card = useSelector((state: RootState) => state.cardReducer.card);

    const [mtgCards, setMtgCards] = useState<Array<MTGProps>>([])

    const [quantity, setQuantity] = useState(0)
    const [foil, setFoil] = useState(0)
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (cardModalOpen === true && card) {
            console.log("COMMANDER PRESENT")
            setQuantity(card.quantity);
            setFoil(card.foil);
            fetch(`https://api.magicthegathering.io/v1/cards?name="${card.name}"`)
                .then(res => res.json())
                .then(result => {
                    console.log("RES", result);
                    setMtgCards(result.cards);
                    
                },
                    (error) => {
                        //TODO: set error
                    })
        } else {
            console.log("NO COMMANDER FOUND")
        }

    }, [cardModalOpen])

    const handleClose = () => {
        setMtgCards([])
        dispatch(closeCardModal())
        if (box) {
            console.log("GETTING CARDS", box)
            //getCards(box.id, dispatch)
        }

    }

    const handleUpdateCard = () => {
        setUpdate(true)
    }

    const handleSaveChanges = () => {
        if (card && box) {
            let quantDif = quantity - card.quantity;
            let foilDif = foil - card.foil;
            let newFill = box.fill + quantDif + foilDif;
            if (newFill <= box.capacity) {
                updateBox(box, { fill: newFill }).then(() => {
                    getBox(box.id).then((box: Box) => {
                        dispatch(updateSelectedBox(box))
                    })
                }).then(() => {
                    updateSingleCard(card, box, {quantity: quantity, foil: foil})
                    .then(() => {
                        getCards(box.id).then((cardList: Card[]) => {
                            dispatch(loadCards(cardList))
                        })
                    })
                })


                
            } else {
                //TODO: add error message if fill exceeds the box capacity
            }


        }

        setUpdate(false)
    }

    const handleDeleteCard = () => {
        if (card?.commander === false) {
            if (card && box) {
                let newFill = box.fill - card.quantity - card.foil;
                updateBox(box, { fill: newFill }).then(() => {
                    getBox(box.id).then((box: Box) => {
                        dispatch(updateSelectedBox(box))
                    })
                }).then(() => {
                    deleteCard(card, box).then((res: any) => {
                        getCards(box.id).then((cardList: Card[]) => {
                            dispatch(loadCards(cardList))
                        })
                    })
                })
            }
        }
        //TODO: How to handle deleting of cmd
        handleClose()
    }

    const handleDicardChanges = () => {
        setQuantity(card ? card?.quantity : 0);
        setFoil(card ? card?.foil : 0)
        setUpdate(false)
    }


    return (
        <div className={`mb-justify-center mb-align-items-center mb-modal ${cardModalOpen ? "visible" : ""}`}>
            <div className="mb-modal-content">
                <div className="mb-modal-header mb-d-flex mb-flex-row mb-justify-between ">
                    <div className="mb-d-flex mb-flex-row">
                        <div className="mb-d-flex mb-align-items-center">{card ? card.name : "Error finding card name"}</div>
                    </div>

                    <div className="mb-button-secondary" onClick={handleClose}>x</div>
                </div>

                <div className="mb-mx-60 mb-mb-20 mb-d-flex mb-flex-row mb-gap-10 mb-flex-wrap">
                    <div className="mb-d-flex mb-flex-col mb-justify-between width-50">
                        <div>
                            <div className="mb-d-flex mb-flex-col mb-input-long">
                                <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Quantity</p></div>
                                <input value={quantity} onChange={event => setQuantity(Number(event.target.value))} disabled={!update} />
                            </div>
                            <div className="mb-d-flex mb-flex-col mb-input-long">
                                <div className="mb-d-flex mb-align-items-left mb-input-label"><p>Foil Quantity</p></div>
                                <input value={foil} onChange={event => setFoil(Number(event.target.value))} disabled={!update} />
                            </div>
                            {
                                update &&
                                <div className="mb-d-flex">
                                    <div className="special-width mb-d-flex mb-flex-col">
                                        <div className="mb-button-primary mb-button-xl" onClick={handleSaveChanges}>
                                            <p>Save Changes</p>
                                        </div>
                                        <div className="mb-button-secondary mb-button-xl" onClick={handleDicardChanges}>
                                            <p>Discard Changes</p>
                                        </div>
                                    </div>

                                </div>

                            }


                        </div>
                        <div className="mb-d-flex mb-gap-10">
                            <div className="mb-button-secondary mb-mx-0"><p>Move</p></div>
                            <div className="mb-button-secondary mb-mx-0" onClick={handleDeleteCard}><p>Delete</p></div>
                            <div className="mb-button-primary mb-mx-0" onClick={handleUpdateCard}><p>Update</p></div>
                        </div>



                    </div>
                    <div className="mb-d-flex width-50">
                        {mtgCards.length > 0 ? (
                            <img className="card-image" alt="card" src={mtgCards[0].imageUrl} />
                        ) : (
                            <img className="card-image" alt="card" src={blank} />
                        )}

                    </div>
                </div>


                <div className="mb-d-flex mb-justify-between mb-align-items-center mb-modal-footer">

                    <div className="footer-context"></div>
                    <div className="mb-d-flex">
                        {/* <div className="mb-button-secondary" onClick={handleClose}><p>Close</p></div> */}
                        <div className="mb-button-primary" onClick={handleClose}><p>Close</p></div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default CardModal;