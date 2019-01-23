const mainReducer = (state=[], action) => {
    switch (action.type) {
        case "LOGIN_USER":
            window.location = '/movies';
            return state.concat([action.data]);
        default:
            return state;
    }
};

export default mainReducer;
