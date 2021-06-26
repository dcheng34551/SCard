import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { ChromePicker } from "react-color";
// import firebase from 'firebase';
import {
  uploadImageToStorage,
  showUploadedImages,
  deleteUploadedImage,
} from "../../../../../Utils/firebase";
import * as SidebarImages from "../../../../../images/sidebarImages";
import * as SidebarIcons from "../../../../../images/icons";
import * as SidebarShapes from "../../../../../images/sidebarShapes";

const SidebarContainer = styled.div`
  display: flex;
  background-color: #8bcac8;
`;

const SidebarItems = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  width: 60px;
  height: calc(100vh - 100px);
`;

const SidebarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 80px;
  /* margin-bottom: 30px; */
  background-color: #8bcac8;

  :hover {
    cursor: pointer;
  }
`;

const ActiveSidebarItem = styled(SidebarItem)`
  color: white;
  background-color: #3f3a3a;
`;

const SidebarItemIcon = styled.img`
  width: 20px;
  margin-bottom: 3px;
`;

const ActiveSidebarItemIcon = styled(SidebarItemIcon)`
  filter: invert(100%) sepia(0%) saturate(100%) hue-rotate(100deg)
    brightness(100%) contrast(100%);
`;

const SidebarItemContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 80px;
  width: 280px;
  display: flex;
  flex-direction: column;
  background-color: #3f3a3a;
  height: calc(100vh - 80px);
  overflow-y: auto;
`;

const SidebarText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: ${(props) => `${props.size}px`};
  background-color: rgba(255, 255, 255, 0.6);
  margin-top: 20px;
  color: black;
  width: 100%;

  :hover {
    cursor: pointer;
  }
`;

const SidebarImgsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 20px;
  margin-top: 20px;
`;

const SidebarImgTitle = styled.div`
  width: 100%;
  display: flex;
  color: white;
  font-size: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
`;

const SidebarImg = styled.img`
  width: 100px;
  border: 1px solid white;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;

const SidebarShape = styled.img`
  width: 100px;
  margin-left: 25px;
  :hover {
    cursor: pointer;
  }
`;

const SidebarUploadLabel = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 30px;
  background-color: #f1c394;
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
  align-items: center;
  /* overflow-y: auto; */
`;

const BackgroundContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundTitle = styled.div`
  color: white;
  font-size: 16px;
  width: 100%;
  border-bottom: 1px solid white;
  padding-left: 4px;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const UploadedImageContainer = styled.div`
  width: 200px;
  position: relative;
`;

const UploadedImage = styled.img`
  width: 198px;
  margin: 10px auto 10px;
  border: 1px solid white;

  :hover {
    cursor: pointer;
  }
`;

const DeleteUploadedImageBtn = styled.div`
  display: flex;
  justify-content: center;
  line-height: 1;
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 50%;
  border: 1px solid white;
  background-color: #3f3a3a;
  position: absolute;
  top: 8px;
  right: -2px;

  :hover {
    background-color: #cc9966;
    cursor: pointer;
  }
`;

