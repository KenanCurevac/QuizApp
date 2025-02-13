import "./DataStatus.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";

export default function DataStatus({ fetchedData, isFetching, error }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timeout;

    if (isFetching) {
      timeout = setTimeout(() => {
        setShowSpinner(true);
        setShowMessage(true);
      }, 1000);
    } else if (timeout !== null) {
      clearTimeout(timeout);
      setShowSpinner(false);
      setShowMessage(false);
    }

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [isFetching]);

  if (showSpinner) {
    return <CircularProgress className="loading-spinner" />;
  }

  if (showMessage && error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (showMessage && (!fetchedData || fetchedData.length === 0)) {
    return <div className="error-message">No Question available.</div>;
  }

  return null;
}
