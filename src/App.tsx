import { BrowserRouter, HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from 'react-bootstrap';
import SetAxios from './template/SetAxios';
import Header from './template/Header';
import Footer from './template/Footer';
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import constants from './constants';

// Delete if  demo files are removed
import DemoApp from './demoFiles/App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const Router = constants.USE_HASH === 'true' ? HashRouter : BrowserRouter;

function App() {
  const basename = '';

  // Delete this if block if demo files are removed
  if (constants.USE_DEMO === 'true') {
    return <DemoApp />;
  }

  return (
    <>
      <Router basename={basename}>
        <QueryClientProvider client={queryClient}>
          <SetAxios />
          <Header />
          <AppNavBar />
          <Container>
            <main>
              <AppRoutes />
            </main>
          </Container>
          <Footer />
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