const Sidebar = (props) => {
  const [activeSidebar, setActiveSidebar] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [chosenBackgroundColor, setChosenBackgroundColor] = useState({
    background: {
      r: "255",
      g: "255",
      b: "255",
      a: "1",
    },
  });
  const sidebarItems = [
    // {
    //     en: 'template',
    //     ch: '範本',
    // },
    {
      en: "text",
      ch: "文字",
      src: SidebarIcons.textIcon,
    },
    {
      en: "image",
      ch: "照片",
      src: SidebarIcons.pictureIcon,
    },
    {
      en: "background",
      ch: "背景",
      src: SidebarIcons.backgroundIcon,
    },
    {
      en: "graph",
      ch: "圖形",
      src: SidebarIcons.shapeIcon,
    },
    {
      en: "upload",
      ch: "上傳",
      src: SidebarIcons.uploadIcon,
    },
  ];

  const sidebarImages = [
    {
      type: "動物",
      typeEn: "Dogs",
      src: [
        SidebarImages.dog001,
        SidebarImages.dog002,
        SidebarImages.dog003,
        SidebarImages.dog004,
      ],
    },
    {
      type: "生日",
      typeEn: "Birthday",
      src: [
        SidebarImages.birthday001,
        SidebarImages.birthday002,
        SidebarImages.birthday003,
        SidebarImages.birthday004,
      ],
    },
    {
      type: "程式",
      typeEn: "Code",
      src: [
        SidebarImages.code001,
        SidebarImages.code002,
        SidebarImages.code003,
        SidebarImages.code004,
      ],
    },
  ];

  const sidebarText = [
    {
      title: "雙擊編輯標題",
      size: 36,
      fontWeight: "normal",
      content: "新增標題",
      type: "title",
    },
    {
      title: "雙擊編輯副標題",
      size: 24,
      fontWeight: "normal",
      content: "新增副標",
      type: "subtitle",
    },
    {
      title: "雙擊編輯內文",
      size: 16,
      fontWeight: "normal",
      content: "paragraph",
    },
  ];

  const sidebarShapes = [
    { type: "square" },
    { type: "radiusSquare" },
    { type: "circle" },
    { type: "triangle" },
    { type: "star" },
    { type: "waterDrop" },
    { type: "heart" },
    { type: "bling" },
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
        crossOrigin: "anonymous",
      }
    );
    props.canvas.requestRenderAll();
  };

  const addShapeToCanvas = (src) => {
    fabric.loadSVGFromURL(src, (objects, options) => {
      const newShape = fabric.util.groupSVGElements(objects, options);
      newShape.set({
        top: 10,
        left: 10,
        width: 100,
        height: 100,
        fill: "#F1C394",
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
    uploadImageToStorage(fileList, props.currentUser.email, () => {
      showUploadedImages(setUploadedImages, props.currentUser.email);
    });
  };

  const handelBackgroundColor = (color) => {
    const colorRgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setChosenBackgroundColor({ background: colorRgba });
    props.canvas.backgroundColor = colorRgba;
    props.canvas.requestRenderAll();
  };

  const handleDeleteUploadedImage = (e) => {
    deleteUploadedImage(e.target.id, props.currentUser.email, () => {
      showUploadedImages(setUploadedImages, props.currentUser.email);
    });
  };

  useEffect(() => {
    if (props.currentUser.email) {
      showUploadedImages(setUploadedImages, props.currentUser.email);
    }
  }, [props.currentUser]);

  return (
    <SidebarContainer>
      <SidebarItems>
        {sidebarItems.map((item) => (
          <>
            {activeSidebar === item.en ? (
              <ActiveSidebarItem
                key={item.en}
                onClick={selectSidebar}
                data-type={item.en}
              >
                <ActiveSidebarItemIcon
                  src={item.src}
                  style={{ width: "20px" }}
                  data-type={item.en}
                  onClick={selectSidebar}
                />
                {item.ch}
              </ActiveSidebarItem>
            ) : (
              <SidebarItem
                key={item.en}
                onClick={selectSidebar}
                data-type={item.en}
              >
                <SidebarItemIcon
                  src={item.src}
                  style={{ width: "20px" }}
                  data-type={item.en}
                  onClick={selectSidebar}
                />
                {item.ch}
              </SidebarItem>
            )}
          </>
        ))}
      </SidebarItems>
      {activeSidebar === "image" ? (
        <SidebarItemContainer>
          {sidebarImages.map((type) => (
            <SidebarImgsContainer key={type.type}>
              <SidebarImgTitle>{type.type}</SidebarImgTitle>
              {type.src.map((img) => (
                <SidebarImg key={img} src={img} onClick={addImageToCanvas} />
              ))}
            </SidebarImgsContainer>
          ))}
        </SidebarItemContainer>
      ) : activeSidebar === "text" ? (
        <SidebarItemContainer>
          {sidebarText.map((text, index) => (
            <SidebarText
              size={text.size}
              key={text.size}
              data-index={index}
              onClick={addTextToCanvas}
              style={{ fontWeight: text.fontWeight }}
            >
              {text.title}
            </SidebarText>
          ))}
        </SidebarItemContainer>
      ) : activeSidebar === "background" ? (
        <SidebarItemContainer>
          <BackgroundContainer>
            <BackgroundTitle>背景顏色</BackgroundTitle>
            <ChromePicker
              color={chosenBackgroundColor.background}
              onChange={handelBackgroundColor}
            ></ChromePicker>
          </BackgroundContainer>
        </SidebarItemContainer>
      ) : activeSidebar === "graph" ? (
        <SidebarItemContainer>
          <BackgroundContainer>
            <BackgroundTitle>圖形</BackgroundTitle>
            <div>
              {sidebarShapes.map((shape) => (
                <SidebarShape
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
      ) : activeSidebar === "upload" ? (
        <SidebarItemContainer>
          <SidebarUploadLabel>
            上傳圖片
            <SidebarUpload
              type="file"
              onChange={handelUploadImageToStorage}
            ></SidebarUpload>
          </SidebarUploadLabel>
          <SidebarUploadedImagesContainer>
            {uploadedImages && uploadedImages.length > 0
              ? uploadedImages.map((img) => (
                  <UploadedImageContainer>
                    <UploadedImage
                      key={img.src}
                      src={img.src}
                      onClick={addImageToCanvas}
                    ></UploadedImage>
                    <DeleteUploadedImageBtn
                      onClick={handleDeleteUploadedImage}
                      id={img.id}
                    >
                      x
                    </DeleteUploadedImageBtn>
                  </UploadedImageContainer>
                ))
              : null}
          </SidebarUploadedImagesContainer>
        </SidebarItemContainer>
      ) : null}
    </SidebarContainer>
  );
};

export default Sidebar;
