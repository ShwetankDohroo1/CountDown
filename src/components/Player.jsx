import { useState, useRef } from 'react';

export default function Player() {
  const [enteredPlayerName, setPlayerName] = useState(null);

  const playername = useRef();

  function handleClick() {
    setPlayerName(playername.current.value);
    playername.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playername} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
