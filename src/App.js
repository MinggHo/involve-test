import React from 'react';
import {Forms} from './components/Forms'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Forms></Forms>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
