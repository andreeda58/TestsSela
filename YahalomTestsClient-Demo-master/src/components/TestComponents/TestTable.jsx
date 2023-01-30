import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestService from "../../services/testService"
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";





const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "link",
    width: 130,
    renderCell: (cellValues) => {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { navigator.clipboard.writeText(`http:/localhost:3000/Exam/${cellValues.id}`) }}
          > Get Link</Button>
        </div>
      );
    },
  },
  { field: "name", headerName: "Test Name", width: 300 },
  { field: "numbersOfQuestions", headerName: "num of questions", width: 130 },
  { field: "type", headerName: "question Type", width: 130 },
  {
    field: "Actions",
    width: 300,
    renderCell: (cellValues) => {
      return (
        <div>
          <Button
            component={Link}
            to={`/Test/Form/${cellValues.id}`}
            variant="contained"
            color="primary"
          > Edit</Button>
          <Button
            variant="contained"
            color="primary"
          > Duplicate</Button>
        </div>
      );
    }
  },
];

const TestTable = () => {

  const [data, setData] = useState([]);
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      const listOfTests = await TestService.getAllTests();
      setData(listOfTests.data);
      setRows(listOfTests.data);
    }
    loadQuestions();
  }, [setData])

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
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
          pageSize={5}
        />
      </div>
      <div>
        <Link  className="btn btn-success"  to="/Test/Form/0">Add New Test</Link>
      </div>

    </div>
  );

}

export default TestTable;
