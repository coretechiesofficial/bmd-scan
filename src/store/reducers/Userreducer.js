const initialState = {
    lang : ''
};

export default function langreducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_LANG":
            return { ...state, lang: action.payload };
        default:
            return state;
    }
}