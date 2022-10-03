import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function Start({ signHandler }) {
  const { name, setName, room, setRoom } = useContext(AppContext);
  return (
    <div>
      <h1>Chat App</h1>
      <form>
        <input
          type="text"
          placeholder="Enter your name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Enter the room number*"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        ></input>
        <button onClick={signHandler}> Join room </button>
      </form>
    </div>
  );
}
