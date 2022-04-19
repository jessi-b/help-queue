// parent to NewTicketForm and TicketList (import both)
// class-based component: handles state 
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {
  constructor(props) {
    // parent to child through props
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainTicketList: []  // initialize empty to store new created tickets
    };
  }
  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }
  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);  // add new ticket to end of list
    this.setState({
      mainTicketList: newMainTicketList,
      formVisibleOnPage: false 
    });
  }
  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    // if (this.state.formVisibleOnPage) {
    //   currentlyVisibleState = <NewTicketForm />;
    //   buttonText = "Return to Ticket List"; 
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} />
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}

export default TicketControl;