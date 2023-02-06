import Box from "./box";
import { CHANGE_TO_BOX_PAGE, CLOSE_DELETE_BOX_MODAL, CLOSE_EDIT_BOX_MODAL, CLOSE_NEW_BOX_MODAL, LOAD_ALL_BOXES, OPEN_DELETE_BOX_MODAL, OPEN_EDIT_BOX_MODAL, OPEN_NEW_BOX_MODAL, UPDATE_SELECTED_BOX } from "./boxTypes";


interface BoxState {
    box: Box | null;
    boxes: Box[];
    newBoxModalOpen: boolean;
    editBoxModalOpen: boolean;
    deleteBoxModalOpen: boolean;
}

const initialState = {
    box: null,
    boxes: [],
    newBoxModalOpen: false,
    editBoxModalOpen: false,
    deleteBoxModalOpen: false,
}

const boxReducer = (
    state: BoxState = initialState,
    action: any,
): BoxState => {

    switch(action.type) {
        case CHANGE_TO_BOX_PAGE:
            return {
                ...state,
                box: action.payload.box,
            }
        case UPDATE_SELECTED_BOX:
            return {
                ...state,
                box: action.payload.box,
            }
        case LOAD_ALL_BOXES:
            return {
                ...state,
                boxes: action.payload.boxes,
            }
        case OPEN_NEW_BOX_MODAL:
            return {
                ...state,
                newBoxModalOpen: true,
            }
        case CLOSE_NEW_BOX_MODAL:
            return {
                ...state,
                newBoxModalOpen: false,
            }
        case OPEN_EDIT_BOX_MODAL:
            return {
                ...state,
                editBoxModalOpen: true,
            }
        case CLOSE_EDIT_BOX_MODAL:
            return {
                ...state,
                editBoxModalOpen: false,
            }
        case OPEN_DELETE_BOX_MODAL:
            return {
                ...state,
                deleteBoxModalOpen: true,
                box: action.payload.box,
            }
        case CLOSE_DELETE_BOX_MODAL:
            return {
                ...state,
                deleteBoxModalOpen: false,
                box: null,
            }
        default:
            return state
    }
}

export default boxReducer;