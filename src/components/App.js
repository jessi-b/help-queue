import React from "react";
import Header from "./Header";
import TicketList from "./TicketList";

function App(){
  return ( 
    // JSX syntax; syntatic sugar
    // <React.Fragment>
    //   <ChildComponent />
    // </React.Fragment>
    <React.Fragment>
      <Header />
      <TicketList />
  </React.Fragment>
  );
}

export default App;