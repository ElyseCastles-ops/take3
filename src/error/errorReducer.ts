import { CLOSE_ERROR_MODAL, OPEN_ERROR_MODAL } from "./errorTypes";

interface BoxState {
    errorModalOpen: boolean;
    errorTitle: string;
    errorMsg: string;
}

const initialState = {
    errorModalOpen: false,
    errorTitle: "",
    errorMsg: "",

}

const errorReducer = (
    state: BoxState = initialState,
    action: any,
): BoxState => {
    switch(action.type) {
        case OPEN_ERROR_MODAL:
            return {
                ...state,
                errorModalOpen: true,
                errorTitle: action.payload.errorTitle,
                errorMsg: action.payload.errorMsg,
            }
        case CLOSE_ERROR_MODAL:
            return {
                ...state,
                errorModalOpen: false,
            }
        default:
            return state
    }
}

export default errorReducer;