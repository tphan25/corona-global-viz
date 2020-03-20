import {TOGGLE_PANEL_OPEN} from '../actionTypes';

const initialState = {
    open: true,
}
export const panelState = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_PANEL_OPEN: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state;
        }
    }
}