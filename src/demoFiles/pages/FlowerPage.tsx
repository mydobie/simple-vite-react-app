import React, { ReactElement } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import ROUTES from '../AppRouteNames';

const FlowerPage = (): ReactElement => {
  const location = useLocation().pathname.replaceAll('/', '');
  const [activeTab, setActiveTab] = React.useState<string | undefined>('');

  const flowerRoute = ROUTES.FLOWERS.route;
  const initialTab = ROUTES.FLOWERS.nested?.TULIPS.route;

  React.useEffect(() => {
    if (flowerRoute && location === flowerRoute) {
      setActiveTab(initialTab);
    } else {
      setActiveTab(location.replaceAll(flowerRoute, ''));
    }
  }, [flowerRoute, location, initialTab]);

  const isActive = (tab: string | undefined) => tab === activeTab;

  return (
    <>
      <Row>
        <Col>
          <h1>Flowers</h1>
          <p data-testid='pagecontent'>
            Cupcake ipsum dolor sit amet lollipop pie cake. Tiramisu donut lemon
            drops cake halvah marshmallow I love cotton candy. Cookie icing
            tootsie roll macaroon halvah jelly-o. Tart cookie gummi bears
            chocolate bar toffee pudding liquorice. Danish tart gummi bears
            chocolate cake icing. Cake I love caramels caramels chupa chups
            fruitcake. Dessert I love shortbread I love toffee jelly beans.
            Chocolate fruitcake gingerbread biscuit sugar plum shortbread.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav variant='tabs' defaultActiveKey='/home' role='tablist'>
            <Nav.Item>
              <NavLink
                role='tab'
                data-testid='tuliptab'
                className={`nav-link ${isActive(ROUTES.FLOWERS.nested?.TULIPS.route) ? 'active' : ''}`}
                to={ROUTES.FLOWERS.nested?.TULIPS.route || ''}
                aria-selected={isActive(ROUTES.FLOWERS.nested?.TULIPS.route)}
              >
                Tulips
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                role='tab'
                data-testid='dasiestab'
                className={`nav-link ${isActive(ROUTES.FLOWERS.nested?.DAISIES.route) ? 'active' : ''}`}
                to={ROUTES.FLOWERS.nested?.DAISIES.route || ''}
                aria-selected={isActive(ROUTES.FLOWERS.nested?.DAISIES.route)}
              >
                Daisies
              </NavLink>
            </Nav.Item>
          </Nav>
          {/* EXAMPLE: Bootstrap utility classes */}
          {/* See: https://getbootstrap.com/docs/5.1/utilities/api/ */}
          <div
            className='p-4 border-end border-bottom border-start'
            role='tabpanel'
          >
            {/* EXAMPLE: Nested routes */}
            <Outlet />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FlowerPage;
