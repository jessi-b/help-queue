// parent to NewTicketForm and TicketList (import both)
// class-based component: handles state 
import React from 'react';
import NewTicketForm from './CreateTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';

class TicketControl extends React.Component {
  // constructor
  constructor(props) {
    // parent to child through props
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainTicketList: [],  // initialize empty to store new created tickets
      selectedTicket: null
    };
  }

  // event handler methods
  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }
  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);  // add new ticket to end of list
    this.setState({
      mainTicketList: newMainTicketList,
      formVisibleOnPage: false 
    });
  }
  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }
  // handleUpdateTicket = () => {
    
  // }
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }
  
  // render method
  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    // if (this.state.formVisibleOnPage) {
    //   currentlyVisibleState = <NewTicketForm />;
    //   buttonText = "Return to Ticket List"; 
    if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} />
      buttonText = "Return to Ticket List"; 
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} />
      buttonText = "Return to Ticket List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
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