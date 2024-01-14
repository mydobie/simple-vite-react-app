import { ReactElement } from 'react';
import { Image } from 'react-bootstrap';
import DaisyImage from '../../images/daisies.jpg';

const Daisies = (): ReactElement => (
  <>
    Daisies: <br />
    <Image
      rounded
      style={{ width: '200px' }}
      src={DaisyImage}
      data-testid='daisiesimage'
      alt='Daisies'
    />
    {/* https://en.wikipedia.org/wiki/Bellis_perennis */}
  </>
);

export default Daisies;
