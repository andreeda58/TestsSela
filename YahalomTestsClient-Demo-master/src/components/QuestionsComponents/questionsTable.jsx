import React, { Component, useState, useEffect } from "react";
import QuestionService from "../../services/questionService";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "tags", headerName: "tags", width: 130 },
  { field: "content",headerName: "content", width: 400,},
  { field: "lastChange", headerName: "last Update", width: 130 },
  { field: "questionKind", headerName: "question Type", width: 130 },
  {
    field: "Actions",
    width: 300,
    renderCell: (cellValues) => {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/Questions/Show/${cellValues.id}`}

          > Show</Button>
          <Button
            component={Link}
            to={`/Questions/Form/${cellValues.id}`}
            variant="contained"
            color="primary"
          > Edit</Button>
          <Button

            variant="contained"
            color="primary"
          > Delete</Button>
        </div>
      );
    }
  },
];

const DataGridDemo = () => {


  const [data, setData] = useState([]);
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState("");

  useEffect(() => {

    const loadQuestions = async () => {
      const listQuestions = await QuestionService.getAllQuestions();
      setData(listQuestions.data);
      setRows(listQuestions.data);
    }
    loadQuestions();
  }, [setData])

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return row.tags.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };


    return (
      <div>
        <div>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rowHeight={120}
            rows={rows}
            columns={columns}
            pageSize={10}
          />
        </div>
        <div>
          <Link to="/Questions/Form/0" className="btn btn-success">Add New Question</Link>
          <Link to="/" className="btn btn-warning">Back</Link>
        </div>
      </div>
    );
  
}


export default DataGridDemo;
