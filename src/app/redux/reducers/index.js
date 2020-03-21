import { combineReducers } from 'redux';

import { panelState } from './panelState';
import { cameraState } from './cameraState';

const rootReducer = combineReducers({ panelState, cameraState })

export default rootReducer;