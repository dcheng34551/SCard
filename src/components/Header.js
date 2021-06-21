import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { nativeLogout, createNewCard } from "../Utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { logo } from "../images";
import { getCardUser, navToEditCard, navToSendCard } from "../Utils/firebase";
import { backIcon, mailIcon } from "../images/icons";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  z-index: 2;
  background-color: #e1dad4;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const LogoAnchor = styled.a`
  width: 110px;
  margin-left: 30px;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Logo = styled.img`
  width: 100%;
`;

const CreateNewCardBtn = styled.div`
  width: 110px;
  height: 30px;
  border-radius: 5px;
  margin-right: 24px;
  margin-left: auto;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #172f2f;
  background-color: white;
  box-shadow: 0 0 2px #172f2f;
  :hover {
    cursor: pointer;
    background-color: #996633;
    color: white;
    border-color: #996633;
  }

  @media (max-width: 768px) {
    height: 24px;
    width: 90px;
    font-size: 14px;
  }
`;

const Logout = styled.div`
  width: 60px;
  height: 30px;
  border: 1px solid #172f2f;
  border-radius: 5px;
  margin-right: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #172f2f;
  :hover {
    cursor: pointer;
    background-color: #996633;
    border-color: #996633;
  }

  @media (max-width: 768px) {
    height: 24px;
    width: 50px;
    font-size: 14px;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 30px;
`;

const EditBtn = styled.button`
  height: 24px;
  width: 90px;
  background-color: #172f2f;
  border: none;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 20px;
  line-height: 0.9;
  font-size: 14px;
  :hover {
    cursor: pointer;
    background-color: #996633;
    border: 1px solid #996633;
  }
`;

const SendBtn = styled.button`
  height: 24px;
  width: 60px;
  background-color: #172f2f;
  border: none;
  border-radius: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  line-height: 0.9;
  font-size: 14px;
  :hover {
    cursor: pointer;
    background-color: #996633;
    border: 1px solid #996633;
  }
`;

const WhiteBtn = styled.img`
  width: 16px;
  filter: invert(100%) sepia(0%) saturate(100%) hue-rotate(100deg)
    brightness(100%) contrast(100%);
`;

const Header = (props) => {
  const [cardId, setCardId] = useState("");
  const [cardAuthor, setCardAuthor] = useState("");

  useEffect(() => {
    if (props.match.params.cardId) {
      setCardId(props.match.params.cardId);
      getCardUser(props.match.params.cardId, setCardAuthor);
    }
  }, [props]);

  const handleCreateNewCard = () => {
    const cardDetails = {
      id: uuidv4(),
    };
    createNewCard(cardDetails, props.currentUser.email);
  };

  const handleLogout = () => {
    nativeLogout();
    props.setCurrentUser({ email: "noUser" });
  };

  const handleNavToEditCard = () => {
    navToEditCard(cardId);
  };

  const handleNavToSendCard = () => {
    navToSendCard(props.currentUser.email);
  };
  return (
    <Nav
      style={
        props.type === "landing"
          ? { backgroundColor: "rgba(255, 255, 255, 0.9)" }
          : null
      }
    >
      <LogoAnchor href={`/main/${props.currentUser.email}`}>
        <Logo src={logo} className="test" />
      </LogoAnchor>
      {props.type === "main" ? (
        <>
          <CreateNewCardBtn onClick={handleCreateNewCard}>
            + 新增卡片
          </CreateNewCardBtn>
          <Logout onClick={handleLogout}>登出</Logout>
        </>
      ) : props.type === "send" ? (
        <>
          <CreateNewCardBtn onClick={handleCreateNewCard}>
            + 新增卡片
          </CreateNewCardBtn>
          <Logout onClick={handleLogout}>登出</Logout>
        </>
      ) : props.type === "show" ? (
        <ActionContainer>
          {cardAuthor === props.currentUser.email ? (
            <>
              <EditBtn onClick={handleNavToEditCard}>
                <WhiteBtn src={backIcon} />
                繼續編輯
              </EditBtn>
              <SendBtn onClick={handleNavToSendCard}>
                <WhiteBtn src={mailIcon} />
                寄信
              </SendBtn>
            </>
          ) : null}
        </ActionContainer>
      ) : null}
    </Nav>
  );
};

export default Header;
