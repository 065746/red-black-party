export const initialState = {
    user: null,
    data: null,
    hide: false,
    search: '',
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }
        case 'SET_DATA':
            return {
                ...state,
                data: action.data
            }
        case 'SET_HIDE':
            return {
                ...state,
                hide: action.hide
            }
        case 'SET_SEARCH':
            return{
                ...state,
                search: action.search
            }
        default: {
            return state
        }
    }
}

export default reducer
