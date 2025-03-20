import { useState } from 'react';

function App() {
  const [sandboxId, setSandboxId] = useState(null);

  const createSandbox = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/create-sandbox', {
        method: 'POST',
      });
      const data = await response.json();
      setSandboxId(data.id);
    } catch (error) {
      console.error('Error creating sandbox:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">CodeSandbox SDK Example</h1>
        <button
          onClick={createSandbox}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Sandbox
        </button>
        {sandboxId && (
          <p className="mt-4">
            New sandbox created with ID:{' '}
            <a
              href={`https://codesandbox.io/s/${sandboxId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {sandboxId}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;