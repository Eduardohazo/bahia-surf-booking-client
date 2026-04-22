import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorFallback() {
  const error = useRouteError();
  const message = error?.message || "Unknown error";

  console.error(error); // for debugging

  return (
    <div className="error-fallback">
      <h1 className="error-fallback__title">Something went wrong!</h1>
      <pre className="error-fallback__message">{message}</pre>
      <button className="error-fallback__button" onClick={() => window.location.reload()}>
        Refresh Page
      </button>
    </div>
  );
}