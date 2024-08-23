import { initialState } from "./InitialState";

const ProfileReducer = (state = initialState, action) => {
    switch(action.type) {
        case "DETAILS":
            return {
                ...state,
                profileDetails:action.payload
            };
            case "EditDetails":
                return {
                    ...state,
                    profileDetails:action.payload
                };

            case "SELECTED-DATA":
                return{
                    selectedDate:action.payload
                };
            case "USER_DATA":
                return{
                    ...state,userData:action.payload
                }
            case "SKILL_SET_DATA":
                return{
                    ...state,skillSetData:action.payload
                }
        default:
            return state;
    }
};

export default ProfileReducer;