import React from "react";
import { RequestStatus } from "../enums/RequestStatus.js";

const withStatusHandler = (WrappedComponent) => {
  const StatusHandler = (props) => {
    const { status } = props;

    // --- ERROR MAPPING (Mapping ALL possible responses) ---
    let title = "Something went wrong";
    let message = "We couldn't process the request.";

    // --- LOADING GUARD ---
    if (status === RequestStatus.requestPhase.LOADING) {
      return (
        <div className="page-loader">
          <div className="page-state page-state--loading">
            <div className="page-state__content">
              <p className="page-state__message">Loading...</p>
            </div>
          </div>
        </div>
      );
    }

    // --- EMPTY STATE GUARD ---
    if (status === RequestStatus.responsePhase.EMPTY) {
      return (
        <div className="page-state page-state--empty">
          <div className="page-state__content">
            <p className="page-state__message">No items available at the moment.</p>
          </div>
        </div>
      );
    }

    // Network & Aborted
    if (status === RequestStatus.errorPhase.NETWORK_ERROR) {
      title = "Network error";
      message = "Please check your internet connection.";
    }
    
    if (status === RequestStatus.errorPhase.ABORTED) {
      title = "Request Cancelled";
      message = "The request was stopped.";
    }

    // Server Issues
    if (status === RequestStatus.responsePhase.INTERNAL_SERVER_ERROR) title = "Internal server error";
    if (status === RequestStatus.responsePhase.SERVER_ERROR) title = "Server error";
    if (status === RequestStatus.responsePhase.DATA_CORRUPTION) {
      title = "Data Error";
      message = "Received corrupted data from the server.";
    }

    // Validation
    if (status === RequestStatus.responsePhase.INPUT_VALIDATION_ERROR || 
        status === RequestStatus.responsePhase.VALIDATION_ERROR) {
      title = "Validation Error";
      message = "Bad data sent. Please verify your info.";
    }

    // Not Found Cases
    if (status === RequestStatus.responsePhase.PRODUCT_NOT_FOUND) {
      title = "Product not found";
      message = "The requested product does not exist.";
    }

    if (status === RequestStatus.responsePhase.ORDER_NOT_FOUND) {
      title = "Order not found";
      message = "We couldn't locate that order.";
    }

    // --- ERROR UI TRIGGER ---
    // This checks if the status exists in either errorPhase or responsePhase (excluding SUCCESS and EMPTY)
    const isErrorState = 
      Object.values(RequestStatus.errorPhase).includes(status) || 
      (Object.values(RequestStatus.responsePhase).includes(status) && 
       status !== RequestStatus.responsePhase.SUCCESS && 
       status !== RequestStatus.responsePhase.EMPTY);

    if (isErrorState) {
      return (
        <div className="page-state page-state--error">
          <div className="page-state__content">
            <h2 className="page-state__title">{title}</h2>
            <p className="page-state__message">{message}</p>
            <button className="page-state__button" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        </div>
      );
    }

    // --- SUCCESS CASE ---
    // Reached if status is SUCCESS or IDLE (to allow mounting/dispatching)
    return <WrappedComponent {...props} />;
  };

  StatusHandler.displayName = `withStatusHandler(${WrappedComponent.name || 'Component'})`;
  return StatusHandler;
};

export default withStatusHandler;