import React from 'react';
import { connect } from 'react-redux';
import { Cartesian3, Rectangle } from 'cesium';
import { Viewer, Scene, Globe, Camera, Entity, CameraFlyTo } from 'resium';

const VizContainer = ({ cameraState }) => {
    const renderCameraFlyTo = (payload) => {
        if (payload === null) {
            return null;
        }
        Object.keys(payload).forEach(key => {
            if (payload[key] === '' || payload[key] === null) {
                return null;
            }
        });
        if (payload.destination.longitude && payload.destination.latitude) {
            const { longitude, latitude } = payload.destination;
            // TODO: Add an available height
            return <CameraFlyTo duration={2} destination={new Cartesian3.fromDegrees(longitude, latitude, 2000000)} />;
        }
        const directions = ['west', 'south', 'east', 'north'];
        if (directions.reduce((prev, curr) => prev && payload.destination[curr], true)) {
            const { west, south, east, north } = payload.destination;
            return <CameraFlyTo duration={2} destination={new Rectangle(west, south, east, north)} />
        }
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

function mapStateToProps(state) {
    return {
        cameraState: state.cameraState,
    }
}

export default connect(mapStateToProps)(VizContainer);
