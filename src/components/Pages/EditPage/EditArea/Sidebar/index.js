import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';
import { ChromePicker } from 'react-color';
import firebase from 'firebase';
import {
    uploadImageToStorage,
    showData,
    showUploadedImages,
} from '../../../../../Utils/firebase';
import * as SidebarImages from '../../../../../images/sidebarImages';
import * as SidebarIcons from '../../../../../images/icons';
import * as SidebarShapes from '../../../../../images/sidebarShapes';

const SidebarContainer = styled.div`
    display: flex;
    background-color: #3f3a3a;
    width: 330px;
`;

const SidebarItems = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    width: 50px;
    height: calc(100vh - 100px);
`;

const SidebarItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-bottom: 30px;

    :hover {
        color: white;
        cursor: pointer;
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(228deg)
            brightness(103%) contrast(101%);
    }
`;

const SidebarItemIcon = styled.img`
    width: 20px;
    margin-bottom: 3px;
`;

const SidebarItemContainer = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 80px;
    width: 280px;
    display: flex;
    flex-direction: column;
`;

// const SidebarTextContainer = styled.div`
//     width: 280px;
//     display: flex;
//     flex-direction: column;
// `;

const SidebarText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(props) => `${props.size}px`};
    background-color: rgba(255, 255, 255, 0.6);
    margin-top: 20px;
    color: white;
    width: 100%;

    :hover {
        cursor: pointer;
    }
`;

const SidebarImgsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    margin-top: 40px;
`;

const SidebarImgTitle = styled.div`
    width: 100%;
    display: flex;
    color: white;
    padding-bottom: 10px;
    border-bottom: 1px solid white;
    margin-bottom: 10px;
`;

const SidebarImg = styled.img`
    width: 100px;
`;

const SidebarUploadLabel = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 30px;
    background-color: orange;
    color: black;
    margin-top: 40px;

    :hover {
        cursor: pointer;
    }
`;

const SidebarUpload = styled.input`
    display: none;
