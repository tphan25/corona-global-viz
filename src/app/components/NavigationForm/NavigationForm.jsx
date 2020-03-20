import React, {useState} from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import {setCameraFlyTo} from '../../redux/actions';
import styles from './NavigationForm.module.css';

const RECTANGULAR_FORM_TYPE = 'Rectangular Coordinate Form';
const CARTESIAN_FORM_TYPE = 'Cartesian Coordinate Form';
const radio = 'radio';

const CartesianForm = ({values, onChange}) => {
    const {x, y, z} = values;
    return (
        <>
            <Form.Group>
                <Form.Label>X-Coordinate</Form.Label>
                <Form.Control name="x" type="number" placeholder="Enter x-coordinate.." value={x} onChange={onChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Y-Coordinate</Form.Label>
                <Form.Control name="y" type="number" placeholder="Enter x-coordinate.." value={y} onChange={onChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Z-Coordinate</Form.Label>
                <Form.Control name="z" type="number" placeholder="Enter x-coordinate.." value={z} onChange={onChange} />
            </Form.Group>
        </>
    );
};

const RectangularForm = ({values, onChange}) => {
    const {west, south, east, north} = values;
    return (
        <>
            <Form.Group>
                <Form.Label>West</Form.Label>
                <Form.Control name="west" type="number" placeholder="Enter west coordinate.." value={west} onChange={onChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Y-Coordinate</Form.Label>
                <Form.Control name="south" type="number" placeholder="Enter south coordinate.." value={south} onChange={onChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Z-Coordinate</Form.Label>
                <Form.Control name="east" type="number" placeholder="Enter east coordinate.." value={east} onChange={onChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Z-Coordinate</Form.Label>
                <Form.Control name="north" type="number" placeholder="Enter north coordinate.." value={north} onChange={onChange} />
            </Form.Group>
        </>
    );
}

const NavigationForm = form => {
    const [cartesianCoords, setCartesianCoords] = useState({x: '', y: '', z: ''});
    const [rectangularCoords, setRectangularCoords] = useState({west: '', south: '', east: '', north: ''});
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
        <Form>
            <Card className={styles.formContainer}>
                <h4>Navigation Menu</h4>
                <Card className={styles.cardContainer}>
                    <Form.Group>
                        <Form.Label>Form Type</Form.Label>
                        <Form.Check 
                            type={radio}
                            name={CARTESIAN_FORM_TYPE}
                            label={CARTESIAN_FORM_TYPE}
                            onChange={onFormTypeChange}
                            checked={coordinateFormType === CARTESIAN_FORM_TYPE}
                        />
                        <Form.Check 
                            type={radio}
                            name={RECTANGULAR_FORM_TYPE}
                            label={RECTANGULAR_FORM_TYPE}
                            onChange={onFormTypeChange}
                            checked={coordinateFormType === RECTANGULAR_FORM_TYPE}
                        />
                    </Form.Group>
                </Card>
                <Card className={styles.cardContainer}>
                    {renderCoordinateForm(coordinateFormType)}
                </Card>
                <Button type="button">Navigate</Button>
            </Card>
        </Form>
    );
};
function mapDispatchToProps(dispatch) {
    return {
        setCameraFlyTo: setCameraFlyTo,
    }
}

export default connect(null, mapDispatchToProps)(NavigationForm);