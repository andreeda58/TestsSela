

const StatusToPass = (props) => {
    if (props.grade > props.noteToPass) {
        return (
            <label>passed</label>);
    }
    return (
        <label>disapproved</label>);
}

const EndOfExam = (props) => {

    return (
        <div>

            <div className="wrapper">
            <b className="title">Results</b>
            <div>
                <br />
                <div>
                    <label>Your Grade:</label>
                    {props.grade}
                </div>
                <div>
                    <label>Status :</label>
                    <StatusToPass {...props}/>
                </div>
                <div>
                    <label>Summary : deveploment</label>

                </div>
                <div>
                    <label>Passing Grade :  {props.noteToPass}</label>
                   
                </div>

                <br />
                <br />
           

            </div>
            </div>
            
           
        </div>
    );
}

export default EndOfExam;