import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllSnapshots } from "../../../Utils/firebase";
import Header from "../../Header";

const Body = styled.div`
  margin-top: 80px;
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: gray;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
  position: relative;

  @media (max-width: 768px) {
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
`;

const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${(props) =>
    props.cardOpend ? "translate(0, -50%)" : "translate(-50%, -50%)"};
  width: 400px;
  height: 600px;
  background-image: ${(props) => `url('${props.snapshot}')`};
  background-size: cover;
  background-position: center;
  perspective: 3000px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  z-index: 5;
  background-color: #fff;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 960px) {
    width: 360px;
    height: 540px;
  }

  @media (max-width: 768px) {
    width: 240px;
    height: 360px;
  }

  @media (max-width: 540px) {
    width: 168px;
    height: 252px;
  }
`;

const Cover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: left;
  transform-style: preserve-3d;
  transition: all 0.5s;
  transform: ${(props) =>
    props.cardOpend ? "rotateY(-150deg)" : "rotateY(0deg)"};
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const LeftContent = styled(Content)`
  background-image: ${(props) => `url('${props.snapshot}')`};
  background-size: cover;
  background-position: center;
`;

const RightContent = styled(Content)`
  transform: rotateY(180deg);
  background-image: ${(props) => `url('${props.snapshot}')`};
  background-size: cover;
  background-position: center;
  transition: all 0.5s;
  box-shadow: ${(props) =>
    props.cardOpend ? "5px 5px 10px rgba(0, 0, 0, 0.2)" : "none"};
`;

const ShowPage = (props) => {
  const [cardId, setCardId] = useState("");
  const [cardOpend, setCardOpened] = useState(false);
  const [coverSnapshot, setCoverSnapshot] = useState("");
  const [leftInnerSnapshot, setLeftInnerSnapshot] = useState("");
  const [rightInnerSnapshot, setRightInnerSnapshot] = useState("");

  const handleCardOpened = () => {
    setCardOpened(!cardOpend);
  };

  useEffect(() => {
    setCardId(props.match.params.cardId);
  }, [props]);

  useEffect(() => {
    if (cardId !== "") {
      getAllSnapshots(
        cardId,
        setCoverSnapshot,
        setLeftInnerSnapshot,
        setRightInnerSnapshot
      );
    }
  }, [cardId]);

  return (
    <>
      <Header
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        type="show"
        {...props}
      />
      <Body>
        <Card
          cardOpend={cardOpend}
          onClick={handleCardOpened}
          snapshot={rightInnerSnapshot}
        >
          <Cover cardOpend={cardOpend}>
            <RightContent
              snapshot={leftInnerSnapshot}
              cardOpend={cardOpend}
            ></RightContent>
            <LeftContent
              snapshot={coverSnapshot}
              cardOpend={cardOpend}
            ></LeftContent>
          </Cover>
        </Card>
      </Body>
    </>
  );
};

export default ShowPage;
