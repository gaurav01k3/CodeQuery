import { USER } from "../types/user.type";

const initialState = {
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER: return {
            ...action.payload
        }
        default: return state
    }
}

export default userReducer;


