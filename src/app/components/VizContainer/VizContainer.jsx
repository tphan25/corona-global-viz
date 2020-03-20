import React from 'react';
import {connect} from 'react-redux';
import {Cartesian3} from 'cesium';
import {Viewer, Scene, Globe, Camera, Entity, CameraFlyTo} from 'resium';

const VizContainer = ({cameraState}) => {
    const renderCameraFlyTo = (payload) => {
        if (payload === null) {
            return null;
        }
        return <CameraFlyTo duration={payload.duration} destination={payload.destination} />;
    }

    return (
        <Viewer full
            animation={false}
            homeButton={false}
            fullscreenButton={false}
            baseLayerPicker={false}
            timeline={false}
            sceneModePicker={false}
            selectionIndicator={false}
            navigationInstructionsInitiallyVisible={false}
        >
            <Scene />
            <Globe />
            <Camera />
            {renderCameraFlyTo(cameraState.cameraFlyToProps)}
            <Entity />
        </ Viewer>
    )
}
//props.cameraState.cameraFlyToProps
function mapStateToProps(state) {
    return {
        cameraState: state.cameraState,
    }
}

export default connect(mapStateToProps)(VizContainer);
