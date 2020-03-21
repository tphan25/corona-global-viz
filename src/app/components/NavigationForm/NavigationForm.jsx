import { setCameraFlyTo } from '../../redux/actions';
import styles from './NavigationForm.module.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
;


const RECTANGULAR_FORM_TYPE = 'Rectangular';
const CARTESIAN_FORM_TYPE = 'Cartesian';
const radio = 'radio';

const CartesianForm = ({ values, onChange }) => {
    const { longitude, latitude } = values;
    return (
        <>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Longitude (degrees)</Form.Label>
                        <Form.Control name="longitude" type="number" placeholder="Enter longitude coordinate.." value={longitude} onChange={onChange} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Latitude (degrees)</Form.Label>
                        <Form.Control name="latitude" type="number" placeholder="Enter latitude coordinate.." value={latitude} onChange={onChange} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};

const RectangularForm = ({ values, onChange }) => {
    const { west, south, east, north } = values;
    return (
        <>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>West (radians)</Form.Label>
                        <Form.Control name="west" type="number" placeholder="Enter west coordinate.." value={west} onChange={onChange} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>South (radians)</Form.Label>
                        <Form.Control name="south" type="number" placeholder="Enter south coordinate.." value={south} onChange={onChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>East (radians)</Form.Label>
                        <Form.Control name="east" type="number" placeholder="Enter east coordinate.." value={east} onChange={onChange} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>North (radians)</Form.Label>
                        <Form.Control name="north" type="number" placeholder="Enter north coordinate.." value={north} onChange={onChange} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
}

const NavigationForm = ({ setCameraFlyTo }) => {
    const [cartesianCoords, setCartesianCoords] = useState({ longitude: '', latitude: '' });
    const [rectangularCoords, setRectangularCoords] = useState({ west: '', south: '', east: '', north: '' });
    const [coordinateFormType, setCoordinateFormType] = useState(CARTESIAN_FORM_TYPE);

    const onFormTypeChange = (event) => {
        setCoordinateFormType(event.target.name);
    }

    const onCartesianCoordinateChange = (event) => {
        setCartesianCoords({
            ...cartesianCoords,
            [event.target.name]: event.target.value,
        });
    }

    const onRectangularCoordinateChange = (event) => {
        setRectangularCoords({
            ...rectangularCoords,
            [event.target.name]: event.target.value,
        });
    }

    const flyTo = () => {
        switch (coordinateFormType) {
            case CARTESIAN_FORM_TYPE: {
                const copy = Object.assign({}, { ...cartesianCoords });
                Object.keys(copy).forEach(key => {
                    copy[key] = parseInt(copy[key], 10);
                });
                setCameraFlyTo({ destination: copy });
                return;
            };
            case RECTANGULAR_FORM_TYPE: {
                const copy = Object.assign({}, { ...rectangularCoords });
                Object.keys(copy).forEach(key => {
                    copy[key] = parseInt(copy[key], 10);
                });
                setCameraFlyTo({ destination: rectangularCoords });
                return;
            };
            default: return;
        };
    };

    const renderCoordinateForm = (type) => {
        switch (type) {
            case RECTANGULAR_FORM_TYPE: {
                return (
                    <RectangularForm
                        values={rectangularCoords}
                        onChange={onRectangularCoordinateChange}
                    />
                )
            }
            case CARTESIAN_FORM_TYPE: {
                return (
                    <CartesianForm
                        values={cartesianCoords}
                        onChange={onCartesianCoordinateChange}
                    />
                )
            }
            default: {
                return null;
            }
        }
    }

    return (
        <Form inline>
            <Card className={styles.formContainer}>
                <h4>Navigation Menu</h4>
                <Card className={styles.cardContainer}>
                    <Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Label><h6>Coordinate Type:{' '}</h6></Form.Label>
                            </Col>
                            <Col md={3}>
                                <Form.Check
                                    className={styles.formTypeButton}
                                    type={radio}
                                    name={CARTESIAN_FORM_TYPE}
                                    label={CARTESIAN_FORM_TYPE}
                                    onChange={onFormTypeChange}
                                    checked={coordinateFormType === CARTESIAN_FORM_TYPE}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check
                                    className={styles.formTypeButton}
                                    type={radio}
                                    name={RECTANGULAR_FORM_TYPE}
                                    label={RECTANGULAR_FORM_TYPE}
                                    onChange={onFormTypeChange}
                                    checked={coordinateFormType === RECTANGULAR_FORM_TYPE}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Card>
                <Card className={styles.cardContainer}>
                    {renderCoordinateForm(coordinateFormType)}
                </Card>
                <Button type="button" onClick={flyTo}>Navigate</Button>
            </Card>
        </Form>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        setCameraFlyTo: (args) => dispatch(setCameraFlyTo(args)),
    }
}

export default connect(null, mapDispatchToProps)(NavigationForm);