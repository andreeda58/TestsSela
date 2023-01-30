import { useState } from "react";
import parse from 'html-react-parser';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../cssComponents/questionToShow.css"


const QuestionToShowExam = (props) => {


    debugger
    const SelectedItem = (event) => {
        props.onAnswerSingleItem(event);
    }

    const SelectedMultipleItems = (event) => {
        props.onAnswerMultipleItems(event);
    }


    if (props.question.questionKind == "multiple Choice") {
        return (
            <div className="wrapper">
                <b  className="title">Development Exam</b>
                <div className="mycontainer">
                    <b className="legend">Question:</b>
                    <h4>
                        {props.question.content}
                    </h4>
                    <b className="legend">Select the correct answer</b>
                    <div>
                        <MultipleChoice onChange={SelectedMultipleItems} answer={props.question.answer}></MultipleChoice>
                    </div>
                </div>
            </div>
        )

    }
    return (

        <div className="wrapper">
             <b  className="title">Development Exam</b>
            <div className="mycontainer">
                <div>
                    <b className="legend">Question:</b>
                </div>

                <h4>
                    {props.question.content}
                </h4>

                <b className="legend">Select the corrects answers</b>
                <div>
                    <SingleChoice onChange={SelectedItem} answer={props.question.answer}></SingleChoice>
                </div>
            </div>
        </div>

    );


}


const MultipleChoice = (props) => {



    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {

        debugger
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);

        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);

        if (currentIndex == -1) {
            props.onChange(newChecked[newChecked.length - 1]);
        }
        else {
            props.onChange(value);
        }


    };

    return (
        <div>
            <List>
                {
                    props.answer.map((value) => (
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
                                <ListItemText id={value.id} primary={parse(value.content)} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </div>
    );

}

const SingleChoice = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {

        setValue(event.target.value);
        const actualAnswer = props.answer.filter(answer => answer.content == event.target.value)

        props.onChange({ content: actualAnswer[0].content, id: actualAnswer[0].id, correct: actualAnswer[0].correct });

    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Select the correct answer</FormLabel>
            <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
            >

                {props.answer.map(item => (
                    <FormControlLabel key={item.id} value={item.content} control={<Radio id={item.id} />} label={parse(item.content)} />
                ))}
            </RadioGroup>
        </FormControl>
    );

}



export default QuestionToShowExam;