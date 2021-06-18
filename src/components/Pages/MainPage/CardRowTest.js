import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
    navToEditCard,
    deleteCard,
    navToPreviewCard,
    mapDataForExplore,
    mapExampleDataForExplore,
} from '../../../Utils/firebase';
import { cards, recCards, viewIcon, deleteIcon } from '../../../images/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/swiper.min.css';
import './Swiper.css';
import useWindowSize from '../../../Hooks/useWindowSize';
import { mainLoading } from '../../../images/loading';

import SwiperCore, {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard,
} from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

const swiperStyle = {
    marginTop: '20px',
    width: '100%',
    height: '330px',
    borderRadius: '8px',
    padding: '20px 24px',
    backgroundColor: '#f3f3f3',
    boxShadow: 'inset 0 0 5px #898989',
};

const RowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    /* margin-top: 20px; */
    margin-right: 2%;
    position: relative;
`;

const RowTitle = styled.div`
    margin-top: 40px;
    display: flex;
    font-size: 24px;
    color: #172f2f;
`;

const RowTitleIcon = styled.img`
    width: 40px;
    margin-right: 10px;
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
`;

const CardDetailsBoardBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 28px;
    width: 80px;
    :hover {
        background-color: #f0eefe;
    }
`;

const WhiteBtn = styled.img`
    width: 16px;
`;

const CardImg = styled.img`
    width: 158px;
    height: 238px;
    border: 1px solid #e3e3e3;
    border-radius: 4px;

    :hover {
        cursor: pointer;
    }
`;

const CardName = styled.div`
    font-size: 16px;
    margin-top: 10px;
    color: #292522;
    text-shadow: 0 1.4px 1px #fff;
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

const CardsRow = (props) => {
    const history = useHistory();
    const size = useWindowSize();
    // const scrollRef = useRef([]);
    const [imgArr, setImgArr] = useState([]);
    const [sampleImgArr, setSampleImgArr] = useState([]);
    const [onHover, setOnHover] = useState(false);
    const [onHoverCard, setOnHoverCard] = useState('');
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(null);

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
    }, []);

    useEffect(() => {
        if (size.width >= 1000) {
            setSlidesPerView(4);
            console.log('more');
        } else if (size.width >= 700) {
            setSlidesPerView(2);
            console.log('less');
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

    return (
        <>
            <RowContainer>
                <RowTitle>
                    <RowTitleIcon
                        src={props.type === 'myCard' ? cards : recCards}
                    />
                    {props.type === 'myCard' ? '我的卡片' : '為您推薦'}
                </RowTitle>

                {/* <SwiperSlide>1</SwiperSlide>
                    <SwiperSlide>2</SwiperSlide>
                    <SwiperSlide>3</SwiperSlide> */}
                {props.type === 'myCard' && JSON.stringify(imgArr) !== '[]' ? (
                    <Swiper
                        slidesPerView={slidesPerView}
                        spaceBetween={30}
                        style={swiperStyle}
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
                                            }}
                                        >
                                            . . .
                                        </CardDetails>
                                    ) : null}
                                    {onHover &&
                                    onHoverCard === img.basicSetting.id &&
                                    showCardDetails ? (
                                        <CardDetailsBoard>
                                            <CardDetailsBoardBtn>
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
                        spaceBetween={30}
                        style={swiperStyle}
                        navigation={true}
                        mousewheel={true}
                        pagination={true}
                        // rebuildOnUpdate={true}
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
                                            <CardDetailsBoardBtn>
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
