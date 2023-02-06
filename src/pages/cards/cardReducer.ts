import Card from "./card";
import { CLOSE_CARD_MODAL, CLOSE_NEW_CARD_MODAL, LOAD_CARDS, OPEN_CARD_MODAL, OPEN_NEW_CARD_MODAL } from "./cardTypes";

interface CardState {
    card: Card | null;
    cards: Card[];
    newCardModalOpen: boolean;
    cardModalOpen: boolean;
}

const initialState = {
    card: null,
    cards: [],
    newCardModalOpen: false,
    cardModalOpen: false,
}

const cardReducer = (
    state: CardState = initialState,
    action: any,
): CardState => {

    switch(action.type) {
        case LOAD_CARDS: 
            return {
                ...state,
                cards: action.payload.cards,
            }
        case OPEN_NEW_CARD_MODAL:
            return {
                ...state,
                newCardModalOpen: true,
            }
        case CLOSE_NEW_CARD_MODAL:
            return {
                ...state,
                newCardModalOpen: false,
            }
        case OPEN_CARD_MODAL:
            return {
                ...state,
                cardModalOpen: true,
                card: action.payload.card,
            }
        case CLOSE_CARD_MODAL:
            return {
                ...state,
                cardModalOpen: false,
                card: null,
            }
        default:
            return state
    }
}

export default cardReducer;