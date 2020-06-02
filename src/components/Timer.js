import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import secondsToTime from "../utils/secondsToTime";

const Timer = (props) => {
  let timeout;

  React.useEffect(() => {
    if (props.timer > 0) {
      timeout = setTimeout(() => props.setTimer(props.timer - 1), 1000);
    } else {
      console.log("finished");
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [props.timer]);

  return (
    <Modal isOpen={props.timerIsOpen} className="text-center">
      <ModalHeader className="w-100 d-block">{secondsToTime(props.timer)}</ModalHeader>
      <ModalBody>
        <div>
          Начинайте задавать вопросы. Успейте вычислить Иуду прежде, чем истечет время, иначе он
          победит.
        </div>
        <Button color="primary" className="m-2" onClick={() => props.clearState()}>
          Закончить игру
        </Button>
      </ModalBody>
    </Modal>
  );
};

Timer.propTypes = {
  timerIsOpen: PropTypes.bool,
  clearState: PropTypes.func,
  setTimer: PropTypes.func,
  timer: PropTypes.number,
};

export default Timer;
