import { CLOSE_ERROR_MODAL, OPEN_ERROR_MODAL } from "./errorTypes"

export const openErrorModal = (errorTitle: string, errorMsg: string) => {
    return ({
        type: OPEN_ERROR_MODAL,
        payload: {
            errorTitle,
            errorMsg,
        }
    })
}

export const closeErrorModal = () => {
    return ({
        type: CLOSE_ERROR_MODAL,
        payload: {
        }
    })
}