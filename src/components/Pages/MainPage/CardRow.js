import React, { useState, useEffect } from 'react';
import useWindowSize from '../../../Hooks/useWindowSize';
import {
    navToEditCard,
    deleteCard,
    mapDataForExplore,
    mapExampleDataForExplore,
    getAllSnapshots,
} from '../../../Utils/firebase';
import { mainLoading } from '../../../images/loading';
import { cards, recCards, viewIcon, deleteIcon } from '../../../images/icons';
import styled from 'styled-components';
import Modal from 'react-modal';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/swiper.min.css';
import './Swiper.css';
import SwiperCore, {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard,
} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

const swiperStyle = {
    marginTop: '20px',
    width: 'calc(100% - 48px)',
    height: '330px',
    borderRadius: '8px',
    padding: '20px 24px',
    backgroundColor: '#f3f3f3',
    boxShadow: 'inset 0 0 5px #898989',
};

const smallSwiperStyle = {
    marginTop: '20px',
    width: 'calc(100% - 48px)',
    height: '290px',
    borderRadius: '8px',
    padding: '20px 24px',
    backgroundColor: '#f3f3f3',
    boxShadow: 'inset 0 0 5px #898989',
};

const RowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    position: relative;
`;

const RowTitle = styled.div`
    margin-top: 40px;
    display: flex;
    font-size: 24px;
    color: #172f2f;

    @media (max-width: 768px) {
        margin-top: 20px;
        font-size: 20px;
    }
`;

const RowTitleIcon = styled.img`
    width: 40px;
    margin-right: 10px;

    @media (max-width: 768px) {
        width: 32px;
    }
`;

const CardContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 200px;
    height: 310px;
    border-radius: 8px;
    border: 1px solid white;
    background-color: #cdc0b6;
    :hover {
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 768px) {
        max-width: 160px;
        min-width: 160px;
        height: 260px;
    }
`;

const CardDetails = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    line-height: 1.2;
    top: 12px;
    right: 12px;
    width: 40px;
    height: 30px;
    border-radius: 6px;
    background-color: #172f2f;
    color: white;
    font-size: 16px;

    :hover {
        opacity: 0.95;
        box-shadow: 0 0 5px #172f2f;
    }

    @media (max-width: 768px) {
        top: 8px;
        right: 8px;
        width: 36px;
        height: 28px;
        line-height: 1;
    }
`;

const CardDetailsBoard = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;
    top: 50px;
    right: 12px;
    width: 80px;
    height: 60px;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    background-color: white;
    color: black;

    @media (max-width: 768px) {
        top: 44px;
        right: 8px;
        line-height: 1;
        width: 68px;
    }
`;

const CardDetailsBoardBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 28px;
    width: 100%;
    font-size: 16px;
    :hover {
        background-color: #f0eefe;
    }

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const WhiteBtn = styled.img`
    width: 16px;

    @media (max-width: 768px) {
        width: 14px;
    }
`;

const CardImg = styled.img`
    width: 158px;
    height: 238px;
    border: 1px solid #e3e3e3;
    border-radius: 4px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 138px;
        height: 208px;
    }
`;

const CardName = styled.div`
    font-size: 16px;
    margin-top: 10px;
    color: #292522;
    text-shadow: 0 1.4px 1px #fff;

    @media (max-width: 768px) {
        margin-top: 8px;
        font-size: 14px;
    }
`;

const LoadingRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 370px;
`;

const LoadingImg = styled.img`
    width: 80px;
`;

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#172a2a',
        height: '400px',
        width: '600px',
        zIndex: 10,
        borderRadius: '8px',
    },
};

const customSmallStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: '360px',
        width: '340px',
        zIndex: 10,
        borderRadius: '8px',
    },
};

// preview card
const PreviewAreaEmtpyWarning = styled.div`
    font-size: 18px;
    color: #172f2f;
