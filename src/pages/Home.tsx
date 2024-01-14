import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

import { ReactElement } from 'react';

const Home = (): ReactElement => (
  <>
    <div>
      <a href='https://vitejs.dev'>
        <img src={viteLogo} className='logo' alt='Vite logo' />
      </a>
      <a href='https://react.dev'>
        <img src={reactLogo} className='logo react' alt='React logo' />
      </a>
    </div>
    <h1>Vite + React</h1>
    <p className='read-the-docs'>
      Click on the Vite and React logos to learn more
    </p>
  </>
);

export default Home;
