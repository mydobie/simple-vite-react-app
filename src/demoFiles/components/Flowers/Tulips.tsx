import { ReactElement } from 'react';
import { Image } from 'react-bootstrap';
import TulipImage from '../../images/tulips.jpg';

const Tulips = (): ReactElement => (
  <>
    Tulips: <br />
    <Image
      rounded
      style={{ width: '200px' }}
      src={TulipImage}
      data-testid='tulipimage'
      alt='Tulips'
    />
    {/* https://en.wikipedia.org/wiki/Tulip */}
  </>
);

export default Tulips;