`;

const SidebarUploadedImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BackgroundContainer = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BackgroundTitle = styled.div`
    color: white;
    font-size: 14px;
    width: 100%;
    border-bottom: 1px solid white;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const Sidebar = (props) => {
    const [activeSidebar, setActiveSidebar] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [chosenBackgroundColor, setChosenBackgroundColor] = useState({
        background: {
            r: '255',
            g: '255',
            b: '255',
            a: '1',
        },
    });
    const sidebarItems = [
        // {
        //     en: 'template',
        //     ch: '範本',
        // },
        {
            en: 'text',
            ch: '文字',
            src: SidebarIcons.textIcon,
        },
        {
            en: 'image',
            ch: '照片',
            src: SidebarIcons.pictureIcon,
        },
        {
            en: 'background',
            ch: '背景',
            src: SidebarIcons.backgroundIcon,
        },
        {
            en: 'graph',
            ch: '圖形',
            src: SidebarIcons.textIcon,
        },
        {
            en: 'upload',
            ch: '上傳',
            src: SidebarIcons.uploadIcon,
        },
    ];

    const sidebarImages = [
        {
            type: 'Dogs',
            src: [
                SidebarImages.dog001,
                SidebarImages.dog002,
                SidebarImages.dog003,
                SidebarImages.dog004,
            ],
        },
        {
            type: 'Birthday',
            src: [
                SidebarImages.birthday001,
                SidebarImages.birthday002,
                SidebarImages.birthday003,
                SidebarImages.birthday004,
            ],
        },
    ];

    const sidebarText = [
        {
            title: '雙擊編輯標題',
            size: 36,
            fontWeight: 'bold',
            content: '新增標題',
            type: 'title',
        },
        {
            title: '雙擊編輯副標題',
            size: 24,
            fontWeight: 'normal',
            content: '新增副標',
            type: 'subtitle',
        },
        {
            title: '雙擊編輯內文',
            size: 16,
            fontWeight: 'normal',
            content: 'paragraph',
        },
    ];

    const sidebarShapes = [
        { type: 'square' },
        { type: 'radiusSquare' },
        { type: 'circle' },
        { type: 'triangle' },
    ];

    const selectSidebar = (e) => {
        const selectedSidebar = e.target.dataset.type;
        setActiveSidebar(selectedSidebar);
    };

    const addImageToCanvas = (e) => {
        fabric.Image.fromURL(
            e.target.src,
            (img) => {
                const oImg = img.set({
                    top: 10,
                    left: 10,
                    scaleX: Math.max(
                        props.canvas.width / 4 / e.target.naturalWidth,
                        props.canvas.width / 4 / e.target.naturalWidth
                    ),
                    scaleY: Math.max(
                        props.canvas.width / 4 / e.target.naturalWidth,
                        props.canvas.width / 4 / e.target.naturalWidth
                    ),
                });
                props.canvas.add(oImg);
            },
            {
                crossOrigin: 'anonymous',
            }
        );
        props.canvas.requestRenderAll();
    };

    // const addRectToCanvas = () => {
    //     const rect = new fabric.Rect({
    //         top: 10,
    //         left: 10,
    //         height: 100,
    //         width: 100,
    //         fill: '#e89a4f',
    //     });
    //     props.canvas.add(rect);
    //     props.canvas.requestRenderAll();
    // };

    const addShapeToCanvas = (src) => {
        fabric.loadSVGFromURL(src, (objects, options) => {
            const newShape = fabric.util.groupSVGElements(objects, options);
            newShape.set({
                top: 10,
                left: 10,
                width: 100,
                height: 100,
                fill: '#e89a4f',
            });
            props.canvas.add(newShape);
            props.canvas.requestRenderAll();
        });
    };

    const addTextToCanvas = (e) => {
        const targetIndex = e.target.dataset.index;
        const text = new fabric.IText(sidebarText[targetIndex].title, {
            fontSize: sidebarText[targetIndex].size,
            top: 10,
            left: 10,
            underline: false,
        });

        props.canvas.add(text);
        props.canvas.requestRenderAll();
    };

    const handelUploadImageToStorage = (e) => {
        const fileList = e.target.files;
        uploadImageToStorage(fileList);
    };

    const handelBackgroundColor = (color) => {
        const colorRgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
        setChosenBackgroundColor({ background: colorRgba });
        props.canvas.backgroundColor = colorRgba;
        props.canvas.requestRenderAll();
    };

    // useEffect(() => {
    //     showUploadedImages(setUploadedImages);
    // }, []);

    useEffect(() => {
        showUploadedImages(setUploadedImages);
    }, [uploadedImages]);

    return (
        <SidebarContainer>
            <SidebarItems>
                {sidebarItems.map((item) => (
                    <SidebarItem
                        key={item.en}
                        onClick={selectSidebar}
                        data-type={item.en}
                    >
                        <SidebarItemIcon
                            src={item.src}
                            style={{ width: '20px' }}
                        />
                        {item.ch}
                    </SidebarItem>
                ))}
            </SidebarItems>
            {activeSidebar === 'image' ? (
                <SidebarItemContainer>
                    {sidebarImages.map((type) => (
                        <SidebarImgsContainer key={type.type}>
                            <SidebarImgTitle>{type.type}</SidebarImgTitle>
                            {type.src.map((img) => (
                                <SidebarImg
                                    key={img}
                                    src={img}
                                    onClick={addImageToCanvas}
                                />
                            ))}
                        </SidebarImgsContainer>
                    ))}
                </SidebarItemContainer>
            ) : activeSidebar === 'text' ? (
                <SidebarItemContainer>
                    {sidebarText.map((text, index) => (
                        <SidebarText
                            size={text.size}
                            key={text.size}
                            data-index={index}
                            onClick={addTextToCanvas}
                        >
                            {text.title}
                        </SidebarText>
                    ))}
                </SidebarItemContainer>
            ) : activeSidebar === 'background' ? (
                <SidebarItemContainer>
                    <BackgroundContainer>
                        <BackgroundTitle>背景顏色</BackgroundTitle>
                        <ChromePicker
                            color={chosenBackgroundColor.background}
                            onChange={handelBackgroundColor}
                        ></ChromePicker>
                    </BackgroundContainer>
                </SidebarItemContainer>
            ) : activeSidebar === 'graph' ? (
                <SidebarItemContainer>
                    <BackgroundContainer>
                        <BackgroundTitle>圖形</BackgroundTitle>
                        <div>
                            {sidebarShapes.map((shape) => (
                                <img
                                    key={shape.type}
                                    src={SidebarShapes[shape.type]}
                                    onClick={(e) => {
                                        addShapeToCanvas(e.target.src);
                                    }}
                                />
                            ))}
                        </div>
                    </BackgroundContainer>
                </SidebarItemContainer>
            ) : activeSidebar === 'upload' ? (
                <SidebarItemContainer>
                    <SidebarUploadLabel>
                        上傳圖片
                        <SidebarUpload
                            type="file"
                            onChange={handelUploadImageToStorage}
                        ></SidebarUpload>
                    </SidebarUploadLabel>
                    <SidebarUploadedImagesContainer>
                        {uploadedImages.length > 0
                            ? uploadedImages.map((img) => (
                                  <img
                                      key={img.src}
                                      src={img.src}
                                      onClick={addImageToCanvas}
                                      style={{
                                          width: '200px',
                                          margin: '10px auto 0',
                                      }}
                                  ></img>
                              ))
                            : null}
                    </SidebarUploadedImagesContainer>
                </SidebarItemContainer>
            ) : null}
        </SidebarContainer>
    );
};

export default Sidebar;
