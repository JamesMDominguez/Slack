import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import "./style.css";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import {UserContext} from "/Users/admin/Desktop/Slack/client/src/App.js"

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState("none");
  const [userInput, setUserInput] = useState();
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState([]);
  const user = useContext(UserContext);

  const users = [
    "itstatus@yahoo.ca",
    "ijackson@yahoo.ca",
    "jmmuller@mac.com",
    "grinder@sbcglobal.net",
    "netsfr@gmail.com",
    "animats@att.net",
    "hampton@yahoo.ca",
    "wonderkid@me.com",
    "duncand@optonline.net",
    "scato@live.com",
    "liedra@icloud.com",
    "crowl@hotmail.com",
  ];
  function showEmails() {
    return users.map((email) => {
      if (email.includes(userInput)) {
        return (
          <p
            className="emailList"
            onClick={() => {
              setSelected(() => [...selected, email]);
            }}
          >
            {email}
          </p>
        );
      }
    });
  }

  function showSelected() {
    return users.map((email) => {
      if (selected.includes(email)) {
        return <p className="emailList">{email}</p>;
      }
    });
  }

  function showGroups(){
    return groups.map((group)=>{
      return <p key={group.users} style={{wordWrap: "break-word"}} onClick={()=>user.setSelectedGroup(group._id)}>{group.users.toString()}</p>
    })
  }

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/groups/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setGroups(records);
    }
    getRecords();
    return;
  }, [groups.length]);
  
  async function onSubmit(e) {
    e.preventDefault();
  
    await fetch("http://localhost:5000/group/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({users:selected}),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setSelected([]);
    navigate("/");
  }

  return (
    <div>
      <nav className="sidebar">
        <img
          style={{ width: 15 + "%", marginLeft: "20px", marginTop: "10px" }}
          src="https://cdn.iconscout.com/icon/free/png-256/slack-logo-1889498-1597558.png"
          onClick={() => navigate("/")}
        />

        <div className="sidebarItem">
          <p onClick={() => setShowCreate("block")}>Messages +</p>
        </div>
        <div>
          {showGroups()}
        </div>
      </nav>

      <div
        id="overlay"
        style={{ display: showCreate }}
        onClick={() => {
          setShowCreate("none");
          setSelected([]);
        }}
      >
        <div id="text" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="input-group mb-3" style={{width:"50%"}}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Search
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" style={{marginBottom:"15px"}} onClick={(e)=>{onSubmit(e); setGroups(()=>[...groups,{users:selected}])}}>Create</button>
          </div>

          <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
            To:
            {showSelected()}
          </div>
          {showEmails()}
        </div>
      </div>
    </div>
  );
}
