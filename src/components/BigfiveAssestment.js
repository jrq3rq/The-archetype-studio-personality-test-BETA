import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const QuestionContainer = styled.div`
  margin-bottom: 15px;
`;

const QuestionText = styled.p`
  font-size: 1.1em;
`;

const QuestionItem = ({ text, questionIndex, onChange }) => {
  const [value, setValue] = useState(null);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange(questionIndex, newValue);
  };

  return (
    <QuestionContainer>
      <QuestionText>{text}</QuestionText>
      <LikertScale
        value={value}
        onChange={handleChange}
        questionIndex={questionIndex}
      />
    </QuestionContainer>
  );
};

const LikertScale = ({ value, onChange, questionIndex }) => {
  const options = [
    { label: "Very Inaccurate", score: 0.0 },
    { label: "Inaccurate", score: 0.2 },
    { label: "Somewhat Inaccurate", score: 0.4 },
    { label: "Somewhat Accurate", score: 0.6 },
    { label: "Accurate", score: 0.8 },
    { label: "Very Accurate", score: 1.0 },
  ];

  return (
    <OptionsContainer>
      {options.map((option, index) => (
        <RadioLabel key={index}>
          <input
            type="radio"
            name={`rating-${questionIndex}`}
            value={option.score}
            checked={value == option.score}
            onChange={onChange}
          />
          {option.label}
        </RadioLabel>
      ))}
    </OptionsContainer>
  );
};

const Conscientiousness = ({ updateTotalScore }) => {
  const [scores, setScores] = useState(Array(10).fill(null));

  useEffect(() => {
    const total = scores.reduce((acc, curr) => acc + (curr || 0), 0);
    updateTotalScore("conscientiousness", total);
  }, [scores, updateTotalScore]);

  const updateScore = (index, score) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };
  const questions = [
    "I complete tasks successfully by following directions.",
    "I pay attention to details in my work.",
    "I make plans and stick to them.",
    "I return phone calls and emails promptly.",
    "I finish important tasks before starting new ones.",
    "I keep my documents and files organized.",
    "I double check my work to ensure quality.",
    "I plan ahead and schedule things in advance.",
    "I am reliable in meeting deadlines.",
    "I persevere until I complete a task.",
  ];

  return (
    <Section>
      <h2>Conscientiousness</h2>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          text={question}
          questionIndex={index}
          onChange={updateScore}
        />
      ))}
    </Section>
  );
};

const Extraversion = ({ updateTotalScore }) => {
  const [scores, setScores] = useState(Array(10).fill(null));

  useEffect(() => {
    const total = scores.reduce((acc, curr) => acc + (curr || 0), 0);
    updateTotalScore("extraversion", total);
  }, [scores, updateTotalScore]);

  const updateScore = (index, score) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };
  const questions = [
    "I feel energized around other people.",
    "I am comfortable starting conversations.",
    "I prefer group activities rather than solo activities.",
    "I share my opinions easily with new people.",
    "I am outgoing and sociable.",
    "I like being part of clubs and organizations.",
    "I enjoy leadership roles.",
    "I thrive in active, busy environments.",
    "I express myself easily.",
    "I talk more than I listen in groups.",
  ];

  return (
    <Section>
      <h2>Extraversion</h2>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          text={question}
          questionIndex={index}
          onChange={updateScore}
        />
      ))}
    </Section>
  );
};

const Agreeableness = ({ updateTotalScore }) => {
  const [scores, setScores] = useState(Array(10).fill(null));

  useEffect(() => {
    const total = scores.reduce((acc, curr) => acc + (curr || 0), 0);
    updateTotalScore("agreeableness", total);
  }, [scores, updateTotalScore]);

  const updateScore = (index, score) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };
  const questions = [
    "I am respectful and polite to strangers.",
    "I enjoy cooperating with others.",
    "I believe most people are trustworthy and kind.",
    "I avoid arguments and conflicts.",
    "I am willing to compromise when necessary.",
    "I care about social justice and equality.",
    "I inquire about others' well-being.",
    "I empathize easily with how people feel.",
    "I try to resolve disagreements among friends.",
    "I apologize when I am wrong.",
  ];

  return (
    <Section>
      <h2>Agreeableness</h2>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          text={question}
          questionIndex={index}
          onChange={updateScore}
        />
      ))}
    </Section>
  );
};

