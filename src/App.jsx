import { useState } from "react";

export default function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchFlights = async () => {
    setLoading(true);
    const res = await fetch("https://flightmixer-backend.onrender.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination, date }),
    });
    const data = await res.json();
    setResults(data.itineraries || []);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">FlightMixer</h1>
      <input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Origin (e.g., MSP)" />
      <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination (e.g., CDG)" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button onClick={searchFlights}>{loading ? "Searching..." : "Search"}</button>
      {results.map((itinerary, idx) => (
        <div key={idx}>
          <p><strong>Price:</strong> ${itinerary.price}</p>
          <ul>
            {itinerary.legs.map((leg, i) => (
              <li key={i}>{leg.departure} → {leg.arrival} @ {leg.time}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
