import React, { useEffect, useState, useContext } from "react";
import {UserContext} from "/Users/admin/Desktop/Slack/client/src/App.js"
import { useAuth0 } from "@auth0/auth0-react";

import "./style.css"
const Record = (props) => (
 <>
   <p>{props.record.message} {props.record.user}</p>
 </>
);
 
export default function RecordList(){
 const [records, setRecords] = useState([])
 const selectedGroup = useContext(UserContext)
 const [message,setMessage] = useState("")
 const { user,isAuthenticated } = useAuth0();

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


 async function onSubmit(e) {
  setRecords(()=>[...records,{message:message,user:user.email,groupID:selectedGroup.selectedGroup}])
  e.preventDefault();
  await fetch("http://localhost:5000/record/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({message:message,user:user.email,groupID:selectedGroup.selectedGroup}),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
}
 
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
 
  return (
   <div style={{marginLeft:"10px",marginRight:"10px"}}>
     <h3>Record List</h3>
       {recordList()}
         <textarea 
              style={{width:"100%",display:selectedGroup.selectedGroup==undefined?"none":"block"}}
               value={message}
               onChange={(e)=> setMessage(e.target.value)}
               onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  onSubmit(ev)
                  setMessage("")
                }
              }}
         />
   </div>
 );
}