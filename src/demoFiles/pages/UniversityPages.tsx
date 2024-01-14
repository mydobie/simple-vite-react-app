import React, { ReactElement, useState, useEffect } from 'react';
import { Row, Col, Card, Image, Alert } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import axios, { AxiosRequestConfig } from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism-dark.css';

import { universitiesAPI } from '../utils/axios.config';
import { ajaxFinally } from '../../utils/axiosFinally';
import mortarboardImg from '../images/mortarboard.svg';
import Loading from '../../components/Loading';
import CopyButton from '../components/CopyButton';

// ** Main component type */
type UniversityType = {
  domains?: string[];
  name: string;
  country?: string;
  alpha_two_code?: string;
  'state-province'?: string | null;
  web_pages?: string[];
};

// EXAMPLE: Displaying result of ajax call to screen
const RawJSON = ({ json }: { json: object }): ReactElement => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const jsonString = JSON.stringify(json, null, 2);
  return (
    <Card>
      <Card.Header>Returned JSON</Card.Header>
      <div style={{ position: 'relative' }}>
        <CopyButton textToCopy={jsonString} />
        <pre>
          <code className={`language-javascript`}>
            {/* EXAMPLE: Format JSON response */}
            {jsonString}
          </code>
        </pre>
      </div>
    </Card>
  );
};

const axiosConfig: AxiosRequestConfig = {
  url: universitiesAPI.url(), // EXAMPLE: Use of Ajax url and method helper
  method: universitiesAPI.method(),
};

// *** Main component ***
const UniversityPage = (): ReactElement => {
  const [univList, setUnivList] = useState<string[]>([]);

  // EXAMPLE: Use of React-query
  const { isLoading, error, data } = useQuery({
    queryKey: ['universities'],
    queryFn: () =>
      axios(axiosConfig).then(async (response) => {
        await ajaxFinally();
        return response.data;
      }),
    staleTime: 60 * 1000,
  });

  React.useEffect(() => {
    if (data && Array.isArray(data)) {
      const universitiesAll = data.map(
        (university: UniversityType) => university.name,
      );
      const universitiesUnique: string[] = Array.from(
        new Set(universitiesAll),
      ).sort();
      setUnivList(universitiesUnique);
    }
  }, [data]);

  return (
    <>
      <Row>
        <h1>Minnesota Universities</h1>
      </Row>
      <Row>
        <Col xs={2}>
          {/* EXAMPLE: Include an image */}
          <Image src={mortarboardImg} alt='' fluid />
        </Col>
        <Col>
          {/* EXAMPLE: Using conditional display logic (aka show if) */}
          {isLoading ? <Loading /> : null}
          {!isLoading && error ? (
            <Alert variant='danger'>{(error as Error).message}</Alert>
          ) : null}

          {!isLoading ? (
            <ul>
              {/* EXAMPLE: Using map to display items from an array */}
              {univList.map((university) => (
                <li key={university} data-testid='uniListItem'>
                  {university}
                </li>
              ))}
            </ul>
          ) : null}
        </Col>
      </Row>
      <Row>
        {' '}
        <Col>{data ? <RawJSON json={data} /> : null}</Col>{' '}
      </Row>
    </>
  );
};

export default UniversityPage;
