import { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from '../pages/Version';
import FourOhFour from '../pages/FourOhFour';
import RedirectPage from './pages/RedirectPage';
import UniversityPage from './pages/UniversityPages';
import AnimalPage from './pages/AnimalPage';
import ColorPage from './pages/ColorPage';
import FlowerPage from './pages/FlowerPage';
import Tulips from './components/Flowers/Tulips';
import Daisies from './components/Flowers/Daisies';

// TODO might want to change this into an array that both routes and
// nav bar can be built from
// https://reactrouter.com/en/main/routers/create-browser-router

const AppRoutes = (): ReactElement => (
  <>
    <Routes>
      <Route path={ROUTES.HOME.route} element={<Home />} />
      {/* EXAMPLE: Route with a redirect*/}
      <Route path='/home' element={<Navigate to={ROUTES.HOME.route} />} />

      <Route path={ROUTES.VERSION.route} element={<Version />} />
      <Route path={ROUTES.REDIRECT.route} element={<RedirectPage />} />
      <Route path={ROUTES.UNIVERSITIES.route} element={<UniversityPage />} />

      {/* EXAMPLE: Route with values in url */}
      <Route path={ROUTES.COLOR.route} element={<ColorPage />}>
        <Route
          path={`:${ROUTES.COLOR.params?.COLOR_NAME}`}
          element={<ColorPage />}
        />
      </Route>

      {/* EXAMPLE: Route optional parameters */}
      {/* Simulates:  /animal/:animaltype?/name/:animalname? */}
      <Route path={ROUTES.ANIMAL.route} element={<AnimalPage />}>
        <Route
          path={`:${ROUTES.ANIMAL.params?.ANIMAL_TYPE}`}
          element={<AnimalPage />}
        >
          <Route
            path={`${ROUTES.ANIMAL.params?.ANIMAL_NAME}`}
            element={<AnimalPage />}
          >
            <Route
              path={`:${ROUTES.ANIMAL.params?.ANIMAL_NAME}`}
              element={<AnimalPage />}
            />
          </Route>
        </Route>
      </Route>

      {/* EXAMPLE: Nested routes */}
      <Route path={ROUTES.FLOWERS.route} element={<FlowerPage />}>
        <Route index element={<Tulips />} />
        <Route
          path={ROUTES.FLOWERS.nested?.TULIPS.route}
          element={<Tulips />}
        />
        <Route
          path={ROUTES.FLOWERS.nested?.DAISIES.route}
          element={<Daisies />}
        />
      </Route>

      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
