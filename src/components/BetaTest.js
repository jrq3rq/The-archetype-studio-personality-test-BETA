import React, { useState, useEffect, useRef } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
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
  overflow-x: hidden; // Keep this to hide the scrollbar
  scroll-behavior: smooth;
`;

const Card = styled.div`
  flex: 0 0 100vw; // Ensure each card takes up the full viewport width
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.$bgColor}; // Updated to use transient prop
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
  color: #fff; // Keeping the original text color
  font-size: 1rem;
  /* text-decoration: ${(props) =>
    props.$unanswered ? "underline" : "none"}; */
  text-decoration-color: ${(props) =>
    props.$unanswered ? "#FF5733" : "transparent"};
  animation: ${(props) => (props.$unanswered ? "pulse 1s infinite" : "none")};

  @keyframes pulse {
    0% {
      text-decoration-color: #ff5733;
    }
    50% {
      text-decoration-color: transparent;
    }
    100% {
      text-decoration-color: #ff5733;
    }
  }
`;

const QuestionWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; // Space between icon and text
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
  background-color: ${(props) =>
    props.$isSelected ? "#4CAF50" : "#f0f0f0"}; // Updated to use transient prop
  border: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.$isSelected
        ? "#388E3C"
        : "#e0e0e0"}; // Updated to use transient prop
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  color: #333;
  text-align: center;
  z-index: 2; // Higher than the overlay
`;

const ScoreDisplay = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333; // Adjusted for readability on the white background
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  z-index: 1; // Ensure it's behind the modal but above other content
`;
// Card data
const cardData = [
  { id: 1, bgColor: "#008080", content: "openness" },
  { id: 2, bgColor: "#00008B", content: "conscientiousness" },
  { id: 3, bgColor: "#FFA500", content: "extraversion" },
  { id: 4, bgColor: "#77DD77", content: "agreeableness" },
  { id: 5, bgColor: "#808080", content: "neuroticism" },
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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showScores, setShowScores] = useState(false); // State to control the display of scores
  const [categoryScores, setCategoryScores] = useState({}); // State to hold scores for each category
  const [isCurrentCardComplete, setIsCurrentCardComplete] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const handleAnswer = (category, question, score) => {
    const answerKey = `${category}-${question}`;
    console.log(`Updating answer for ${answerKey} to score: ${score}`);

    setSelectedAnswers((prevSelected) => {
      const newSelected = {
        ...prevSelected,
        [answerKey]: score,
      };

      // Check if all questions in the current card are answered
      const allAnswered = questionsData[
        cardData[currentCard - 1].content
      ].every(
        (q) =>
          newSelected[`${cardData[currentCard - 1].content}-${q}`] !== undefined
      );

      if (allAnswered) {
        setUnansweredQuestions([]); // Clear any unanswered questions if all are answered
      }

      return newSelected;
    });
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
    if (!checkAllAnswered()) {
      alert("Please answer all questions before calculating the score.");
      return;
    }

    const scores = {};
    // Compute scores for each category
    Object.keys(selectedAnswers).forEach((key) => {
      const [category, question] = key.split("-");
      scores[category] = (scores[category] || 0) + selectedAnswers[key];
    });

    setCategoryScores(scores); // Update state with calculated scores
    setShowScores(true); // Set to display scores
    console.log("Calculated Scores:", scores);
  };

  const checkAllAnswered = () => {
    const currentQuestions = questionsData[cardData[currentCard - 1].content];
    const unanswered = currentQuestions.filter(
      (q) =>
        selectedAnswers[`${cardData[currentCard - 1].content}-${q}`] ===
        undefined
    );
    setUnansweredQuestions(unanswered);
    return unanswered.length === 0;
  };

  const scroll = (direction) => {
    let newCard = direction === "right" ? currentCard + 1 : currentCard - 1;
    if (direction === "right" && !checkAllAnswered()) {
      alert("Please answer all questions before proceeding.");
      return;
    }
    if (newCard >= 1 && newCard <= cardData.length) {
      setCurrentCard(newCard);
      const scrollPosition = (newCard - 1) * window.innerWidth;
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const LikertScaleQuestion = ({
    category,
    question,
    onAnswer,
    selectedAnswers,
  }) => {
    const answerKey = `${category}-${question}`;
    const isSelected = selectedAnswers[answerKey];
    const isUnanswered = unansweredQuestions.includes(question);

    return (
      <div>
        <QuestionWithIcon>
          {isUnanswered && <AiOutlineExclamationCircle color="#FF5733" />}
          <Question $unanswered={isUnanswered}>{question}</Question>
        </QuestionWithIcon>
        <div>
          {likertOptions.map((option) => (
            <LikertButton
              key={`${question}-${option.score}`}
              $isSelected={option.score === isSelected}
              onClick={() => onAnswer(category, question, option.score)}
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
        {cardData.map((card, index) => (
          <Card key={card.id} $bgColor={card.bgColor}>
            <Title>{cardData[currentCard - 1].content}</Title>
            <QuestionContainer>
              {questionsData[card.content] &&
                questionsData[card.content].map((question, index) => (
                  <LikertScaleQuestion
                    key={index}
                    category={card.content}
                    question={question}
                    onAnswer={handleAnswer}
                    selectedAnswers={selectedAnswers} // Pass selectedAnswers
                  />
                ))}
            </QuestionContainer>
          </Card>
        ))}
      </Container>
      {showScores && (
        <>
          <Overlay />
          <Modal>
            <h2>Your Scores</h2>
            {Object.entries(categoryScores).map(([category, score]) => (
              <ScoreDisplay key={category}>
                {category}: {score.toFixed(2)}
              </ScoreDisplay>
            ))}
            <Button onClick={() => setShowScores(false)}>Close</Button>
          </Modal>
        </>
      )}
      <ButtonContainer>
        {currentCard > 1 && (
          <Button onClick={() => scroll("left")}>Back</Button>
        )}
        {currentCard < cardData.length && (
          <Button
            onClick={() => scroll("right")}
            disabled={
              currentCard !== cardData.length && unansweredQuestions.length > 0
            }
          >
            Next
          </Button>
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
