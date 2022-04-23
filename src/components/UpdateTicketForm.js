import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function UpdateTicketForm(props){
  const { ticket } = props;

  function handleUpdateTicketFormSubmission(event) {
    event.preventDefault();
    props.onUpdateTicket({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: ticket.id});
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleUpdateTicketFormSubmission} 
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

UpdateTicketForm.propTypes = {
  ticket: PropTypes.object,
  onUpdateTicket: PropTypes.func
};

export default UpdateTicketForm;