`;

// 卡片預覽
const Card = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${(props) =>
        props.cardOpend ? 'translate(0, -50%)' : 'translate(-50%, -50%)'};
    width: 180px;
    height: 270px;
    background-image: ${(props) => `url('${props.snapshot}')`};
    background-size: cover;
    background-position: center;
    perspective: 3000px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
    background-color: #fff;
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
    background-color: '#fff';
    transform: ${(props) =>
        props.cardOpend ? 'rotateY(-150deg)' : 'rotateY(0deg)'};
`;

const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: '#fff';
`;

const LeftContent = styled(Content)`
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

const ModalCloseBtn = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    /* background-color: '#e1dad4'; */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    line-height: 1.3;

    :hover {
        cursor: pointer;
    }
`;

const CardsRow = (props) => {
    const size = useWindowSize();
    const [imgArr, setImgArr] = useState([]);
    const [sampleImgArr, setSampleImgArr] = useState([]);
    const [onHover, setOnHover] = useState(false);
    const [onHoverCard, setOnHoverCard] = useState('');
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        props.setCurrentUser({ email: props.match.params.id });

        if (props.type === 'myCard') {
            mapDataForExplore(props.match.params.id).then((card) => {
                setImgArr(card);
            });
        } else {
            mapExampleDataForExplore().then((card) => {
                setSampleImgArr(card);
            });
        }
    }, [props]);

    useEffect(() => {
        if (size.width >= 1500) {
            setSlidesPerView(4);
        } else if (size.width >= 1000) {
            setSlidesPerView(3);
        } else if (size.width >= 768) {
            setSlidesPerView(1);
        } else if (size.width >= 540) {
            setSlidesPerView(2);
        } else {
            setSlidesPerView(1);
        }
    }, [size]);

    const handleDeleteCard = (cardId) => {
        deleteCard(props.currentUser.email, cardId, () => {
            mapDataForExplore(props.match.params.id).then((card) => {
                setImgArr(card);
            });
        });
    };

    const handleEditExistCard = (e) => {
        navToEditCard(e.target.dataset.id);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const afterOpenModal = () => {
        console.log('do something');
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // preview card
    const [cardId, setCardId] = useState('');
    const [cardOpend, setCardOpened] = useState(false);
    const [coverSnapshot, setCoverSnapshot] = useState('');
    const [leftInnerSnapshot, setLeftInnerSnapshot] = useState('');
    const [rightInnerSnapshot, setRightInnerSnapshot] = useState('');

    const handleCardOpened = () => {
        setCardOpened(!cardOpend);
    };

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
        <>
            <RowContainer>
                <RowTitle>
                    <RowTitleIcon
                        src={props.type === 'myCard' ? cards : recCards}
                    />
                    {props.type === 'myCard' ? '我的卡片' : '為您推薦'}
                </RowTitle>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={size.width >= 768 ? customStyles : customSmallStyles}
                    contentLabel="Example Modal"
                >
                    {cardId !== '' ? (
                        <>
                            <ModalCloseBtn
                                onClick={closeModal}
                                style={{
                                    backgroundColor: '#e1dad4',
                                }}
                            >
                                x
                            </ModalCloseBtn>
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
                        </>
                    ) : (
                        <PreviewAreaEmtpyWarning>
                            請先選擇卡片
                        </PreviewAreaEmtpyWarning>
                    )}
                </Modal>
                {props.type === 'myCard' && JSON.stringify(imgArr) !== '[]' ? (
                    <Swiper
                        slidesPerView={slidesPerView}
                        spaceBetween={size.width >= 768 ? 30 : 20}
                        style={
                            size.width >= 768 ? swiperStyle : smallSwiperStyle
                        }
                        navigation={true}
                        mousewheel={true}
                        pagination={true}
                        // rebuildOnUpdate={true}
                    >
                        {imgArr.map((img) => (
                            <SwiperSlide
                                style={{
                                    minWidth: '200px',
                                    maxWidth: '200px',
                                }}
                            >
                                <CardContainer
                                    data-id={img.basicSetting.id}
                                    id={img.basicSetting.id}
                                    key={img.basicSetting.id}
                                    onMouseOver={(e) => {
                                        e.stopPropagation();
                                        setOnHover(true);
                                        setOnHoverCard(img.basicSetting.id);
                                    }}
                                    onMouseLeave={() => {
                                        setOnHover(false);
                                        setOnHoverCard('');
                                        setShowCardDetails(false);
                                    }}
                                    // onClick={handleEditExistCard}
                                >
                                    {onHover &&
                                    onHoverCard === img.basicSetting.id ? (
                                        <CardDetails
                                            onClick={() => {
                                                setShowCardDetails(
                                                    !showCardDetails
                                                );
                                                setCardId(img.basicSetting.id);
                                            }}
                                        >
                                            . . .
                                        </CardDetails>
                                    ) : null}
                                    {onHover &&
                                    onHoverCard === img.basicSetting.id &&
                                    showCardDetails ? (
                                        <CardDetailsBoard>
                                            <CardDetailsBoardBtn
                                                onClick={openModal}
                                            >
                                                <WhiteBtn src={viewIcon} />
                                                預覽
                                            </CardDetailsBoardBtn>
                                            <CardDetailsBoardBtn
                                                onClick={() => {
                                                    handleDeleteCard(
                                                        onHoverCard
                                                    );
                                                }}
                                            >
                                                <WhiteBtn src={deleteIcon} />
                                                刪除
                                            </CardDetailsBoardBtn>
                                        </CardDetailsBoard>
                                    ) : null}

                                    <CardImg
                                        data-id={img.basicSetting.id}
                                        key={img.snapshot}
                                        src={
                                            img.snapshot
                                                ? img.snapshot
                                                : img.default
                                        }
                                        onClick={handleEditExistCard}
                                    ></CardImg>
                                    <CardName>{img.cardName}</CardName>
                                </CardContainer>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : props.type === 'recCard' &&
                  JSON.stringify(sampleImgArr) !== '[]' ? (
                    <Swiper
                        slidesPerView={slidesPerView}
                        spaceBetween={size.width >= 768 ? 30 : 20}
                        style={
                            size.width >= 768 ? swiperStyle : smallSwiperStyle
                        }
                        navigation={true}
                        mousewheel={true}
                        pagination={true}
                    >
                        {sampleImgArr.map((img) => (
                            <SwiperSlide
                                style={{
                                    minWidth: '200px',
                                    maxWidth: '200px',
                                }}
                            >
                                <CardContainer
                                    data-id={img.basicSetting.id}
                                    id={img.basicSetting.id}
                                    key={img.basicSetting.id}
                                    onMouseOver={(e) => {
                                        e.stopPropagation();
                                        setOnHover(true);
                                        setOnHoverCard(img.basicSetting.id);
                                    }}
                                    onMouseLeave={() => {
                                        setOnHover(false);
                                        setOnHoverCard('');
                                        setShowCardDetails(false);
                                    }}
                                    // onClick={handleEditExistCard}
                                >
                                    {onHover &&
                                    onHoverCard === img.basicSetting.id ? (
                                        <CardDetails
                                            onClick={() => {
                                                setShowCardDetails(
                                                    !showCardDetails
                                                );
                                                setCardId(img.basicSetting.id);
                                            }}
                                        >
                                            . . .
                                        </CardDetails>
                                    ) : null}
                                    {onHover &&
                                    onHoverCard === img.basicSetting.id &&
                                    showCardDetails ? (
                                        <CardDetailsBoard
                                            style={{ height: '30px' }}
                                        >
                                            <CardDetailsBoardBtn
                                                onClick={openModal}
                                            >
                                                <WhiteBtn src={viewIcon} />
                                                預覽
                                            </CardDetailsBoardBtn>
                                        </CardDetailsBoard>
                                    ) : null}

                                    <CardImg
                                        data-id={img.basicSetting.id}
                                        key={img.snapshot}
                                        src={
                                            img.snapshot
                                                ? img.snapshot
                                                : img.default
                                        }
                                        onClick={handleEditExistCard}
                                    ></CardImg>
                                    <CardName>{img.cardName}</CardName>
                                </CardContainer>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <LoadingRow>
                        <LoadingImg src={mainLoading} />
                    </LoadingRow>
                )}
            </RowContainer>
        </>
    );
};

export default CardsRow;
