import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import QuestionToShowExam from './QuestionToShowExam';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import QuestionOverviewService from '../../services/questionOverview';
import ExamService from '../../services/examService';
import EndOfExam from './EndOfExam';
import { SetValueOfQuestion, CorrectAnswers } from "../../examLogic/RevisionTest"




const ExamContent = (props) => {


  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [countAnswers, SetCountAnswers] = useState(0);
  const [gradeRef, setGradeRef] = useState(0);
  const [examFinalized, setExamFinalized] = useState(false);
  const [newarray, setNewarray] = useState([])
  const maxSteps = props.questions.length;
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;


  const handleNext = () => {

    if (newarray != []) {
      QuestionOverviewService.editQuestionOverview({ id: props.overviewId, examId: props.examId, userAnswers: newarray, questionId: props.questions[activeStep].id });
      SetCountAnswers(countAnswers + 1);
      setNewarray([]);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {

    if (newarray != []) {
      QuestionOverviewService.editQuestionOverview({ id: props.overviewId, examId: props.examId, userAnswers: newarray, questionId: props.questions[activeStep].id });
      SetCountAnswers(countAnswers + 1);
      setNewarray([]);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const AnswerMultipleItems = (arrayItems) => {
    let found = false;

    for (let i = 0; i < newarray.length; i++) {
      if (newarray[i].id == arrayItems.id) {
        newarray.splice(i, 1);
        found = true;
        break;
      }
    }
    if (found == false) { newarray.push(arrayItems) }



  }
  const AnswerSingleItem = (Item) => {

    let found = false;
    for (let i = 0; i < newarray.length; i++) {
      if (newarray[i].id == Item.id) {
        newarray.splice(i, 1);
        found = true;
        break;
      }
    }
    if (found == false) { newarray.push(Item) }

  }
  const AnswerList = async () => {
    if (newarray != []) {
      await QuestionOverviewService.editQuestionOverview({ id: props.overviewId, examId: props.examId, userAnswers: newarray, questionId: props.questions[activeStep].id })
      SetCountAnswers(countAnswers + 1);
    }
    let list = await QuestionOverviewService.GetAllAnswersUserByExamId(props.examId);
    return list.data;
  }

  const SubmiExamForm = async () => {

    let questionValue = SetValueOfQuestion(props.questions.length);
    let answersUser = await AnswerList();
    let correctAnswers = CorrectAnswers(answersUser);
    let gradenew = correctAnswers * questionValue;
    setGradeRef(correctAnswers * questionValue);

    ExamService.addExam({
      user: props.userId, id: props.examId, grade: gradeRef, questionOverviewId: props.overviewId,
      numOfQuestionsAnswered: countAnswers == 0 ? 1 : correctAnswers, testId: props.testId, status: props.noteToPass < gradenew ? "passed" : "disaproved", grade: gradenew
    })

    setExamFinalized(true);
  }

  const SubmitClicked = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  }

  const ButtonSubmit = () => {

    if (activeStep == maxSteps - 1) {
      return (
        <div className='wrraper'>
          <label>Click To End Exam</label>
          <br />
          <button onClick={SubmitClicked}>Submit</button>
          <Popper  className='wrraper' id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                  <div>
                    <div>Are you Sure to Submit de exam</div>
                    <div>
                      <button onClick={SubmiExamForm}>yes</button>
                      <button onClick={SubmitClicked}>no</button>
                    </div>
                  </div>
                </Box>
              </Fade>
            )}
          </Popper>
        </div>
      )
    }
    return (<></>);
  }

  if (!examFinalized) {
    return (
      <Box sx={{ maxWidth: 1200, flexGrow: 1 }}>
        <Box>
          <QuestionToShowExam
            question={props.questions[activeStep]}
            onAnswerMultipleItems={AnswerMultipleItems}
            onAnswerSingleItem={AnswerSingleItem} />
        
        </Box>
        <Box sx={{ width: '100%' }}>
          <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
          <Stepper
            position="static"
            activeStep={activeStep}>
            {props.questions.map(item =>
            (
              <Step key={item.id}>
                <StepLabel ></StepLabel>
              </Step>
            ))
            }
          </Stepper>
          <ButtonSubmit array={newarray}></ButtonSubmit>
          <Button onClick={handleNext} disabled={activeStep === maxSteps - 1}>Next</Button>
        </Box>
      </Box>
    );
  }
  else {
    return (
      <EndOfExam noteToPass={props.noteToPass} grade={gradeRef} ></EndOfExam>
    );
  }


}



export default ExamContent;