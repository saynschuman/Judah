import React from "react";
import {
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import locations from "../data/locations";
import randomInt from "../utils/randomInt";

const App = () => {
  const [locationIndex, setLocationIndex] = React.useState(0);
  const [locationIsVisible, setLocationVisibility] = React.useState(false);
  const [players, setPlayers] = React.useState(10);
  return (
    <Container className="pt-3">
      <h4 className="text-center mb-4">Выберите количество игроков</h4>
      <InputGroup>
        <Input
          type="number"
          value={players}
          onChange={(e) => setPlayers(Number(e.target.value))}
        />
        <InputGroupAddon addonType="append">
          <Button
            color="secondary"
            onClick={() => {
              setLocationIndex(randomInt(0, locations.length));
              setLocationVisibility(true);
            }}
          >
            Начать
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <Modal isOpen={locationIsVisible} className="text-center">
        {!locationIsVisible ? (
          <>
            <ModalHeader className="w-100 d-block">
              Передай телефон первому игроку
            </ModalHeader>
            <ModalBody>Нажми ок когда будешь готов</ModalBody>
            <Button
              color="primary"
              className="m-2"
              onClick={() => setLocationVisibility(true)}
            >
              Ok
            </Button>
          </>
        ) : (
          <>
            <ModalHeader className="w-100 d-block">
              {locations[locationIndex]}
            </ModalHeader>
            <ModalBody className="text-justify">
              Ты местный. <br /> Все игроки кроме Иуды знают эту локацию.
              Задавай вопросы игрокам, чтобы вычислить кто из них Иуда.
            </ModalBody>
            <Button
              color="primary"
              className="m-2"
              onClick={() => setLocationVisibility(false)}
            >
              Ok
            </Button>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default App;
