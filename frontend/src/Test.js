// import logo from './logo.svg';
// import './Test.css';
// import Test from './Test'
import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Label from './Label';
import TextItem from './TextItem';
import styled from 'styled-components';

const StyledTextItemContainer = styled.div`
  min-width: 250px;
  max-width: 100%;
  display: flex;
`;

const ChatWindow = styled.div`
  overflow-y: auto;
  max-height: 100%;
  display: grid;
`;

const OwnTextItem = styled(StyledTextItemContainer)`
  // background-color: green;
`;

const Test = ({...props}) => {
    const [payload, setPayload] = useState([]);
    const [text, setText] = useState("");
    const [currentUser, setCurrentUser] = useState(`user_${Math.floor(Math.random() * (999999999 - 1000000))}:`)
    useEffect(() => {
      if (props.client) {
        props.client.onmessage = (message) => {
          const parsed = JSON.parse(message.data);
          setPayload([...payload, {user: parsed.user, text: parsed.text}])
          console.log(payload)
        };
      }
    })
  
    const handleChange = (e) => {
      setText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      props.client.send(JSON.stringify({text: text, user: currentUser}))
      setText("")
    }

    const handleKeyDown = e => {
      console.log(e.keyCode === 13)
      if (e.keyCode === 13 && text.length > 0) {
        handleSubmit(e)
      }
    }
  
    return (
      <>
      <ChatWindow>
        {payload && payload.map(item => {
          if (item.currentUser === item.user) {
            return (
              <StyledTextItemContainer>
                <Label>{item.user}</Label>
                <TextItem>{item.text}</TextItem>
              </StyledTextItemContainer>
            )
          } else {
            return (
              <OwnTextItem>
                <Label>{item.user}</Label>
                <TextItem>{item.text}</TextItem>
              </OwnTextItem>
            );
          }

        })}
        </ChatWindow>

        <input onChange={e => handleChange(e)} value={text} onKeyDown={e => handleKeyDown(e)}></input>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Test;