import sdk from "@stackblitz/sdk";
import { useEffect, useRef } from "react";

function CodeEditor() {
  const embedRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (embedRef.current) {
        sdk.embedProject(embedRef.current, {
          title: "React Sandbox",
          description: "A simple React app using StackBlitz SDK",
          template: "create-react-app",
          dependencies: {
            react: "latest",
            "react-dom": "latest",
          },
          files: {
            "index.js": `
              import React from 'react';
              import ReactDOM from 'react-dom';
              import App from './App';
              ReactDOM.render(<App />, document.getElementById('root'));
            `,
            "App.js": `
              import React from 'react';
              function App() {
                return <h1>Hello from StackBlitz!</h1>;
              }
              export default App;
            `,
            "index.html": `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>React App</title>
              </head>
              <body>
                <div id="root"></div>
              </body>
              </html>
            `,
            "package.json": JSON.stringify({
              dependencies: {
                react: "latest",
                "react-dom": "latest",
              },
              main: "index.js",
            }),
          },
        });
      }
    }, 500); // Delay ensures the DOM element is available

    return () => clearTimeout(timeout); // Cleanup
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div ref={embedRef} className="w-full h-screen border rounded shadow-lg bg-white"></div>
    </div>
  );
}

export default CodeEditor;
