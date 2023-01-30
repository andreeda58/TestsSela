import React, { useState, useEffect } from "react";
import QuestionService from "../../services/questionService";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Link, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import AppFormAnswerListBuilder from "../AppFormAnswerListBuilder";
import { Formik, ErrorMessage } from "formik"
import validator from "../../validators/models/question"
import SaveSuccessfully from "../SaveSuccessfully";
import "../cssComponents/logInUser.css"



export const QuestionsForm = () => {
  const [loadQuestion, setLoadQuestion] = useState(false);
  const [saveSucessfully, setSaveSucessfully] = useState(true);
  const [initialValues, setInitialValues] = useState();

  let { id } = useParams();

  useEffect(async () => {
    let loadQuestion = async () => {

      let question = await QuestionService.getQuestionById(id);

      setInitialValues({
        topic: "development",
        questionKind: question.data[0].questionKind,
        content: question.data[0].content,
        complementContent: question.data[0].complementContent,
        answer: question.data[0].answer,
        display: question.data[0].display,
        lastUpdated: undefined,
        tags: question.data[0].tags,
      })
    }


    if (id != 0) {
      await loadQuestion();
    }
    else {
      setInitialValues({
        topic: "development",
        questionKind: "single Choice",
        content: "",
        complementContent: "",
        answer: [],
        display: "",
        lastUpdated: undefined,
        tags: "",
      })
    }
  }, [])

  const submit = (event) => {

    if (id != 0) {
      event.id=id;
      event.lastChange=new Date(Date.now()).toLocaleDateString();
      QuestionService.editQuestion(event);
    }
    else {
      QuestionService.addQuestion(event)
    }
    setSaveSucessfully(!saveSucessfully)
  }

  useEffect(async () => {
    debugger
    if (initialValues != undefined) {
      setLoadQuestion(true)
    }

  }, [initialValues])


  if (saveSucessfully) {
    return (
      <>
        {loadQuestion && (
          <div >
            <Formik
              initialValues={initialValues}
              validationSchema={validator}
              onSubmit={submit}
            >
              {(props) => (
                <div>
                  <div className="wrapper">
                    <b className="title">Add Question</b>
                    <form onSubmit={props.handleSubmit} className="container-fluid bag" >


                    <div className="mb-3 row">
                      <label className="form-label">Field:</label>
                      <b>Development</b>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-md-2 col-form-label">Question type:</label>

                      <div className="col-sm-10">
                        <select name="questionKind" className="form-select" onChange={props.handleChange} value={props.values.questionKind}>
                          <option value="single Choice">single choice</option>
                          <option value="multiple Choice">multiple choice</option>
                        </select>
                        <ErrorMessage className="error" name="questionKind">
                          {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <label className="col-sm-2 col-form-label">Question Test</label>
                      <div className="col-sm-10">
                        <input name="content" className="form-control" onChange={props.handleChange} value={props.values.content} />
                        <ErrorMessage className="error" name="content">
                          {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-2 col-form-label" >Test Below question</label>
                      <div className="col-sm-10">
                        <div>
                          <input name="complementContent" className="form-control" onChange={props.handleChange} value={props.values.complementContent} />
                          <ErrorMessage className="error" name="complementContent">
                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>

                    <br />
                    <Divider />
                    <br />
                    <div className="container">

                      <label>Posible Answers:</label>
                      <br />
                      <div className="container">
                        <AppFormAnswerListBuilder
                          title="Answers"
                          name="answer"
                          placeHolder="New answer"
                        />
                      </div>
                      <br />
                      <Divider />
                      <br />
                      <div>
                        <div className="container ">
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Direction</FormLabel>
                            <RadioGroup name="display" row value={props.values.display} onChange={props.handleChange}>
                              <FormControlLabel value="horizontal" control={<Radio />} label="horizontal" />
                              <FormControlLabel value="vertical" control={<Radio />} label="vertical" />
                            </RadioGroup>
                            <ErrorMessage className="alert alert-danger" name="display">
                              {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                          </FormControl>
                        </div>
                      </div>


                      <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label" >Tags:</label>
                        <div className="col-sm-10">
                          <input name="tags" className="form-control" placeholder="c# ,modifiers,advance" onChange={props.handleChange} value={props.values.tags}></input>
                          <ErrorMessage className="" name="tags">
                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                          </ErrorMessage>
                        </div>
                      </div>

                      <div>
                        <button className="btn btn-success" type="submit">Save</button>
                        <Link className="btn btn-warning" to="/Questions/Table">Back</Link>
                      </div>
                    </div>
                  </form>
                  </div>

                  
                </div>

              )}
            </Formik>
          </div>
        )}
      </>
    )

  }
  else {
    return (
      <SaveSuccessfully></SaveSuccessfully>
    )
  }





};

export default QuestionsForm;
