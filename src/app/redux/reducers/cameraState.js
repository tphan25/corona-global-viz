import {SET_CAMERA_FLY_TO} from '../actionTypes';
import {Cartesian3} from 'cesium';

const initialState = {
    cameraFlyToProps: {
        duration: 5,
        destination: Cartesian3.fromDegrees(139.767052, 35.681167, 100),
    },
}

export const cameraState = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAMERA_FLY_TO: {
            return {
                ...state,
                ...action.payload
            };
        }
        default: {
            return state;
        }
    }
}