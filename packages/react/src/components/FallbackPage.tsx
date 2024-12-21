import "@v7-product-interview-task/styles/FallbackPage.module.css"

export const FallbackPage = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;

  return (
    <div>
      <h1>Welcome to Go-lite</h1>
      <p>
        Visit{" "}
        <span className="monospace">/:workspaceId/projects/:projectId</span> to
        use this app.
      </p>
      <p>
        Or visit a project in
        {' '}<a
          href="https://go.v7labs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go
        </a>{' '}
        and replace the hostname with
        {' '}<span className="monospace">{`${hostname}:${port}`}</span>
      </p>
    </div>
  );
};
