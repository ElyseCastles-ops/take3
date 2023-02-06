import Card from "./card"
import { CLOSE_CARD_MODAL, CLOSE_NEW_CARD_MODAL, LOAD_CARDS, OPEN_CARD_MODAL, OPEN_NEW_CARD_MODAL } from "./cardTypes"

export const loadCards = (cards: Card[]) => {
    return ({
        type: LOAD_CARDS,
        payload: {
            cards: cards,
        }
    })
}

export const openNewCardModal = () => {
    return ({
        type: OPEN_NEW_CARD_MODAL,
    })
}

export const closeNewCardModal = () => {
    return ({
        type: CLOSE_NEW_CARD_MODAL,
    })
}

export const openCardModal = (card: Card) => {
    return ({
        type: OPEN_CARD_MODAL,
        payload: {
            card: card,
        }
    })
}

export const closeCardModal = () => {
    return ({
        type: CLOSE_CARD_MODAL,
    })
}