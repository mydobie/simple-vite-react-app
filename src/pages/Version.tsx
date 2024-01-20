// Page that shows the application name and version from package.json file
// Along with the git commit.

import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import constants from '../constants';

const Version = (): ReactElement => (
  <>
    <Row>
      <Col>
        <h1>Version</h1>
        <ul>
          <li>
            <strong>Application Name: </strong>
            <span data-cy='app-name'>{constants.APP_NAME}</span>
          </li>
          <li>
            <strong>Version: </strong>
            <span data-cy='app-version'>{constants.APP_VERSION}</span>
          </li>
          <li>
            <strong>Git Commit: </strong>
            <span>{constants.GIT_SHA}</span>
          </li>
        </ul>
        <h2>Dependencies</h2>
        {/* Be careful sharing what dependencies that are are in use.  
          You don't want to notify users of dependencies that have 
          known security vulnerabilities */}
        <ul>
          <li>
            <strong>React: </strong>
            {React.version}
          </li>
        </ul>
      </Col>
    </Row>
  </>
);

export default Version;
