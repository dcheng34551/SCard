import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { paperAirplane } from '../../../images/icons';
import {
    sendMail,
    getAllSnapshots,
    mapDataForOptions,
} from '../../../Utils/firebase';

const MainSendingForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 620px;
    background-color: #f3f3f3;
    border-radius: 5px;
    box-shadow: inset 0 0 5px #898989;
    align-items: center;
`;

const MainSendingFormTitleContainer = styled.div`
    width: 100%;
    color: #fff;
    background-color: #172f2f;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MainSendingFormTitle = styled.div`
    width: 80%;
    font-size: 20px;
    color: #fff;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    margin-top: 10px;
`;

const MainSendingFormLabel = styled.label`
    font-size: 18px;
    margin-right: 20px;
    width: 80px;
`;

const MainSendingCardSelect = styled.select`
    width: 30%;
    height: 30px;
    text-indent: 20px;
    font-size: 18px;
`;

const MainSendingFormInput = styled.input`
    width: 70%;
    height: 30px;
    border: 1px solid rgba(100, 100, 100, 0.6);
    text-indent: 20px;
    font-size: 18px;
    color: black;
    border-radius: 5px;
`;

const PreviewContainer = styled.div`
    display: flex;
    width: 80%;
    margin-top: 10px;
`;

const PreviewTitle = styled.div`
    font-size: 18px;
    margin-right: 20px;
    width: 80px;
`;

const PreviewArea = styled.div`
    width: 70%;
    height: 300px;
    border: 1px solid rgba(100, 100, 100, 0.6);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: gray;
`;

const PreviewAreaEmtpyWarning = styled.div`
    font-size: 18px;
    color: #172f2f;
`;

const Card = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${(props) =>
        props.cardOpend ? 'translate(0, -50%)' : 'translate(-50%, -50%)'};
    width: 180px;
    height: 270px;
    /* background-image: url('https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80'); */
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
    perspective: 3000px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
`;

const Cover = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    /* box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3); */
    transform: rotateY(0);
    transform-origin: left;
    transform-style: preserve-3d;
    transition: 0.5s;
    transform: ${(props) =>
        props.cardOpend ? 'rotateY(-150deg)' : 'rotateY(0deg)'};
`;

const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const LeftContent = styled(Content)`
    /* background-image: url('https://images.unsplash.com/photo-1554568218-0f1715e72254?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'); */
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
`;

const RightContent = styled(Content)`
    background-color: white;
    transform: rotateY(180deg);
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
`;

const SubmitBtn = styled.input`
    margin-top: 10px;
    font-size: 20px;
    width: 80%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #172f2f;
    color: white;
    :hover {
        cursor: pointer;
        background-color: #996633;
    }
`;

const SendForm = (props) => {
    const [selectedCard, setSelectedCard] = useState('');
    const [email, setEmail] = useState('dcheng123331@gmail.com');
    const [recipient, setRecipient] = useState('收件的京岱');
    const [sender, setSender] = useState('寄件的京岱');
    const [options, setOptions] = useState([]);

    const handleSendMail = (e) => {
        e.preventDefault();
        sendMail(
            `https://scard-45610.web.app/show/${selectedCard}`,
            email,
            recipient,
            sender
        );
        setEmail('');
        setRecipient('');
        setSender('');
    };

    useEffect(() => {
        props.setCurrentUser({ email: props.match.params.id });

        mapDataForOptions(props.match.params.id).then((option) => {
            setOptions(option);
        });
    }, [props]);

    useEffect(() => {
        if (options.length > 0) {
            setSelectedCard(options[0].basicSetting.id);
        }
    }, [options]);

    const [cardId, setCardId] = useState('');
    const [cardOpend, setCardOpened] = useState(false);
    const [coverSnapshot, setCoverSnapshot] = useState('');
    const [leftInnerSnapshot, setLeftInnerSnapshot] = useState('');
    const [rightInnerSnapshot, setRightInnerSnapshot] = useState('');

    const handleCardOpened = () => {
        setCardOpened(!cardOpend);
    };

    useEffect(() => {
        setCardId(selectedCard);
    }, [selectedCard]);

    useEffect(() => {
        if (cardId !== '') {
            getAllSnapshots(
                cardId,
                setCoverSnapshot,
                setLeftInnerSnapshot,
                setRightInnerSnapshot
            );
        }
    }, [cardId]);

    return (
        <MainSendingForm onSubmit={handleSendMail}>
            <MainSendingFormTitleContainer>
                <MainSendingFormTitle>
                    {/* <img
                        src={paperAirplane}
                        style={{ width: '24px', marginRight: '12px' }}
                        alt="paper-airplane"
                    /> */}
                    我要寄信
                </MainSendingFormTitle>
            </MainSendingFormTitleContainer>
            <InputContainer>
                <MainSendingFormLabel htmlFor="select">
                    選擇卡片:
                </MainSendingFormLabel>
                <MainSendingCardSelect
                    id="select"
                    onChange={(e) => {
                        setSelectedCard(e.target.value);
                    }}
                    value={selectedCard}
                >
                    {options.map((option) => (
                        <option
                            value={option.basicSetting.id}
                            key={option.basicSetting.id}
                        >
                            {option.cardName
                                ? option.cardName
                                : option.basicSetting.id}
                        </option>
                    ))}
                </MainSendingCardSelect>
            </InputContainer>
            <InputContainer>
                <MainSendingFormLabel htmlFor="email">
                    郵箱地址:
                </MainSendingFormLabel>
                <MainSendingFormInput
                    placeholder="someone@email.com"
                    id="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                ></MainSendingFormInput>
            </InputContainer>
            <InputContainer>
                <MainSendingFormLabel htmlFor="recipient">
                    收件人:
                </MainSendingFormLabel>
                <MainSendingFormInput
                    placeholder="收件人稱呼"
                    id="recipient"
                    onChange={(e) => {
                        setRecipient(e.target.value);
                    }}
                    value={recipient}
                ></MainSendingFormInput>
            </InputContainer>
            <InputContainer>
                <MainSendingFormLabel htmlFor="sender">
                    寄件人:
                </MainSendingFormLabel>
                <MainSendingFormInput
                    placeholder="寄件人稱呼"
                    id="sender"
                    onChange={(e) => {
                        setSender(e.target.value);
                    }}
                    value={sender}
                ></MainSendingFormInput>
            </InputContainer>
            <PreviewContainer>
                <PreviewTitle>卡片預覽:</PreviewTitle>
                <PreviewArea>
                    {selectedCard !== '' ? (
                        <Card
                            cardOpend={cardOpend}
                            onClick={handleCardOpened}
                            snapshot={rightInnerSnapshot}
                        >
                            <Cover cardOpend={cardOpend}>
                                <RightContent
                                    snapshot={leftInnerSnapshot}
                                ></RightContent>
                                <LeftContent
                                    snapshot={coverSnapshot}
                                ></LeftContent>
                            </Cover>
                        </Card>
                    ) : (
                        <PreviewAreaEmtpyWarning>
                            請先選擇卡片
                        </PreviewAreaEmtpyWarning>
                    )}
                </PreviewArea>
            </PreviewContainer>
            <SubmitBtn type="submit" value="確認寄出"></SubmitBtn>
        </MainSendingForm>
    );
};

export default SendForm;
