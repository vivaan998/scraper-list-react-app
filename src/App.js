import "./App.css";
import LoadData from "./data";
import * as React from "react";

class App extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          padding: 10,
          color: "black",
          maxHeight: "90vh",
        }}
      >
        <span>Scraper Lists React App Challenge</span>
        <div
          style={{
            margin: "1%",
          }}
        ></div>
        <LoadData />
      </div>
    );
  }
}

export default App;