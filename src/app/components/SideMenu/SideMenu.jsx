import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './SideMenu.module.css';
import '../../App.css';

import {STYLES} from '../../utils/constants';
import {makeClassNames, buildListFromArgs, getValuesOnObject} from '../../utils/utils';
import NavigationForm from '../NavigationForm/NavigationForm';

export const SideMenu = () => {
    return (
        <Container fluid className={
            makeClassNames(
                buildListFromArgs(
                    styles.sideMenuContainer, 
                    getValuesOnObject(STYLES),
                )
            )}>
            <NavigationForm />
        </Container>
    );
};
