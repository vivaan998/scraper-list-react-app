import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

class Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          field: "id",
          headerName: "Id",
          align: "center",
          headerAlign: "center",
        },
        {
          field: "name",
          headerName: "Name",
          flex: 0.6,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "giturl",
          headerName: "Github URL",
          flex: 1,
          headerAlign: "center",
          align: "center",
          renderCell: (rowData) => (
            <a href={rowData.value} target="_blank" rel="noopener noreferrer">
              {rowData.value}
            </a>
          ),
        },
        {
          field: "downloadurl",
          headerName: "Download Link",
          flex: 0.5,
          headerAlign: "center",
          align: "center",
          renderCell: (rowData) => (
            <a
              href={rowData.value}
              target="_blank"
              rel="noopener noreferrer"
              download="temp.txt"
            >
              Download Link
            </a>
          ),
        },
      ],
      rows: [],
      API_URL: `https://api.github.com/repos/Equator-Studios/scrapers/contents/scrapers`,
    };
  }

  async getData() {
    try {
      const response = await axios.get(this.state.API_URL);
      const data = response.data;
      console.log(data);
      data.forEach((i, index, array) => {
        let row = {
          id: "",
          name: "",
          giturl: "",
          downloadurl: "",
        };
        row.id = index + 1;
        row.name = i.name;
        row.giturl = i.html_url;
        row.downloadurl = i.download_url;
        this.state.rows = [...this.state.rows, row];
        this.setState({ rows: this.state.rows });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    this.getData();
  }

  render() {
    console.log("length", this.state.rows.length);
    return (
      <div className="App">
        <DataGrid
          autoHeight
          rows={this.state.rows}
          columns={this.state.columns}
          getRowId={(row: any) => row.name + row.giturl}
          sx={{
            boxShadow: 5,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            ".MuiDataGrid-columnSeparator": {
              display: "flex",
              color: "primary.main",
            },
          }}
          checkboxSelection
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    );
  }
}

export default Data;