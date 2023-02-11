import { LOAD_BOX_LIMIT } from "./userTypes";

interface UserState {
    boxLimit: number;
}

const initialState = {
    boxLimit: 0,
}

const userReducer = (
    state: UserState = initialState,
    action: any,
): UserState => {

    switch(action.type) {
        case LOAD_BOX_LIMIT:
            return {
                ...state,
                boxLimit: action.payload.boxLimit
            }
        default:
            return state
    }
}

export default userReducer;