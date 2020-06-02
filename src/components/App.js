import React from "react";
import { Container, InputGroup, Button, Modal, ModalHeader, ModalBody, CardImg } from "reactstrap";
import "./App.scss";
import locations from "../data/locations";
import randomInt from "../utils/randomInt";
import Select from "react-select";
import values from "./values";
import phone from "./img/phone.png";
import location from "./img/location2.png";
import judah from "./img/judah.svg";
import Timer from "./Timer";

const options = values.map((value) => ({ value, label: value }));
const minutes = values.map((value) => ({ value, label: `${value} мин.` }));

const App = () => {
  const [locationIndex, setLocationIndex] = React.useState(0);
  const [locationIsVisible, setLocationVisibility] = React.useState(false);
  const [players, setPlayers] = React.useState(options[2]);
  const [currentPlayer, setCurrentPlayer] = React.useState(0);
  const [hintIsVisible, setHintVisibility] = React.useState(false);
  const [timerIsOpen, setTimerIsOpen] = React.useState(false);
  const [judahIndex, setJudahIndex] = React.useState(0);
  const [initialTimer, setInitialTimer] = React.useState(minutes[0]);
  const [timer, setTimer] = React.useState(60);

  const clearState = () => {
    setLocationIndex(0);
    setLocationVisibility(false);
    setCurrentPlayer(0);
    setHintVisibility(false);
    setTimerIsOpen(false);
    setJudahIndex(0);
    setTimer(initialTimer.value);
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

  const handleSetTimer = (data) => {
    const min = data.value;
    setInitialTimer({ value: min * 60, label: `${min} мин.` });
    setTimer(min * 60);
  };

  return (
    <Container className="pt-3">
      <InputGroup className="d-flex justify-content-between">
        <h5 className="text-center">Выберите количество игроков</h5>
        <Select className="w-100" options={options} value={players} onChange={setPlayers} />
      </InputGroup>
      <InputGroup>
        <h5 className="text-center mt-1">Установите время</h5>
        <Select
          className="w-100 mb-2"
          options={minutes}
          value={initialTimer}
          onChange={handleSetTimer}
        />
      </InputGroup>
      <Button
        color="primary"
        className="w-100"
        onClick={() => {
          setHintVisibility(true);
          setJudahIndex(randomInt(1, players.value));
        }}
      >
        Начать
      </Button>
      <Modal isOpen={locationIsVisible} className="text-center">
        {currentPlayer === judahIndex ? (
          <>
            <ModalHeader className="w-100 d-block">
              <CardImg src={judah} className="judah" />
              <div>Иуда</div>
            </ModalHeader>
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
            <ModalHeader className="w-100 d-block">
              <CardImg src={location} className="location" />
              <div>{locations[locationIndex]}</div>
            </ModalHeader>
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
          <CardImg src={phone} className="phone" />
          <div>
            Передай телефон {currentPlayer === 0 ? "первому" : "следующему"}
            <span className="pl-1">игроку</span>
          </div>
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
      {timerIsOpen && (
        <Timer
          timerIsOpen={timerIsOpen}
          clearState={clearState}
          timer={timer}
          setTimer={setTimer}
        />
      )}
    </Container>
  );
};

export default App;
