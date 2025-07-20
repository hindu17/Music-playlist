import React, { useState } from "react";

function App() {
  const [playlist, setPlaylist] = useState([
    "Song One",
    "Song Two",
    "Song Three",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newSong, setNewSong] = useState("");


  const handleAddSong = () => {
    if (newSong.trim() !== "") {
      setPlaylist([...playlist, newSong.trim()]);
      setNewSong("");
    }
  };

  
  const handleDeleteSong = (index) => {
    const updatedPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedPlaylist);

    if (index < currentIndex) {
      setCurrentIndex(currentIndex - 1);
    } else if (index === currentIndex) {
      setCurrentIndex(0);
    }
  };

  
  const handleNext = () => {
    if (playlist.length > 0) {
      setCurrentIndex((currentIndex + 1) % playlist.length);
    }
  };

 
  const handlePrevious = () => {
    if (playlist.length > 0) {
      setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length);
    }
  };

 
  const jumpToSong = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>🎵 Music Playlist</h2>

   
      <input
        type="text"
        placeholder="Enter song title"
        value={newSong}
        onChange={(e) => setNewSong(e.target.value)}
      />
      <button onClick={handleAddSong} style={{ marginLeft: "10px" }}>
        Add Song
      </button>

     
      <div style={{ marginTop: "20px" }}>
        <strong>Current Song:</strong>{" "}
        {playlist.length > 0 ? playlist[currentIndex] : "No songs in playlist"}
      </div>

      <ol style={{ marginTop: "20px" }}>
        {playlist.map((title, index) => (
          <li key={index} style={{ marginBottom: "5px" }}>
            <span
              onClick={() => jumpToSong(index)}
              style={{
                cursor: "pointer",
                fontWeight: currentIndex === index ? "bold" : "normal",
                color: currentIndex === index ? "blue" : "black",
              }}
            >
              {title}
            </span>
            <button
              onClick={() => handleDeleteSong(index)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ol>

      
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={playlist.length === 0}>
          ⏮️ Previous Song
        </button>
        <button
          onClick={handleNext}
          disabled={playlist.length === 0}
          style={{ marginLeft: "10px" }}
        >
          ⏭️ Next Song
        </button>
      </div>
    </div>
  );
}

export default App;
