import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from "/Users/admin/Desktop/Slack/client/src/App.js"

import "./style.css"
const Record = (props) => (
 <>
   <p>{props.record.name} {props.record.position} {props.record.level}</p>
 </>
);
 
export default function RecordList(){
 const [records, setRecords] = useState([]);
 const user = useContext(UserContext);
 console.log(user.selectedGroup)
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length])
 

 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         key={record._id}
       />
     );
   });
 }
 
 

 // This following section will display the table with the records of individuals.
 return (
   <div style={{marginLeft:"10px",marginRight:"10px"}}>
     <h3>Record List</h3>
       <div>{recordList()}</div>
         <textarea 
              style={{width:"100%"}}
               onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  console.log(ev.target.value);
                }
              }}
         />
   </div>
 );
}