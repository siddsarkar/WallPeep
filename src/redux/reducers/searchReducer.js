import * as types from '../types'

const initialState = {
    data: {
        total: null,
        total_pages: null,
        results: []
    },
    search_type: 'photos', // or collections or users,
    query: '',
    page: 1,
    per_page: 30,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GOT_SEARCH_RESULTS:
            return {
                ...state,
                data: action.data,
                search_type: action.search_type,
                query: action.query,
                page: action.page,
                per_page: action.per_page,
                error: ''
            }
        case types.GOT_MORE_SEARCH_RESULTS:
            return {
                ...state,
                data: {
                    ...state.data,
                    results: [...state.data.results, ...action.data.results]
                },
                search_type: action.search_type,
                query: action.query,
                page: action.page,
                per_page: action.per_page
            }
        case types.FAILED_SEARCH_RESULTS:
            return {
                ...state,
                error: action.error,
                search_type: action.search_type,
                query: action.query,
                page: action.page,
                per_page: action.per_page
            }
        default:
            return state
    }
}

export default reducer
