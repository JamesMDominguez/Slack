import React, {useState,createContext} from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Create from "./components/create";
import { Auth0Provider } from "@auth0/auth0-react";
export const UserContext = createContext();

const App = () => {
  const [selectedGroup,setSelectedGroup] = useState() 
  const values = {selectedGroup,setSelectedGroup}
 return (
  <Auth0Provider
  domain="dev-x8a3sk5w.us.auth0.com"
  clientId="7maNTMMZ6eUZYES3FYJzrdRuQKFNTq5i"
  redirectUri={window.location.origin}
>
  <UserContext.Provider value={values}>
   <div>
     <Navbar/>
     <div style={{marginLeft:"20%"}}>
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/create" element={<Create />} />
     </Routes>
     </div>
   </div>
   </UserContext.Provider>
   </Auth0Provider>
 );
};
 
export default App;