import React from "react";
import {
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";

const App = () => {
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
          <Button color="secondary">Начать</Button>
        </InputGroupAddon>
      </InputGroup>
    </Container>
  );
};

export default App;
