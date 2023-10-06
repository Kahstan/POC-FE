import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { saveAs } from "file-saver";

function App() {
  const [data, setData] = useState([])
  const [isDownloaded, setIsDownloaded] = useState(false)

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.publicapis.org/entries");
      setData(res.data.entries);
      // console.log(data);

      const jsonkeys = Object.keys(data[0])
      // console.log(jsonkeys);

      const headerData = jsonkeys.join(",");
      // console.log(headerData)

      const rowData = data.map((item) => {
        // description values has commas in the string, resulting in many columns.
        item.API = item.API.replaceAll(",", "")
        item.Description = item.Description.replaceAll(",", "")
        // console.log(item)
        return jsonkeys.map((key) => item[key]).join(',')
      })

      // console.log(rowData)

      const json2csv = `${headerData}\n${rowData.join('\n')}`;
      // console.log(json2csv)

      // learnt that CSV is called comma separated values, and we need to convert the json into a string with 
      // comma separated values in order to export it into a .csv file.

      // as browser cannot use fs, nodejs is not a browser API, I used a different approach to 'download' files into user's local filesystem
      // explored "file-saver" library that can help with downloads
      const csvBlob = new Blob([json2csv], { type: "text/csv;charset=utf-8" });
      saveAs(csvBlob, "data.csv")
      setIsDownloaded(true)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <>
      <div>
        {isDownloaded ? <div>File downloaded</div> : <button onClick={fetchData}>
          Fetch API & download file as CSV
        </button>}

      </div>
    </>
  );
}

export default App;
