import React, { useState } from "react";
import axios from "axios";
import { parse } from "json2csv";
import { saveAs } from "file-saver";

import "./App.css";

function App() {
	const [data, setData] = useState<any>([]);

	const fetchData = async () => {
		try {
			const res = await axios.get("https://api.publicapis.org/entries");
			setData(res.data.entries);
			console.log(data);
			convertAndSaveToCSV(res.data.entries);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const convertAndSaveToCSV = (data: any) => {
		try {
			const csvData = parse(data);
			const blob = new Blob([csvData], {
				type: "text/csv;charset=utf-8",
			});
			saveAs(blob, "data.csv");
		} catch (error) {
			console.error("Error converting data to CSV:", error);
		}
	};

	return (
		<>
			<div>
				<button onClick={fetchData}>
					Fetch API & download file as CSV
				</button>
			</div>
		</>
	);
}

export default App;
