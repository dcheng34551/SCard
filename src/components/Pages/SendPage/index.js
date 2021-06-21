import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Profile from "../../Profile";
import Header from "../../Header";
import SendForm from "./SendForm";

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

const MainSendingArea = styled.div`
  display: flex;
  box-shadow: inset 0 0 15px #b6b6b6;
  width: calc(100% - 300px);
  height: calc(100vh - 80px);
  margin-top: 80px;
  margin-left: 300px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 60px;
    margin-left: 0;
  }
`;

const SendPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (props.currentUser && props.currentUser.email === "noUser") {
      history.push("/");
    }
  }, [props.currentUser, history]);

  return (
    <>
      <Header
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        type="send"
        {...props}
      />
      <MainContainer>
        <Profile
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
          {...props}
        />
        <MainSendingArea>
          <SendForm
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
            {...props}
          />
        </MainSendingArea>
      </MainContainer>
    </>
  );
};

export default SendPage;
