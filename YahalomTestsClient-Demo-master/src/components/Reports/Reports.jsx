import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import * as React from 'react';
import TestService from "../../services/testService";
import { Formik, ErrorMessage } from "formik";
import searchExamValidator from "../../validators/models/searchExam"



const ReportByExamInitial = () => {

  debugger
  const [value, setValue] = useState([null, null]);
  const [tests, setTest] = useState();
  const [testId, setTestId] = useState();

  useEffect(async () => {
    const loadTests = async () => {
      let tests = await TestService.getAllTests();
      setTest(tests.data)
    }
    await loadTests();

  }, [])


  return (
    <div>
      <div className="wrapper">
        <b className="title">Test Report By Development</b>
        <div className="mycontainer">
          <div className="row justify-content-center ">
            <label className="col-sm-3  a">Select Test:</label>
            <div className="col-sm-8">
              {tests && (
                <select  className="form-select" 
                  onChange={(event) => {setTestId(event.target.value); }}>
                  <option></option>
                  {tests.map((test) => (
                    <option value={test.id}>{test.name}</option>))
                  }
                </select>)}
            </div>

          </div>
          <div className="containerItem">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="start Date"
                endText="Final Date"
                value={value}
                onChange={(newValue) => { setValue(newValue) }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="boxReportTest">
            <Link to={`/Reports/ByExam/${value[0]}/${value[1]}/${testId}`} className="btn btn-success">GenerateReport</Link>
            <Link to="/" className="btn btn-warning">Back</Link>
          </div>

        </div>

      </div>

    </div>
  )
}



const Reports = () => {


  const [byTest, setByTest] = useState(false);


  if (!byTest) {
    return (
      <div>
        <div className="wrapper">

          <b className="title">Select Opcion To Report</b>

          <div className="mycontainer">
            <Link to="/Reports/ByStudent" className="btn btn-secondary containerItem">bystudent</Link>
            <button onClick={() => { setByTest(true) }} className="btn btn-secondary containerItem">By Test</button>
          </div>


        </div>


      </div >

    )
  } else {
    return (

      <ReportByExamInitial></ReportByExamInitial>
    )

  }

}

export default Reports;
