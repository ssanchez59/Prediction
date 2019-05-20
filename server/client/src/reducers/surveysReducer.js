import { FETCH_SURVEYS, VIEW_SURVEY, EDIT_SURVEY } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        case VIEW_SURVEY:
            return action.payload;
        case EDIT_SURVEY:
            return action.payload;
        default:
            return state;
    }
}