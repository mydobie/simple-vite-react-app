import { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import { PatchQuestion } from 'react-bootstrap-icons';

const FourOhFour = (/* props */): ReactElement => (
  <Row data-testid='404PageContainer'>
    <Col>
      <h1>Page not found</h1>
      <p>The page you requested could not be found.</p>
      <p style={{ textAlign: 'center' }}>
        <PatchQuestion size={200} />
      </p>
    </Col>
  </Row>
);
export default FourOhFour;
