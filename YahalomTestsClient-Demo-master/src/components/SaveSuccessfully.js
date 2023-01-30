import { Link } from 'react-router-dom';

const SaveSuccessfully = () => {
    return (<div>

        <div className='wrapper'>
            <b className='title save'>
                Save Successfully into the dataBase
            </b>
            <Link className="btn btn-success" to="/">Back to Menu</Link>
        </div>


    </div>)
}


export default SaveSuccessfully;