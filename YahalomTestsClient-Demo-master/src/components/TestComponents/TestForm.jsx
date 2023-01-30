import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QuestionService from "../../services/questionService";
import TestService from "../../services/testService";
import { Button } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import 'bulma/css/bulma.css'
import SearchBar from "material-ui-search-bar";
import { Formik, ErrorMessage, Field } from "formik"
import validator from "../../validators/models/quiz"
import SaveSuccessfully from "../SaveSuccessfully";
import "../cssComponents/logInUser.css"

const TestForm = () => {

  let { id } = useParams();
  const [loadTest, setLoadTest] = useState(false);
  const [saveSucessfully, setSaveSucessfully] = useState(true);
  const [initialValues, setInitialValues] = useState();
  const [test, setTest] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [questionsList, setQuestionsList] = useState([]);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState("");

  useEffect(async () => {
    const loadQuestions = async () => {
      const listQuestions = await QuestionService.getAllQuestions();
      setData(listQuestions.data);
      setRows(listQuestions.data);
    }
    const loadTestById = async () => {

      let test = await TestService.getTestById(id);

      setInitialValues({
        lenguage: test.data[0].lenguage,
        name: test.data[0].name,
        questions: test.data[0].questions,
        header: test.data[0].header,
        noteToPass: test.data[0].noteToPass,
        showAnswer: test.data[0].showAnswer,
        topic: "development",
        type: test.data[0].type,
        textSucced: test.data[0].textSucced,
        textFailed: test.data[0].textFailed,
      })
      setTest(test.data[0]);
    }

    await loadQuestions();
    if (id != 0) { await loadTestById(); }
    else {

      setInitialValues({
        lenguage: "hebrew",
        name: "",
        questions: [],
        header: "",
        noteToPass: "",
        showAnswer: false,
        topic: "development",
        textSucced: "",
        textFailed: "",
      })
    }

  }, [])

  useEffect(() => {
    if (initialValues != undefined)
      setLoadTest(true)

  }, [initialValues])


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
      setQuestionsList([...questionsList, value.id])

    } else {
      questionsList.splice(currentIndex - 1, 1);
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return row.tags.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const Submit = (event) => {

    debugger
    if (id != 0) {
      event.id = id;
      event.questions = questionsList;
      TestService.editTest(event);
    }
    else {
      event.questions = questionsList;
      TestService.addTest(event)
    }

    setSaveSucessfully(!saveSucessfully)

  };




  if (saveSucessfully) {
    return (<>
      {loadTest && (
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validator}
            onSubmit={Submit}

          >
            {(props) => (
              <div>
                <div className="wrapper">
                  <b className="title">Add Test</b>

                  <form onSubmit={props.handleSubmit} className="container-fluid bag">
                    <div>
                      <label className="form-label">Field of Study :</label>
                      <b> Development</b>
                    </div>
                    <div>
                      <div className="mb-3">
                        <label className="form-label">Lenguage</label>
                        <select name="lenguage" className="form-select" onChange={props.handleChange} value={props.values.lenguage}>
                          <option value="hebrew choice">hebrew</option>
                          <option value="english choice">english</option>
                        </select>
                      </div>
                      <ErrorMessage name="lenguage">
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <div>
                      <label>TestType</label>
                      <div className="mb-3">
                        <label className="form-label">Question type:</label>
                        <select name="type" className="form-select" onChange={props.handleChange} value={props.values.type}>
                          <option value="defined">defined</option>
                          <option value="random">random</option>
                        </select>
                        <ErrorMessage name="type">
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                          </ErrorMessage>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Test Name</label>
                      <input value={props.values.name} className="form-control" onChange={props.handleChange} name="name" />
                      <ErrorMessage name="name">
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <div>
                      <label className="form-label">Pasing Grade</label>
                      <input name="noteToPass" value={props.values.noteToPass} className="form-control" onChange={props.handleChange} />
                      <ErrorMessage name="noteToPass">
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <br />
                    <div>
                      <label className="form-label">Show Correct Answer<br />After Submission</label>
                      <Field type="checkbox" checked={props.values.showAnswer} name="showAnswer" />
                      <ErrorMessage name="showAnswer">
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>
                    </div>
                    <br />

                    <div>
                      <div><label className="form-label">Header:</label></div>
                      <div><input name="header" value={props.values.header} onChange={props.handleChange} /></div>
                      <ErrorMessage name="header">
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
                    </div>
                    <br />
                    <div>
                      <div><label className="form-label">Message To Show On Success:</label></div>
                      <div><input name="textSucced" value={props.values.textSucced} onChange={props.handleChange} /></div>
                      <ErrorMessage name="textSucced">
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                      </ErrorMessage>

                    </div>
                    <br />
                    <div>
                      <div><label className="form-label">Message To Show On Failure :</label></div>
                      <div><input name="textFailed" value={props.values.textFailed} onChange={props.handleChange} />
                        <ErrorMessage name="textFailed">
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                          </ErrorMessage></div>
                    </div>
                    <br />
                    <div>
                      <div className="mb-3">
                        <label className="form-label">Certificate Templates</label>
                        <select className="form-select" >
                          <option value="certificate">certificate</option>
                          <option value="no certificate">no certificate</option>
                        </select>
                      </div>
                    </div>
                    <br />


                    <label className="form-label">Please Select Questions:</label>
                    <div className="container">
                      <div>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal) => requestSearch(searchVal)}
                          onCancelSearch={() => cancelSearch()}
                        />
                      </div>
                      <List>
                        {
                          rows.map((value) => (
                            <ListItem
                              key={value.id}
                              disablePadding
                            >
                              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                  />
                                </ListItemIcon>
                                <ListItemText id={value.id} primary={value.content} secondary={value.tags} />
                              </ListItemButton>
                              <ListItemIcon>
                                <Button component={Link} to={`/Questions/Show/${value.id}`}  >Show</Button>
                              </ListItemIcon>
                            </ListItem>
                          ))}
                      </List>

                      <div>
                        <button className="btn btn-success" type="submit">Add Test</button>
                        <Link className="btn btn-warning" to="/Questions/Table">Back</Link>
                      </div>
                    </div>
                  </form>
                </div>

              </div>

            )}


          </Formik>


        </div>)}

    </>);
  } else {
    return (
      <SaveSuccessfully></SaveSuccessfully>
    )
  }

}

export default TestForm;
