import sdk from "@stackblitz/sdk";
import { useEffect, useRef } from "react";

function CodeEditor() {
  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (embedRef.current) {
        sdk.embedProject(embedRef.current, {
          title: "HTML Sandbox",
          description: "A simple HTML sandbox using StackBlitz SDK",
          template: "html",
          files: {
            "index.html": String(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HTML Sandbox</title>
                <style>
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }
                  body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                    color: #ffffff;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                  }
                  .container {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 2rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    text-align: center;
                    max-width: 600px;
                    width: 100%;
                  }
                  h1 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                  }
                  p {
                    font-size: 1.1rem;
                    opacity: 0.9;
                    margin-bottom: 1.5rem;
                  }
                  .start-coding {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    background-color: #10b981;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                    transition: background-color 0.3s ease, transform 0.1s ease;
                  }
                  .start-coding:hover {
                    background-color: #059669;
                    transform: translateY(-2px);
                  }
                  .start-coding:active {
                    transform: translateY(0);
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Welcome to HTML Sandbox</h1>
                  <p>
                    This is your HTML playground! Start building your web page here. Edit the code in the editor to see changes live.
                  </p>
                  <a href="#" class="start-coding">Start Coding</a>
                </div>
              </body>
              </html>
            `).trim(),
          },
        });
      }
    }, 500);

    return () => clearTimeout(timeout); // Cleanup
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700 shadow-md">
        <h2 className="text-lg font-semibold text-white">Code Editor</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">HTML Sandbox</span>
        </div>
      </div>
      {/* Editor Container */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={embedRef}
          className="w-full h-full border-t border-gray-700 rounded-b-lg shadow-lg bg-gray-800"
        />
      </div>
    </div>
  );
}

export default CodeEditor;