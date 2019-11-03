// import logo from './logo.svg';
import './App.css';
import Test from './Test'
import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const App = () => {
    const [established, setEstablished] = useState(false)
    const [client, setClient] = useState();

    useEffect(() => {
      if (!established) {
        const client = new W3CWebSocket('ws://localhost:8999/');
        setClient(client)
        setEstablished(true);
      }
    })
  
  
    return (
      <>
        <Test client={client}></Test>
      </>
    )
}

export default App;
