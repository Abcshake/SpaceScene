export default function Sidepanel({ stations, activeStation, onEnter }) {
  return (
    <div className="side-panel">
      <h3>Other Stations</h3>
      {stations
        .filter(s => s.id !== activeStation)
        .map(s => (
          <button key={s.id} 
          onClick={() => {
            console.log("Sidepanel received onEnter:", typeof onEnter)
            onEnter(s)
          }}
          >
                  Enter {s.name}
                </button>
        ))}
    </div>
  );
}