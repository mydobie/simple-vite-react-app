// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ROUTES from './AppRouteNames';

const NavItem: React.FC<{
  to: string;
  end?: boolean;
  children: React.FC | string;
}> = ({ to, end, children }) => (
  <Nav.Item>
    <NavLink
      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      to={to}
      end={end}
    >
      {children}
    </NavLink>
  </Nav.Item>
);

const AppNavBar = (): ReactElement => (
  <nav>
    <Nav>
      {Object.keys(ROUTES).map((routeKey) => (
        <NavItem key={ROUTES[routeKey].route} to={ROUTES[routeKey].route}>
          {ROUTES[routeKey].name}
        </NavItem>
      ))}
    </Nav>
  </nav>
);

export default AppNavBar;
