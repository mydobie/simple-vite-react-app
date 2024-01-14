import { ReactElement, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../AppRouteNames';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';

const ChooseType = ({ onChange }: { onChange: (val: string) => void }) => (
  <Form.Group controlId='animalType'>
    <Form.Label>Animal Type:</Form.Label>
    <Form.Select onChange={(val) => onChange(val.target.value)}>
      <option value=''>Select an animal</option>
      <option value='Dog'>Dog</option>
      <option value='Cat'>Cat</option>
      <option value='Bird'>Bird</option>
      <option value='Fish'>Fish</option>
      <option value='Rabbit'>Rabbit</option>
    </Form.Select>
  </Form.Group>
);

const ChooseName = ({ onChange }: { onChange: (val: string) => void }) => {
  const [name, setName] = useState('');
  return (
    <>
      <Form.Group controlId='animalName'>
        <Form.Label>Animal Name:</Form.Label>
        <Form.Control
          type='text'
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </Form.Group>
      <Button
        variant='success'
        onClick={() => {
          onChange(name);
        }}
      >
        Save name
      </Button>
    </>
  );
};

// *** Main component ***
const AnimalPage = (): ReactElement => {
  const animalName = useParams()[ROUTES.ANIMAL.params?.ANIMAL_NAME || ''];
  const animalType = useParams()[ROUTES.ANIMAL.params?.ANIMAL_TYPE || ''];

  const navigate = useNavigate();

  const onAnimalChange = (val: string) => {
    if (val) {
      navigate(`${val}`);
    }
  };

  const onNameChange = (val: string) => {
    if (val) {
      navigate(
        `${animalType}/${ROUTES.ANIMAL.params?.ANIMAL_NAME || ''}/${val}`,
      );
    }
  };

  return (
    <>
      <Row>
        <Col>
          <UserContext.Consumer>
            {({ user }) => <>Welcome {user}</>}
          </UserContext.Consumer>
        </Col>
      </Row>

      <Row>
        <Col>
          <h1>Animals</h1>
          {!animalType ? <ChooseType onChange={onAnimalChange} /> : null}
          <ul>
            {animalType ? (
              <li data-testid='displayAnimalType'>Type: {animalType}</li>
            ) : null}
            {animalType && animalName ? (
              <li data-testid='displayAnimalName'>Name: {animalName} </li>
            ) : null}
          </ul>
          {animalType && !animalName ? (
            <ChooseName onChange={onNameChange} />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default AnimalPage;
