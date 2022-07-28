import { USER } from "../types/user.type";

const getUser = (user) => {
    return {
        type: USER,
        payload: user
    }
}

export default getUser;