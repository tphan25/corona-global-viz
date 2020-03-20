import {TOGGLE_PANEL_OPEN, SET_CAMERA_FLY_TO} from './actionTypes';

export const togglePanelOpen = openState => {
    return {
        type: TOGGLE_PANEL_OPEN,
        payload: {
            open: openState,
        },
    }
}

export const setCameraFlyTo = (payload) => {
    return {
        type: SET_CAMERA_FLY_TO,
        payload: {
            cameraFlyToProps: {
                duration: payload.duration,
                destination: payload.destination,
            },
        },
    }
}