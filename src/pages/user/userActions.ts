import { LOAD_BOX_LIMIT } from "./userTypes"

export const setBoxLimit = (boxLimit: number) => {
    return ({
        type: LOAD_BOX_LIMIT,
        payload: {
            boxLimit: boxLimit
        }
    })
}