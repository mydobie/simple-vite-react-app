import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from 'react-bootstrap';
import SetAxios from '../template/SetAxios';
import Header from './template/Header';
import Footer from './template/Footer';
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import constants from '../constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const Router = constants.USE_HASH === 'true' ? HashRouter : BrowserRouter;

type UserContextType = {
  user: string;
  setUser: (userName: string) => void;
};

export const UserContext = React.createContext<UserContextType>({
  user: '',
  setUser: () => {},
});

function App() {
  const basename = '';
  const [user, setUser] = React.useState('superUser');
  return (
    <>
      <Router basename={basename}>
        <QueryClientProvider client={queryClient}>
          <SetAxios />
          <Header />
          <AppNavBar />
          <Container>
            <main>
              <UserContext.Provider value={{ user, setUser }}>
                <AppRoutes />
              </UserContext.Provider>
            </main>
          </Container>
          <Footer />
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
