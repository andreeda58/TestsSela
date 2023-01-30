
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ListFormat } from "typescript";
import QuestionService from "../../services/questionService";
import TestService from "../../services/testService";
import UserData from "../Exam/UserDataExam";
import WelcomeToExam from "../Exam/WelcomeToExam";
import parse from 'html-react-parser';
import QuestionToShow from "../QuestionsComponents/QuestionShow";
import ExamContent from "../Exam/ExamContent";
import UserService from "../../services/userService";
import * as uuid from 'uuid'


const Exam = () => {

    let { id } = useParams();
    const [questionsId, setQuestionsId] = useState([]);
    const [test, setTest] = useState({});
    const [logIn, SetLogin] = useState(false);
    const [iniExam, SetInitExam] = useState(false);
    const [full, setFull] = useState(false);
    const [examId,setExamId]=useState("");
    const [overviewId,setOverviewId]=useState("");
    const [userId,setUserId]=useState();

    let quetionsbyId = [];
    

    useEffect(async () => {
        let loadTest = async () => {
            let test = await TestService.getTestById(id);
            setTest(test.data[0]);
        }
        await loadTest();
    }, [setTest])

    useEffect(() => {
        setFull(true);
    }, [questionsId])

    let loadQuestions = async () => {
        await test.questions.forEach(async (element) => {
            let question = await QuestionService.getQuestionById(element)
            quetionsbyId.push(question.data[0])
            setQuestionsId(quetionsbyId);
        });
    }

    const InitFormExam = (init) => {
        setExamId(uuid.v4());
        setOverviewId(uuid.v4());
        SetInitExam(init);
    }
 
    const GetUser = async ({ user }, submit) => {
        
        
        user.id=uuid.v4();
        setUserId(user)
        UserService.addUser(user)
        SetLogin(submit);
        await loadQuestions();
    }


    if (logIn == false) {
        return (
            <div>
                <UserData OnUserSubmit={GetUser} id={id}></UserData>
            </div>
        );
    }
    if (iniExam == false) {
        return (
            <div>
                <WelcomeToExam onInitExamEvent={InitFormExam} header={parse(test.header)} />
            </div>
        );
    }

    if (full) {
        
        return (
            <div>
                <ExamContent questions={questionsId} examId={examId} userId={userId} overviewId={overviewId} testId={test.id} noteToPass={test.noteToPass}></ExamContent>
            </div>
        );
    }
}




export default Exam;