import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { fabric } from 'fabric';
import "fabric-history";

const CanvasContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 140px);
  /* @media (max-width: 1600px) {
        padding-top: 400px;
        flex-direction: column;
        overflow: auto;
        gap: 610px;
    } */
`;

// const CanvasForTagContainer = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const CanvasTag = styled.div`
//     display: flex;
//     width: 100px;
//     height: 20px;
//     background-color: black;
//     color: white;
//     justify-content: center;
//     margin-bottom: 5px;
//     border-radius: 2px;
//     align-self: flex-end;
// `;

const DrawingArea = (props) => {
  const [currentCanvas, setCurrentCanvas] = useState("c");
  const [coverBorder, setCoverBorder] = useState({
    color: "gray",
    width: "1px",
  });
  const [innerBorder, setInnerBorder] = useState({
    color: "gray",
    width: "1px",
  });
  const [textBorder, setTextBorder] = useState({
    color: "gray",
    width: "1px",
  });

  useEffect(() => {
    if (
      JSON.stringify(props.canvas) !== "{}" &&
      props.canvas.lowerCanvasEl.id === "c"
    ) {
      setCurrentCanvas(props.canvas.lowerCanvasEl.id);
      setCoverBorder({ color: "#172f2f", width: "2px" });
      setInnerBorder({ color: "#ffffff", width: "1px" });
      setTextBorder({ color: "#ffffff", width: "1px" });
    } else if (
      JSON.stringify(props.canvas) !== "{}" &&
      props.canvas.lowerCanvasEl.id === "i"
    ) {
      setCurrentCanvas(props.canvas.lowerCanvasEl.id);
      setCoverBorder({ color: "#ffffff", width: "1px" });
      setInnerBorder({ color: "#172f2f", width: "2px" });
      setTextBorder({ color: "#ffffff", width: "1px" });
    } else if (
      JSON.stringify(props.canvas) !== "{}" &&
      props.canvas.lowerCanvasEl.id === "t"
    ) {
      setCurrentCanvas(props.canvas.lowerCanvasEl.id);
      setCoverBorder({ color: "#ffffff", width: "1px" });
      setInnerBorder({ color: "#ffffff", width: "1px" });
      setTextBorder({ color: "#172f2f", width: "2px" });
    }
  }, [props.canvas, currentCanvas]);

  return (
    <CanvasContainer>
      <canvas
        style={{
          border: `${coverBorder.width} solid ${coverBorder.color}`,
          borderRadius: "5px",
        }}
        id="c"
      />
      <canvas
        style={{
          border: `${innerBorder.width} solid ${innerBorder.color}`,
          borderRadius: "5px",
        }}
        id="i"
      />
      <canvas
        style={{
          border: `${textBorder.width} solid ${textBorder.color}`,
          borderRadius: "5px",
        }}
        id="t"
      />
      {/* {currentCanvas === 'c' ? (
                <canvas
                    style={{
                        border: `1px solid ${coverBorder}`,
                        borderRadius: '5px',
                    }}
                    id="c"
                />
            ) : (
                <canvas
                    style={{
                        border: `1px solid ${innerBorder}`,
                        borderRadius: '5px',
                    }}
                    id="c"
                />
            )}

            {currentCanvas === 'i' ? (
                <canvas
                    style={{
                        border: '1px solid red',
                        borderRadius: '5px',
                    }}
                    id="i"
                />
            ) : (
                <canvas
                    style={{
                        border: '1px solid gray',
                        borderRadius: '5px',
                    }}
                    id="i"
                />
            )}

            {currentCanvas === 't' ? (
                <canvas
                    style={{
                        border: '1px solid red',
                        borderRadius: '5px',
                    }}
                    id="t"
                />
            ) : (
                <canvas
                    style={{
                        border: '1px solid gray',
                        borderRadius: '5px',
                    }}
                    id="t"
                />
            )} */}
    </CanvasContainer>
  );
};

export default DrawingArea;
