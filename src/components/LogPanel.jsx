// src/components/LogPanel.jsx
const LogPanel = ({ logs }) => {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 mt-6 max-w-2xl mx-auto text-left h-64 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Parking history:</h2>
        <div className="space-y-1">
          {logs.length === 0 ? (
            <p className="text-gray-400">Hozircha hech narsa yo‘q</p>
          ) : (
            logs.map((log, i) => (
              <p key={i} className="text-gray-600 font-bold text-sm">
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default LogPanel;
  