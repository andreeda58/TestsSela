import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionService from "../../services/questionService";
import parse from 'html-react-parser';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const QuestionToShow = (props) => {


  let { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);


  let loadQuestion = async () => {

    let question = await QuestionService.getQuestionById(id || props.id);
    setAnswers(question.data[0].answer);
    setQuestion(question.data[0]);
  }

  useEffect(async () => {
    await loadQuestion();
  }, [])

  return (
    <div className="wrapper">
      <div>
        <Typography gutterBottom variant="h4" component="div">
          Question:
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {question.content}
        </Typography>

        <FormLabel component="legend">Select the correct answer</FormLabel>
        <div>
          {question.questionKind == "multiple Choice" ?
            (<MultipleChoice answers={answers}></MultipleChoice>) : (<SingleChoice answers={answers}></SingleChoice>)}

        </div>
      </div>
    </div>

  )




}

const MultipleChoice = (props) => {

  return (
    <div>
      <FormGroup >
        {props.answers.map((answer, index) => (
          <React.Fragment key={answer.id || index}>
            <FormControlLabel
              className=".justify-content-around"
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
    </div>
  );

}

const SingleChoice = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {

    setValue(event.target.value);

  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
      >

        {props.answers.map(item => (
          <FormControlLabel value={item.content} control={<Radio checked={item.correct} />} label={parse(item.content)} />
        ))}
      </RadioGroup>
    </FormControl>
  );

}



export default QuestionToShow;