import React from "react";
import {
  Container,
  InputGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "./App.scss";
import locations from "../data/locations";
import randomInt from "../utils/randomInt";
import Select from "react-select";
import values from "./values";

const options = values.map((value) => ({ value, label: value }));

const App = () => {
  const [locationIndex, setLocationIndex] = React.useState(0);
  const [locationIsVisible, setLocationVisibility] = React.useState(false);
  const [players, setPlayers] = React.useState(options[9]);
  const [currentPlayer, setCurrentPlayer] = React.useState(0);
  const [hintIsVisible, setHintVisibility] = React.useState(false);
  const [timerIsOpen, setTimerIsOpen] = React.useState(false);
  const [judahIndex, setJudahIndex] = React.useState(0);

  const clearState = () => {
    setLocationIndex(0);
    setLocationVisibility(false);
    setCurrentPlayer(0);
    setHintVisibility(false);
    setTimerIsOpen(false);
    setJudahIndex(0);
  };

  const nextPlayer = () => {
    if (players.value === currentPlayer) {
      setHintVisibility(false);
      setLocationVisibility(false);
      setTimerIsOpen(true);
      setCurrentPlayer(0);
    } else {
      setHintVisibility(true);
      setLocationVisibility(false);
    }
  };
  return (
    <Container className="pt-3">
      <h4 className="text-center mb-4">Выберите количество игроков</h4>
      <InputGroup className="d-flex justify-content-between">
        <Select
          className="select"
          options={options}
          value={players}
          onChange={(e) => setPlayers(e)}
        />
        <Button
          className="button"
          color="secondary"
          onClick={() => {
            setHintVisibility(true);
            setJudahIndex(randomInt(1, players.value));
          }}
        >
          Начать
        </Button>
      </InputGroup>
      <Modal isOpen={locationIsVisible} className="text-center">
        {currentPlayer === judahIndex ? (
          <>
            <ModalHeader className="w-100 d-block">Иуда</ModalHeader>
            <ModalBody className="text-justify">
              Ты Иуда. <br /> Постарайся узнать локацию, о которой говорят местные.
            </ModalBody>
            <Button
              color="primary"
              className="m-2"
              onClick={() => {
                nextPlayer();
              }}
            >
              Ok
            </Button>
          </>
        ) : (
          <>
            <ModalHeader className="w-100 d-block">{locations[locationIndex]}</ModalHeader>
            <ModalBody className="text-justify">
              Ты местный. <br /> Все игроки кроме Иуды знают эту локацию. Задавай вопросы игрокам,
              чтобы вычислить кто из них Иуда.
            </ModalBody>
            <Button
              color="primary"
              className="m-2"
              onClick={() => {
                nextPlayer();
              }}
            >
              Ok
            </Button>
          </>
        )}
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
          onClick={() => {
            !currentPlayer && setLocationIndex(randomInt(0, locations.length));
            setCurrentPlayer(currentPlayer + 1);
            setHintVisibility(false);
            setLocationVisibility(true);
          }}
        >
          Ok
        </Button>
      </Modal>
      <Modal isOpen={timerIsOpen} className="text-center">
        <ModalHeader className="w-100 d-block">Время пошло!</ModalHeader>
        <ModalBody>
          <Button color="primary" className="m-2" onClick={() => clearState()}>
            Закончить игру
          </Button>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default App;
