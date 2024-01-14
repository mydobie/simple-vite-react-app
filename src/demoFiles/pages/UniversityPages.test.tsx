import {
  render,
  screen,
  waitFor,
  checkAccessibility,
  constantsMock,
} from '~/tests/testUtils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { universitiesAPI } from '../utils/axios.config';
import mockUniversities from '../fixtures/universities.json';
import UniversitiesPage from './UniversityPages';

const mock: MockAdapter = new MockAdapter(axios);

constantsMock;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Sample Universities Page component tests', () => {
  afterEach(async () => {
    queryClient.clear();
    mock.reset();
  });

  test('Component is accessible when loading', async () => {
    // Need enough of a delay to check accessibility s
    const sleep = (time: number) =>
      new Promise((resolve) => setTimeout(resolve, time));

    mock.onGet(universitiesAPI.url()).reply(async () => {
      await sleep(200);
      return [200, mockUniversities];
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <UniversitiesPage />
      </QueryClientProvider>,
    );

    expect(await screen.findByRole('status')).toBeInTheDocument();
    await checkAccessibility(container);

    // ensure all in process rendering finishes
    await waitFor(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument(),
    );
  });

  test('Component is accessible after loading', async () => {
    mock.onGet(universitiesAPI.url()).replyOnce(200, mockUniversities);
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <UniversitiesPage />
      </QueryClientProvider>,
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    await waitFor(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument(),
    );
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
    await checkAccessibility(container);
  });

  test('Error is shown if there is an error getting universities', async () => {
    mock.onGet(universitiesAPI.url()).networkErrorOnce();
    render(
      <QueryClientProvider client={queryClient}>
        <UniversitiesPage />
      </QueryClientProvider>,
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });

  test('Expected number of universities are shown and error is not shown', async () => {
    mock.onGet(universitiesAPI.url()).replyOnce(200, mockUniversities);

    render(
      <QueryClientProvider client={queryClient}>
        <UniversitiesPage />
      </QueryClientProvider>,
    );

    expect(await screen.findAllByRole('listitem'));
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();

    const uniListItems = screen.getAllByRole('listitem');
    expect(uniListItems).toHaveLength(mockUniversities.length - 1); //  There is one set of duplicates

    mockUniversities.forEach((university) => {
      expect(screen.getByText(university.name)).toBeInTheDocument();
    });
  });
});
