import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";

const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
  };
  
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };
  
  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };
const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "question", headerName: "Respondent", width: 300 },
    { field: "", headerName: "answered correcly", width: 150 },
    { field: "correct questions", headerName: "Date answered", width: 150 },
];

const DetailsExamTable = () => {
    const [data, setData] = useState([]);


    return (
        <div>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rowHeight={120}
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                />
            </div>

        </div>
    );
}

export default DetailsExamTable;

