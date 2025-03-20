import sdk from "@stackblitz/sdk";
import { useEffect, useRef } from "react";

function CodeEditor() {
  const embedRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (embedRef.current) {
        sdk.embedProject(embedRef.current, {
          title: "{Company_Name}",
          description: "Welcome to {Company_Name} {Session_Name} ",
          template: "html",
          files: {
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
           
          },
        });
      }
    }, 500); // Delay ensures the DOM element is available

    return () => clearTimeout(timeout); // Cleanup
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div ref={embedRef} className="w-full h-screen border rounded shadow-lg bg-white"></div>
    </div>
  );
}

export default CodeEditor;