const Neuroticism = ({ updateTotalScore }) => {
  const [scores, setScores] = useState(Array(10).fill(null));

  useEffect(() => {
    const total = scores.reduce((acc, curr) => acc + (curr || 0), 0);
    updateTotalScore("neuroticism", total);
  }, [scores, updateTotalScore]);

  const updateScore = (index, score) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };
  const questions = [
    "I get angry or irritable easily.",
    "I feel anxious about unsure outcomes.",
    "I worry more than most people.",
    "I am sensitive to criticism from others.",
    "I often feel sad or down.",
    "I feel overwhelmed when stressed.",
    "I dwell on embarrassing moments.",
    "I am easily disturbed or upset.",
    "My mood changes frequently.",
    "I feel nervous in new situations.",
  ];

  return (
    <Section>
      <h2>Neuroticism</h2>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          text={question}
          questionIndex={index}
          onChange={updateScore}
        />
      ))}
    </Section>
  );
};

const Openness = ({ updateTotalScore }) => {
  const [scores, setScores] = useState(Array(10).fill(null));

  useEffect(() => {
    const total = scores.reduce((acc, curr) => acc + (curr || 0), 0);
    updateTotalScore("openness", total);
  }, [scores, updateTotalScore]);

  const updateScore = (index, score) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };
  const questions = [
    "I am interested in learning about art, culture, and history.",
    "I like to try new and unique foods.",
    "I enjoy intellectually challenging activities.",
    "I prefer variety over routine.",
    "I have a wide range of hobbies and interests.",
    "I am comfortable with abstract ideas.",
    "I enjoy thinking about alternate realities or possibilities.",
    "I like movies, books, and art with deeper meaning.",
    "I am intrigued by philosophical discussions.",
    "I prefer innovation over tradition.",
  ];

  return (
    <Section>
      <h2>Openness</h2>
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          text={question}
          questionIndex={index}
          onChange={updateScore}
        />
      ))}
    </Section>
  );
};

// Similar components for Conscientiousness, Extraversion, Agreeableness, and Neuroticism
const BigFiveAssessment = () => {
  const [totalScores, setTotalScores] = useState({
    openness: null,
    conscientiousness: null,
    extraversion: null,
    agreeableness: null,
    neuroticism: null,
  });

  const [showScores, setShowScores] = useState(false);

  const updateTotalScore = (trait, score) => {
    setTotalScores((prevScores) => ({ ...prevScores, [trait]: score }));
  };

  const calculateTotalScores = () => {
    setShowScores(true);
  };

  return (
    <Container>
      <Openness updateTotalScore={updateTotalScore} />
      <Conscientiousness updateTotalScore={updateTotalScore} />
      <Extraversion updateTotalScore={updateTotalScore} />
      <Agreeableness updateTotalScore={updateTotalScore} />
      <Neuroticism updateTotalScore={updateTotalScore} />
      {/* ... other trait components */}
      <button onClick={calculateTotalScores}>Complete</button>
      {showScores && (
        <div>
          {/* Example of rendering scores */}
          <p>Extraversion: {totalScores.extraversion}</p>
          <p>Agreeableness: {totalScores.agreeableness}</p>
          <p>Neuroticism: {totalScores.neuroticism}</p>
          <p>Conscientiousness: {totalScores.conscientiousness}</p>
          <p>Openness: {totalScores.openness}</p>
          {/* ...render other scores */}
        </div>
      )}
    </Container>
  );
};

export default BigFiveAssessment;
