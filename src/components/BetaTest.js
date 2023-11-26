import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Styled components
const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 0px);
  display: flex;
  overflow-x: hidden; // Disable manual scrolling
  scroll-behavior: smooth;
`;

const Card = styled.div`
  flex: 0 0 100vw; // Ensure each card takes up the full viewport width
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

const Question = styled.p`
  margin: 10px 0;
  color: #fff;
  font-size: 1rem;
`;

const Title = styled.h2`
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  margin: 0;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LikertButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

// Card data
const cardData = [
  { id: 1, bgColor: "#000", content: "openness" },
  { id: 2, bgColor: "blue", content: "conscientiousness" },
  { id: 3, bgColor: "green", content: "extraversion" },
  { id: 4, bgColor: "#000", content: "agreeableness" },
  { id: 5, bgColor: "orange", content: "neuroticism" },
];

const likertOptions = [
  { text: "Very Inaccurate", score: 0.0 },
  { text: "Inaccurate", score: 0.2 },
  { text: "Somewhat Inaccurate", score: 0.4 },
  { text: "Somewhat Accurate", score: 0.6 },
  { text: "Accurate", score: 0.8 },
  { text: "Very Accurate", score: 1.0 },
];

const FullScreenCards = () => {
  const [currentCard, setCurrentCard] = useState(1);
  const [questionsData, setQuestionsData] = useState({});
  const containerRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const handleAnswer = (category, question, score) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: {
        ...prevAnswers[category],
        [question]: score,
      },
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + "/data/questions.jsonl"
        );
        const text = await response.text();
        const lines = text.trim().split("\n");
        const jsonData = lines.map((line) => JSON.parse(line));

        const dataMap = {};
        jsonData.forEach((item) => {
          dataMap[item.id] = item.questions;
        });

        setQuestionsData(dataMap); // Set the parsed data
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    };

    loadData();
  }, []);

  const calculateScore = () => {
    console.log("Calculating score...");
    // Add your score calculation logic here
  };

  const scroll = (direction) => {
    let newCard = direction === "right" ? currentCard + 1 : currentCard - 1;
    newCard = Math.max(1, Math.min(newCard, cardData.length));

    // Calculate the scroll position
    const scrollPosition = (newCard - 1) * window.innerWidth;
    containerRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setCurrentCard(newCard);
  };
  const LikertScaleQuestion = ({ question, onAnswer }) => {
    return (
      <div>
        <Question>{question}</Question>
        <div>
          {likertOptions.map((option) => (
            <LikertButton
              key={option.score}
              onClick={() => onAnswer(option.score)}
            >
              {option.text}
            </LikertButton>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Container ref={containerRef}>
        {cardData.map((card) => (
          <Card key={card.id} bgColor={card.bgColor}>
            <Title>{cardData[currentCard - 1].content}</Title>
            <QuestionContainer>
              {questionsData[card.content] &&
                questionsData[card.content].map((question, index) => (
                  <LikertScaleQuestion
                    key={index}
                    question={question}
                    onAnswer={(score) =>
                      handleAnswer(card.content, question, score)
                    }
                  />
                ))}
            </QuestionContainer>
          </Card>
        ))}
      </Container>
      <ButtonContainer>
        {currentCard > 1 && (
          <Button onClick={() => scroll("left")}>Back</Button>
        )}
        {currentCard < cardData.length && (
          <Button onClick={() => scroll("right")}>Next</Button>
        )}
        {currentCard === cardData.length && (
          <Button onClick={calculateScore}>Calculate Score</Button>
        )}
      </ButtonContainer>
      {/* <SliderBar>Current Card: {cardData[currentCard - 1].content}</SliderBar> */}
    </Layout>
  );
};

export default FullScreenCards;
