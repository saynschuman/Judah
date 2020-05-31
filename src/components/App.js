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
  const [players, setPlayers] = React.useState(2);
  const [currentPlayer, setCurrentPlayer] = React.useState(0);
  const [hintIsVisible, setHintVisibility] = React.useState(false);
  const [timerIsOpen, setTimerIsOpen] = React.useState(false);
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
              setHintVisibility(true);
            }}
          >
            Начать
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <Modal isOpen={locationIsVisible} className="text-center">
        <ModalHeader className="w-100 d-block">
          {locations[locationIndex]}
        </ModalHeader>
        <ModalBody className="text-justify">
          Ты местный. <br /> Все игроки кроме Иуды знают эту локацию. Задавай
          вопросы игрокам, чтобы вычислить кто из них Иуда.
        </ModalBody>
        <Button
          color="primary"
          className="m-2"
          onClick={() => {
            setHintVisibility(true);
            setLocationVisibility(false);
          }}
        >
          Ok
        </Button>
      </Modal>
      <Modal isOpen={hintIsVisible} className="text-center">
        <ModalHeader className="w-100 d-block">
          Передай телефон {currentPlayer === 0 ? "первому" : "следующему"}
          <span className="pl-1">игроку</span>
        </ModalHeader>
        <ModalBody>Нажми ок когда будешь готов</ModalBody>
        <Button
          color="primary"
          className="m-2"
          // onClick={() => setLocationVisibility(true)}
          onClick={() => {
            !currentPlayer && setLocationIndex(randomInt(0, locations.length));
            if (players === currentPlayer) {
              setTimerIsOpen(true);
              setHintVisibility(false);
              setCurrentPlayer(0);
            } else {
              setCurrentPlayer(currentPlayer + 1);
              setHintVisibility(false);
              setLocationVisibility(true);
            }
          }}
        >
          Ok
        </Button>
      </Modal>
      <Modal isOpen={timerIsOpen} className="text-center">
        <ModalBody>Время пошло!</ModalBody>
      </Modal>
    </Container>
  );
};

export default App;
