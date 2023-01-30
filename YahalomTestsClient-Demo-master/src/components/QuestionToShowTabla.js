import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";


function QuestionShowTabla({
  questionKind,
  answers,
  content,
  complementContent
}) {

  debugger
  const SingleChoice = questionKind ==="single Choice";

  const multipleChoiceCheckBox = () => (

    
    <FormGroup >
      {answers.map((answer, index) => (
        <React.Fragment key={answer.id || index}>
          <FormControlLabel
            className="justify-content-between"
            control={
              <Checkbox
                checked={answer.correct}
              />
            }
            label={answer.content}
          />
        </React.Fragment>
      ))}
    </FormGroup>
  );

  const singleChoiceRadioBox = () => (
    <RadioGroup
      aria-label="answers"
      name="radio-buttons-group"
    >
      {answers.map((answer, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            value={index}
            control={
              <Radio
                checked={answer.correct}
              />
            }
            label={answer.content}
          />
        </React.Fragment>
      ))}
    </RadioGroup>
  );

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        {content}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {complementContent}
      </Typography>
      {answers && (
        <div className="row text-center">
          {SingleChoice ? singleChoiceRadioBox() : multipleChoiceCheckBox()}
        </div>
      )}
    </div>
  );
}

export default QuestionShowTabla;
