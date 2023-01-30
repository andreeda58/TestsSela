import Divider from '@mui/material/Divider';

import { Button } from "@mui/material";
import { useEffect, useState } from 'react';

import AppTable from '../AppTable';
import QuestionToShow from '../QuestionsComponents/QuestionShow';






const ReportByStudent2 = (props) => {


    
    const ShowQuestion = (record) => {
        debugger
        if (record) {
            return (<QuestionToShow
                questionKind={record.questionKind}
                answers={record.questionAnswers}
                id={record.id}
            >
            </QuestionToShow>)
        }
        else return record;
    }


    const BackButton = () => props.BackButtonPressed(false);

    return (
        <div>
            <div className="wrapper ">
                <b className='title'>Test Results For: {props.data.testName}</b>
                <div className='mycontainer2'>
                    <div>
                        <b>Respondent: {props.data.userName}</b>
                    </div>

                    <br />
                    <Divider />
                    <br />
                    <br />
                    <h2>Summary</h2>

                    <div>
                        <label>Test Name: {props.data.testName}</label>
                        <span />
                    </div>
                    <div>
                        <label>Test Id: {props.data.testId}</label>
                        <span />
                    </div>
                    <div>
                        <label>Number of Questions:</label>
                        <span> {props.data.numOfQuestions}</span>
                    </div>
                    <div>
                        <label>Pasing Grade:</label>
                        <span> {props.data.passingGrade}</span>
                    </div>
                    <div>
                        <label>Last Submitted:</label>
                        <span> {props.data.lastActivity}</span>
                    </div>
                    <div>
                        <label>Number of  questions submitted:</label>
                        <span> {props.data.numOfQuestionsAnswered}</span>
                    </div>
                  
                    <div>
                        <label>final Grade:</label>
                        <span> {props.data.grade}</span>
                    </div>
                    <div>
                        <label>Status:</label>
                        <span> {props.data.status}</span>
                    </div>

                    <br />
                    <Divider />
                    <br />

                    <b className='title'>
                        Details
                    </b>
                    <div>
                        Click a question to see which of its answers were selected and whether they were correct, or click "expand all " to see it for all questions
                    </div>
                    <div>
                        <Button>Expand All</Button>
                    </div>
                    <div>
                        <AppTable
                            headerCells={["Id", "Question", "Aswered Correcly", "Date"]}
                            collection={props.tabla}
                            bodyCells={["id", "question", "correctly", "date"]}
                            collapsable
                            collapsedContent={ShowQuestion}
                        />



                    </div>

                    <div>
                        <Button onClick={BackButton}>Back</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportByStudent2;