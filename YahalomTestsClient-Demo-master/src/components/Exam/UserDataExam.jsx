import { useState } from "react";
import { Formik, ErrorMessage } from "formik"

import user_validator from "../../validators/models/user"
const UserData = (props) => {

    const Submit = (user) => props.OnUserSubmit({ user }, true);


    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    lastName: "",
                    email: ""
                }}
                validationSchema={user_validator}
                onSubmit={Submit}

            >
                {(props) => (
                    <div className="wrapper">
                        <b className="title">LogIn User</b>
                        <form onSubmit={props.handleSubmit} className="mycontainer2">
                            <div>
                                <div>
                                    <label className="form-label">First Name</label>
                                </div>
                                <div>
                                    <input name="name" className="form-control" onChange={props.handleChange} className="form-control form-control-lg" type="text"
                                    />
                                    <ErrorMessage className="error" name="name">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="form-label">Last Name</label>
                                </div>
                                <div>
                                    <input name="lastName" className="form-control" onChange={props.handleChange} className="form-control form-control-lg" type="text" />
                                    <ErrorMessage className="error" name="lastName">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="form-label">Email</label>
                                </div>
                                <div>
                                    <input name="email" className="form-control" onChange={props.handleChange} className="form-control form-control-lg" type="text" />
                                    <ErrorMessage className="error" name="email">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <button className="btn btn-primary" type="Submit" >Submit</button>
                            </div>

                        </form>

                    </div>
                )}
            </Formik>
        </>




    );

}

export default UserData;