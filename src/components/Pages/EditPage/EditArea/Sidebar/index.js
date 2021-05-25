import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';
import firebase from 'firebase';
import {
    uploadImageToStorage,
    showData,
    showUploadedImages,
} from '../../../../../Utils/firebase';
import * as SidebarImages from '../../../../../images/sidebarImages';

//firebase part
// import { firebaseConfig } from '../../../../../Utils/firebaseConfig';

// firebase.initializeApp(firebaseConfig);

const SidebarContainer = styled.div`
    display: flex;
    background-color: #3f3a3a;
    width: 330px;
`;

const SidebarItems = styled.div`
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 100vh;
`;

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;

    :hover {
        color: white;
        cursor: pointer;
    }
`;

const SidebarItemContainer = styled.div`
    margin-left: 20px;
    margin-right: 20px;
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
`;

const SidebarImgTitle = styled.div`
    width: 100%;
    display: flex;
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

const Sidebar = (props) => {
    const [activeSidebar, setActiveSidebar] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const sidebarItems = [
        {
            en: 'template',
            ch: '範本',
        },
        {
            en: 'text',
            ch: '文字',
        },
        {
            en: 'image',
            ch: '照片',
        },
        {
            en: 'upload',
            ch: '上傳',
        },
    ];

    const sidebarImages = [
        {
            type: 'dogs',
            src: [
                SidebarImages.dog001,
                SidebarImages.dog002,
                SidebarImages.dog003,
                SidebarImages.dog004,
            ],
        },
        {
            type: 'cats',
            src: [
                SidebarImages.dog001,
                SidebarImages.dog002,
                SidebarImages.dog003,
                SidebarImages.dog004,
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

    const selectSidebar = (e) => {
        const selectedSidebar = e.target.dataset.type;
        setActiveSidebar(selectedSidebar);
    };

    const addImageToCanvas = (e) => {
        fabric.Image.fromURL(e.target.src, (img) => {
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
        });
        props.canvas.requestRenderAll();
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

    useEffect(() => {
        showUploadedImages(setUploadedImages);
    }, []);

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
                        container
                        {uploadedImages.length > 0
                            ? uploadedImages.map((img) => (
                                  <img
                                      key={img.src}
                                      src={img.src}
                                      onClick={addImageToCanvas}
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
