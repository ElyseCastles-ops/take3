import Box from "./box"
import { CHANGE_TO_BOX_PAGE, CLOSE_DELETE_BOX_MODAL, CLOSE_EDIT_BOX_MODAL, CLOSE_NEW_BOX_MODAL, LOAD_ALL_BOXES, OPEN_DELETE_BOX_MODAL, OPEN_EDIT_BOX_MODAL, OPEN_NEW_BOX_MODAL, UPDATE_SELECTED_BOX } from "./boxTypes"

export const goToBoxPage = (box: Box) => {
    return ({
        type: CHANGE_TO_BOX_PAGE,
        payload: {
            box: box
        }
    })
}

export const loadAllBoxes = (boxes: Box[]) => {
    return ({
        type: LOAD_ALL_BOXES,
        payload: {
            boxes: boxes
        }
    })
}

export const updateSelectedBox = (box: Box) => {
    return({
        type: UPDATE_SELECTED_BOX,
        payload: {
            box: box
        }
    })
}

export const openNewBoxModal = () => {
    return ({
        type: OPEN_NEW_BOX_MODAL,
    })
}

export const closeNewBoxModal = () => {
    return ({
        type: CLOSE_NEW_BOX_MODAL,
    })
}

export const openEditBoxModal = () => {
    return ({
        type: OPEN_EDIT_BOX_MODAL,
    })
}

export const closeEditBoxModal = () => {
    return ({
        type: CLOSE_EDIT_BOX_MODAL,
    })
}

export const openDeleteBoxModal = (box: Box) => {
    return ({
        type: OPEN_DELETE_BOX_MODAL,
        payload: {
            box: box,
        }
    })
}

export const closeDeleteBoxModal = () => {
    return ({
        type: CLOSE_DELETE_BOX_MODAL,
    })
}