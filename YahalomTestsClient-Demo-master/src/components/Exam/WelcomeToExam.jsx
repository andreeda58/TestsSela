import "../cssComponents/exam.css"

const WelcomeToExam = (props) => {

    const Start = () => {
        props.onInitExamEvent(true)
    }

    return (
        <div className="wrapper">

            <div>
                <div className="row row-cols-1">
                    <b  className="col title">Welcome to de Development Exam</b>
                    <b className="col my">{props.header}</b>
                </div>
                <div>
                    <div>
                        <button className="btn btn-success" onClick={Start}>Start Exam</button>
                    </div>

                </div>

            </div>
        </div>
    );

}

export default WelcomeToExam;