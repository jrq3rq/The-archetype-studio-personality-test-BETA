import React, { useState, useEffect, useRef } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import styled from "styled-components";

// Styled components
const Layout = styled.div`
  width: 100vw;
  height: 80vh;
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
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

// const SliderBar = styled.div`
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   height: 50px;
//   background-color: #eee;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #333;
    background-color: #f0f0f0;
  }
`;

const Question = styled.p`
  margin: 10px 0;
  color: #f5f5f5; // Keeping the original text color
  font-size: 1rem;
  padding-left: 10px;
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
  color: #f0f0f0;
  font-size: 1.5rem;
  margin: 0;
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

const AlertModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 1000; // Ensure it's above other content
`;

const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; // Just below the modal
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const RadioButton = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; // Full width
  height: auto; // Auto height on larger screens
  overflow-y: hidden; // No scroll initially
  padding: 20px 0; // Add padding to avoid content touching edges
`;

const RadioButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Align items to the start
  width: 100%; // Take full width of the container
  margin: 10px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const FullHeightContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.$bgColor}; // Use bgColor prop for background
`;

// Card data
const cardData = [
  { id: 1, bgColor: "#008080", content: "openness" },
  { id: 2, bgColor: "#008080", content: "conscientiousness" },
  { id: 3, bgColor: "#008080", content: "extraversion" },
  { id: 4, bgColor: "#008080", content: "agreeableness" },
  { id: 5, bgColor: "#008080", content: "neuroticism" },
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
  // const [isCurrentCardComplete, setIsCurrentCardComplete] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isModalAlertEnabled, setIsModalAlertEnabled] = useState(false);

  const enableModalAfterFirstQuestion = () => {
    if (selectedAnswers["openness-FirstQuestionKey"] !== undefined) {
      setIsModalAlertEnabled(true);
    }
  };
  const handleAnswer = (category, question, score) => {
    const answerKey = `${category}-${question}`;
    setSelectedAnswers((prevSelected) => {
      const newSelected = {
        ...prevSelected,
        [answerKey]: score,
      };

      // Use newSelected here
      const allAnswered = questionsData[
        cardData[currentCard - 1].content
      ].every(
        (q) =>
          newSelected[`${cardData[currentCard - 1].content}-${q}`] !== undefined
      );

      if (allAnswered) {
        setUnansweredQuestions([]);
      }

      enableModalAfterFirstQuestion(); // Call this function here
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
      if (isModalAlertEnabled) {
        setShowAlert(true); // Show the modal alert only if it is enabled.
      }
      return; // Prevent moving to the next card if all questions are not answered.
    }

    if (newCard >= 1 && newCard <= cardData.length) {
      setCurrentCard(newCard);
      containerRef.current.scrollTo({
        left: (newCard - 1) * window.innerWidth,
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
        <RadioButtonGroup>
          {likertOptions.map((option, index) => (
            <RadioButtonLabel key={index}>
              <RadioButton
                type="radio"
                name={answerKey}
                checked={option.score === isSelected}
                onChange={() => onAnswer(category, question, option.score)}
              />
              {option.text}
            </RadioButtonLabel>
          ))}
        </RadioButtonGroup>
      </div>
    );
  };

  return (
    <FullHeightContainer $bgColor={cardData[currentCard - 1].bgColor}>
      <Title>{cardData[currentCard - 1].content}</Title>
      <Layout>
        {showAlert && isModalAlertEnabled && (
          <>
            <AlertOverlay onClick={() => setShowAlert(false)} />
            <AlertModal>
              <p>Please answer all questions before proceeding.</p>
              <Button onClick={() => setShowAlert(false)}>Close</Button>
            </AlertModal>
          </>
        )}

        <Container ref={containerRef}>
          {cardData.map((card, index) => (
            <Card key={card.id} $bgColor={card.bgColor}>
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
        {/* <SliderBar>Current Card: {cardData[currentCard - 1].content}</SliderBar> */}
      </Layout>
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
    </FullHeightContainer>
  );
};

export default FullScreenCards;
