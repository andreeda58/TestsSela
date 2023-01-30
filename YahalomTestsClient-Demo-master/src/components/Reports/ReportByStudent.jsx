import { useState, useEffect } from "react";
import UserService from "../../services/userService";
import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import ExamService from "../../services/examService";
import TestService from "../../services/testService";
import { Link, useParams } from "react-router-dom";
import ReportByStudent2 from "./ReportsByStudent2";
import QuestionOverviewService from "../../services/questionOverview";
import QuestionService from "../../services/questionService";

const columnsUsers = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "lastName", headerName: "LastName", width: 400, },
    { field: "email", headerName: "Email", width: 130 },
]

const columnsExam = [
    { field: "testId", headerName: "Test Id", width: 140 },
    { field: "testName", headerName: "Test Name", width: 400 },
    { field: "grade", headerName: "Grade", width: 120, },
    { field: "lastActivity", headerName: "Last Activity", width: 200 },
]




const ReportByStudent = () => {

    const [data, setData] = useState([]);
    const [rows, setRows] = useState(data);
    const [searched, setSearched] = useState("");


    const [page2, setPage2] = useState(false);
    const [page2Data, setPage2Data] = useState();
    const [page2Tabla, setPage2Tabla] = useState();
    const [userAnswers, setUserAnswers] = useState();
    const [questionsDb, setQuestionsDb] = useState();
    const [tests, setTests] = useState([]);
    const [tablaObject, setTablaObject] = useState([]);
    const [examsUser, setExamsUser] = useState();
    const [loadingExamsUser, setLoadingExamsUser] = useState(false);



    const BackButtonPressed = (event) => setPage2(event);


    useEffect(async () => {
        const loadUsers = async () => {
            const listUsers = await UserService.getAllUsers();
            setData(listUsers.data);
            setRows(listUsers.data);
        }
        await loadUsers();
    }, [])

    useEffect(() => {
        if (examsUser != undefined) { setLoadingExamsUser(true) }
    }, [examsUser])

    const CreationOfTableObject = async (examsUser, userName) => {


        let prueba = []

        for (let index = 0; index < examsUser.length; index++) {
            const element = examsUser[index];

            debugger
            let testsData = await TestService.getTestById(element.testId)
            debugger

            let tablaObjectNew = {
                //testData
                testId: element.testId,
                numOfQuestions: testsData.data[0].questions.length,
                passingGrade: testsData.data[0].noteToPass,
                testName: testsData.data[0].name,
                userName: userName,

                id: element.id,
                grade: element.grade,
                lastActivity: element.date,
                correctAnswers: element.correctAnswers,
                status: element.status,
                questionOverviewId: element.questionOverviewId,

            }
            prueba.push(tablaObjectNew)
        }
        setTablaObject(prueba);


    }


    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    const RowClickUser = async (event) => {


        if (tablaObject.length != 0) {
            debugger

            setTablaObject([]);
            setLoadingExamsUser(true);
        }
        debugger
        let examsUser = await ExamService.getExamsByUserId(event.row.id)
        setExamsUser(examsUser.data);
        debugger

        await CreationOfTableObject(examsUser.data, event.row.name);


    }
    const RowClickExam = async (event) => {


        let questionOverview = await QuestionOverviewService.GetAllAnswersUserByExamId(event.row.id)


        let page2Object = [];
        let questionData = [];
        for (let index = 0; index < questionOverview.data.length; index++) {
            const element = questionOverview.data[index];

            let questions = await QuestionService.getQuestionById(element.questionId)
            let newTablaObject = {
                id: questions.data[0].id,
                question: questions.data[0].content,
                questionkind: questions.data[0].questionKind,
                correctly: element.userAnswers[0].correct == true ? "correct" : "incorrect",
                date: event.row.lastActivity,
                questionAnswers: questions.data[0].answer,
            }

            page2Object.push(newTablaObject);
            questionData.push(questions.data[0]);
        }

        setQuestionsDb(questionData);
        setUserAnswers(questionOverview.data);
        setPage2Tabla(page2Object)
        setPage2Data(event.row);
        setPage2(true);
    }


    if (!page2) {
        return (
            <div>

                <div className="wrapper ">
                    <b className="title">Report By Respondent Name</b>
                    <div className="mycontainer2 ">
                        <br />
                        <br />
                        <div>
                            <h3>Find a Respondent</h3>

                            <br />
                            <div>
                                To find a respondent, start typing a name below.Then select a respondent from the list that will apear.<br />
                                Tip:To show all respondents, press the spacebar
                            </div>
                        </div>
                        <br />
                        <div className="mb-3 row">
                            <label className="col-sm-4 col-form-label">Respondents Name:</label>
                            <div className="col-sm-7">
                                <SearchBar
                                    value={searched}
                                    onChange={(searchVal) => requestSearch(searchVal)}
                                    onCancelSearch={() => cancelSearch()}
                                />
                            </div>
                        </div>
                        <div style={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rowHeight={80}
                                rows={rows}
                                columns={columnsUsers}
                                pageSize={10}
                                onRowClick={RowClickUser}
                            />
                        </div>

                        <br />
                        <br />

                        <b className="title">Activity Report For : </b>
                        <br />
                        <div>Click a test to show its results</div>
                        <br />

                        {loadingExamsUser && (
                            <div style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    rowHeight={80}
                                    rows={tablaObject}
                                    columns={columnsExam}
                                    pageSize={10}
                                    onRowClick={RowClickExam}
                                />
                            </div>
                        )}
                        <Link className="btn btn-warning" to="/Reports">Back</Link>
                    </div>
                </div>


            </div>
        );
    }
    else {
        debugger
        return (<ReportByStudent2 BackButtonPressed={BackButtonPressed} data={page2Data} userAnswer={userAnswers} tabla={page2Tabla}></ReportByStudent2>)
    }
}

export default ReportByStudent;