import { useState, useEffect } from "react";
import Divider from '@mui/material/Divider';
import { Link, useParams } from "react-router-dom";
import TestService from '../../services/testService'
import ExamService from '../../services/examService'
import QuestionOverviewService from "../../services/questionOverview";

import AppTable from "../AppTable";
import QuestionService from "../../services/questionService";



const ReportByExam = () => {


    const toStringDate = (day) => {


        let d = new Date(day)
        let newday = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();


        return `${month}/${newday}/${year}`

    }
    let { startDate, endDate, examId } = useParams();
    let listCorrect = [];

    const [test, setTest] = useState();
    const [examData, setExamData] = useState();
    const [numberOfSubmissions, setNumberofSubmissions] = useState([]);
    const [tablaData, setTablaData] = useState([]);
    const [questionsDb, setQuestionsDb] = useState([]);
    const [numPassed, setNumPassed] = useState(0);
    const [passingPorcentage, setPassingPorcentage] = useState(0);
    const [loadingTest, setLoadingTest] = useState(false);
    const [loadingExam, setLoadingExam] = useState(false);
    const [loadingOverview, setLoadingOverview] = useState(false);


    const loadExamsByDate = async () => {
        let start = toStringDate(startDate)
        let end = toStringDate(endDate)
        let examsByDate = await ExamService.getTestsByDate(start, end);
        setExamData(examsByDate.data);
    }

    const loadTest = async () => {
        let test = await TestService.getTestById(examId);
        setTest(test.data[0]);
    }

    useEffect(async () => {
        await loadTest();
        await loadExamsByDate();

    }, [])

    const stam = async () => {

        let dbDataQuestion = [];
        // questions list
        await test.questions.forEach(async element => {
            let dataQuestion = await QuestionService.getQuestionById(element)
            dbDataQuestion.push(dataQuestion.data[0].content)
        });
        setQuestionsDb(dbDataQuestion);//
    }

    let loadArraySubmissions = async () => {


        await stam();

        let submissions = [];
        //numbers of submissionsbyquestion 
        await test.questions.forEach(async element => {

            let arraySubmissions = [];
            arraySubmissions = await QuestionOverviewService.GetQuestionOverviewsByQuestionId(parseInt(element));
            submissions.push(arraySubmissions.data)
            if (test.questions[test.questions.length - 1] == arraySubmissions.data[0].questionId) { setNumberofSubmissions(submissions) }
        });


    }

    useEffect(async () => {

        if (test != undefined && loadingTest == false) {
            await loadArraySubmissions();
            setLoadingTest(true);

        }
    }, [test])

    useEffect(() => {

        if (examData != undefined && loadingExam == false) {

            if (examData.length != 0) {
                let numPassed = examData.filter((e) => e.status == "passed").length
                setNumPassed(numPassed);
                let passingPorcentage = (numPassed * 100) / examData.length
                setPassingPorcentage(passingPorcentage);
                setLoadingExam(true);

            }
        }
    }, [examData])

    useEffect(async () => {

        if (numberOfSubmissions != 0) {

            let count = 0;
            numberOfSubmissions.forEach(element => {

                //se encuentran las correctas
                element.forEach(answerElement => {
                    if (answerElement.userAnswers[0].correct) count = count + 1;
                });
                listCorrect.push(count);

                count = 0;
            });

            let tabla = [];
            for (let index = 0; index < listCorrect.length; index++) {

                console.log(questionsDb);
                let tablaObject = {
                    question: questionsDb[index],
                    numberOfSubmissions: numberOfSubmissions[index].length,
                    numOfCorrects: listCorrect[index]
                }
                console.log(tablaObject);
                tabla.push(tablaObject);

                if (listCorrect.length - 1) {
                    setTablaData(tabla)
                }

            }


        }

    }, [numberOfSubmissions])

    useEffect(() => {
        debugger
        if (tablaData.length != 0) {
            if (tablaData.length == questionsDb.length)
                setLoadingOverview(true)
        }
    }, [tablaData])

    return (
        <div>

            <div className="wrapper">
                <b className="title">TestReport:</b>
                {loadingTest &&
                    (<div >

                        <br />
                        <Divider />
                        <br />

                        <div>
                            <label>Test Name:</label>
                            <span > {test.name}</span>
                        </div>
                        {test.id &&
                            <div>
                                <label>Test Id:</label>
                                <span > {test.id}</span>
                            </div>}
                        <div>
                            <label>Test Type:</label>
                            <span > Predefined</span>
                        </div>
                        {test.questions && <div>
                            <label>Number of Questions:</label>
                            <span > {test.questions.length}</span>
                        </div>}
                        <div>
                            <label>Pasing Grade:</label>
                            <span > {test.noteToPass}</span>
                        </div>

                    </div>)}

                {loadingExam && (
                    <div className="mycontainer2">

                        <div>
                            <label>Number of submisions:</label>
                            <span> {examData.length}</span>
                        </div>
                        <div>
                            <label>Number of  passed:</label>
                            <span> {numPassed}</span>
                        </div>
                        <div>
                            <label>Passing porcentage:</label>
                            <span> {passingPorcentage}%</span>
                        </div>

                        <br />
                        <Divider />
                        <br />


                        <b className="title " >
                            Respondent Grades and Answers (Table)
                        </b>



                        <AppTable
                            headerCells={["id", "date", "user", "numOfQuestionsAnswered", "grade"]}
                            collection={examData}
                            bodyCells={["id", "date",
                                (cell) => `${cell.user.name} ${cell.user.lastname}`, "numOfQuestionsAnswered", "grade"]}
                        ></AppTable>

                        <br />
                        <Divider />
                        <br />
                        <br />

                        
                            <b className="title">Question Statistics</b>
                        
                        <div>
                            Click a question to show statics regarding its answers,then click the answer to see which answer each respondent selected.<br />
                            You can use de following buttons to do the same with the question in the list
                        </div>
                        <br />
                        <br />


                        <div>
                            <label>Filter By tags or content:</label>
                            <input type="text" />
                        </div>



                        {loadingOverview && (
                            <div>

                                <AppTable
                                    headerCells={["Question", "Number of Submissions", "%AnsweredCorrecly"]}
                                    collection={tablaData}
                                    bodyCells={["question", "numberOfSubmissions", (cell) => { return (cell.numOfCorrects * 100) / cell.numberOfSubmissions }]}

                                ></AppTable>
                            </div>)}
                        <div>
                            <Link to="/" className="btn btn-warning">Back</Link>

                        </div>

                    </div>)}

            </div>

        </div>);
}

export default ReportByExam;