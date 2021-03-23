import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function ReportTable() {
    const [entries, setEntries] = useState({
        data: [
            {
                id: "",
                date: "",
                description: "",
                totalTime: ""
            }
        ]
    });

    const [state] = React.useState({
        columns: [
            { title: "Date", field: "date", type: "date" },
            { title: "Description", field: "description" },
            { title: "Total Hours", field: "totalTime" }
        ]
    });

    useEffect(() => {
        axios
        .get("https://my-json-server.typicode.com/AprilXiaoyanLiu/demo/test")
        .then(response => {
        let data = [];
    response.data.forEach(el => {
        data.push({
        id: el.id,
        date: el.date,
        description: el.description,
        totalTime: el.totalTime
    });
});
    setEntries({ data: data });
})
.catch(function(error) {
        console.log(error);
    });
}, []);

    return (
        <MaterialTable
    title="Report Table"
    columns={state.columns}
    data={entries.data}
    editable={{
        onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            const data = [...entries.data];
            data[data.indexOf(oldData)] = newData;
            axios
                .put("https://my-json-server.typicode.com/AprilXiaoyanLiu/demo/test", newData, {
                    params: {
                        id: entries.data[0].id
                    }
                })
                .then(res => console.log(res.data));
            setEntries({ ...entries, data });
        }, 600);
    }),
        onRowDelete: oldData =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve();
            const data = [...entries.data];
            data.splice(data.indexOf(oldData), 1);
            axios
                .delete("http://app-server:8080/report", {
                    params: {
                        id: entries.data[0].id
                    }
                })
                .then(res => console.log(res.data));
            setEntries({ ...entries, data });
        }, 600);
    })
    }}
    />
);
}