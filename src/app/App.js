import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {SideMenu} from './components/SideMenu/SideMenu';
import VizContainer from './components/VizContainer/VizContainer';

function App() {
  return (
    <Container fluid id="app-container">
        <Row md={12} className="full-height no-padding no-margin">
          <Col md={8} className="full-height no-padding no-margin">
            <VizContainer />
          </Col>
          <Col md={4} className="full-height no-padding no-margin">
            <SideMenu />
          </Col>
        </Row>
    </Container>
    
  );
}

export default App;
