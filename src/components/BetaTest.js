import React, { useState, useRef } from "react";
import styled from "styled-components";

// Styled components
const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px); // Adjust height to account for slider bar
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;

  // Styles to hide scrollbar
  ::-webkit-scrollbar {
    display: none; // for WebKit browsers
  }
  -ms-overflow-style: none; // for IE and Edge
  scrollbar-width: none; // for Firefox
`;

// Rest of your code remains the same...

const Card = styled.div`
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const SliderBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// React Component
// Card data
const cardData = [
  { id: 1, bgColor: "red", content: "Card 1" },
  { id: 2, bgColor: "blue", content: "Card 2" },
  { id: 3, bgColor: "green", content: "Card 3" },
  { id: 4, bgColor: "yellow", content: "Card 4" },
  { id: 5, bgColor: "orange", content: "Card 5" },
  { id: 6, bgColor: "pink", content: "Card 6" },
  // Add more cards here as needed
];

const FullScreenCards = () => {
  const [currentCard, setCurrentCard] = useState(1);
  const containerRef = useRef(null);

  const scroll = (direction) => {
    let newCard = direction === "right" ? currentCard + 1 : currentCard - 1;
    newCard = Math.max(1, Math.min(newCard, cardData.length)); // Adjusted to use cardData.length

    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newScroll = (newCard - 1) * containerWidth;
      containerRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
      setCurrentCard(newCard);
    }
  };

  return (
    <Layout>
      <Container ref={containerRef}>
        {cardData.map((card) => (
          <Card key={card.id} bgColor={card.bgColor}>
            {card.content}
          </Card>
        ))}
      </Container>
      <ButtonContainer>
        <Button onClick={() => scroll("left")}>Back</Button>
        <Button onClick={() => scroll("right")}>Next</Button>
      </ButtonContainer>
      <SliderBar>Current Card: {cardData[currentCard - 1].content}</SliderBar>
    </Layout>
  );
};

export default FullScreenCards;
