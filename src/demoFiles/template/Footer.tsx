import { ReactElement } from 'react';
import { Card } from 'react-bootstrap';

const Footer = (): ReactElement => (
  <footer>
    <Card bg='light' style={{ marginTop: '20px' }}>
      This is a footer
    </Card>
  </footer>
);

export default Footer;
