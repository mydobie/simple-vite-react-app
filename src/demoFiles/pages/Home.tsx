import { ReactElement } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Home = (): ReactElement => (
  <Row>
    <Col>
      <Card bg='secondary' text='white'>
        <Card.Body>
          <h1>Sample Application </h1>
          <p>This is the home page for an application</p>
        </Card.Body>
      </Card>
      <p>
        This project can be used as template when starting other React projects.
      </p>
    </Col>
  </Row>
);

export default Home;
