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

// TODO: Clean this up and see if we can look through each item
const AppNavBar = (): ReactElement => (
  <nav>
    <Nav>
      <NavItem to={ROUTES.HOME.route} end>
        {ROUTES.HOME.name}
      </NavItem>
      <NavItem to={ROUTES.VERSION.route}>{ROUTES.VERSION.name}</NavItem>
    </Nav>
  </nav>
);

export default AppNavBar;
