// parent to NewTicketForm and TicketList (import both)
// class-based component: handles state 
import React from 'react';
import NewTicketForm from './CreateTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import UpdateTicketForm from './UpdateTicketForm';

class TicketControl extends React.Component {
  // constructor
  constructor(props) {
    // parent to child through props
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainTicketList: [],  // initialize empty to store new created tickets
      selectedTicket: null,
      updating: false
    };
  }

  // event handler methods
  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        updating: false
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
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }
  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }
  handleUpdateClick = () => {
    console.log("handleUpdateClick reached!");
    this.setState({updating: true});
  }
  handleUpdatingTicketInList = (ticketToUpdate) => {
    const updatedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToUpdate);
    this.setState({
        mainTicketList: updatedMainTicketList,
        updating: false,
        selectedTicket: null
      });
  }
  
  // render method
  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    // if (this.state.formVisibleOnPage) {
    //   currentlyVisibleState = <NewTicketForm />;
    //   buttonText = "Return to Ticket List"; 
    if (this.state.updating ) {      
      currentlyVisibleState = <UpdateTicketForm ticket = {this.state.selectedTicket} onUpdateTicket = {this.handleUpdatingTicketInList}/>
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingUpdate = {this.handleUpdateClick}
      />
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