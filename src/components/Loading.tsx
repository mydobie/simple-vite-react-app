/*
Simple component to display a loading icon
*/

import { ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';

// ** Main component  type */
type LoadingProps = {
  size?: string;
  color?: string;
  children?: ReactElement | string;
};

// *** Main component ***
const Loading = ({
  size = '60px',
  color = 'secondary',
  children = 'Loading',
}: LoadingProps): ReactElement => (
  <div style={{ display: 'inline-block' }} data-testid='Loading'>
    <Spinner
      style={size === 'sm' ? undefined : { width: size, height: size }}
      variant={color}
      animation='border'
      role='status'
      size={size === 'sm' ? size : undefined}
    >
      <span className='sr-only visually-hidden'>{children}</span>
    </Spinner>
  </div>
);

export default Loading;
