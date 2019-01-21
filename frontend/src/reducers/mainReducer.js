const mainReducer = (state=[], action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return state.concat([action.data]);
        default:
            return state;
    }
};

export default mainReducer;
