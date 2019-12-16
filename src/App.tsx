import React from "react";
import { Box, Button, Typography } from "@material-ui/core";

interface DecisionNode {
  question: string;
  yes: string;
  no: string;
}

const decisionTree: Record<string, DecisionNode> = {
  hasItSnowed: {
    question: "Has it snowed in the past week",
    yes: "doYouDriveAPistenBully",
    no: "willItSnow"
  },
  willItSnow: {
    question: "Will it snow in the next 24 hours",
    yes: "doYouDriveAPistenBully",
    no: "isItWindy"
  },
  isItWindy: {
    question: "Do wind gusts exceed 30 mph",
    yes: "areYouHungryEnough",
    no: "yes"
  },
  doYouDriveAPistenBully: {
    question: "Do you drive a Pisten Bully or Snowmobile",
    yes: "yes",
    no: "areYouHungryEnough"
  },
  areYouHungryEnough: {
    question: "Are you hungry enough",
    yes: "yes",
    no: "no"
  }
};

const Question: React.FC = () => {
  const [currentState, setCurrentState] = React.useState(
    decisionTree.hasItSnowed
  );
  const [answer, setAnswer] = React.useState<"yes" | "no" | null>(null);

  const handleYes = React.useCallback(() => {
    if (currentState.yes === "yes") {
      return setAnswer("yes");
    }
    if (currentState.yes === "no") {
      return setAnswer("no");
    }
    setCurrentState(decisionTree[currentState.yes]);
  }, [currentState]);
  const handleNo = React.useCallback(() => {
    if (currentState.no === "yes") {
      return setAnswer("yes");
    }
    if (currentState.no === "no") {
      return setAnswer("no");
    }
    setCurrentState(decisionTree[currentState.no]);
  }, [currentState]);

  if (answer) {
    return (
      <Typography>I-80 is {answer === "no" ? "CLOSED" : "OPEN"}</Typography>
    );
  }

  return (
    <Box>
      <Typography>{currentState.question}?</Typography>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        style={{ width: "50%", paddingTop: 20 }}
      >
        <Button variant="contained" onClick={handleYes}>
          YES
        </Button>
        <Button variant="contained" onClick={handleNo}>
          No
        </Button>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Box
      style={{
        width: 400,
        margin: "100px auto"
      }}
    >
      <Question />
    </Box>
  );
};
export default App;
