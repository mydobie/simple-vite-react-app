import { ReactElement, useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import ROUTES from '../AppRouteNames';

// *** Main component ***
const RedirectPage = (): ReactElement => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      // EXAMPLE: Automatically forwarding to a route (without a button click)
      navigate(ROUTES.HOME.route);
      return;
    }
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, [count, navigate]);

  return (
    <>
      <Row>
        <Col>
          <h1>Redirect</h1>
          <p>
            You will automatically be directed to the home page in {count}{' '}
            seconds!
          </p>
          <p>
            <Link to={ROUTES.HOME.route}>Go to home page</Link>
          </p>
          <p>
            <Button
              onClick={() => {
                navigate(ROUTES.HOME.route);
              }}
            >
              Go to home page
            </Button>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default RedirectPage;
