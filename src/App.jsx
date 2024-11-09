
import React ,{ useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import UserForm from './components/UserForm';
import Question from './components/Question';
import Results from './components/Results';
import Header from './components/Header';
import { UserProvider } from './components/UserContext';


const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "What's your favorite activity?",
    options: ["Running", "Swimming", "Napping", "Eating"],
  },
  {
    question: "What's your favorite food?",
    options: ["Steak", "Fish", "Carrots", "Chicken"],
  },
  {
    question: "What's your favorite place?",
    options: ["Mountains", "Beach", "Countryside", "City"],
  },
  {
    question: "What's your favorite season?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
  }
];

const dogBreeds = {
  "Australian Shepherd": "australian/shepherd",
  "Otterhound": "otterhound",
  "Briard": "briard",
  "Cocker Spaniel": "spaniel/cocker"};


const elements = {
  "Red 🔴": "Australian Shepherd",
  "Blue 🔵": "Otterhound",
  "Green 🟢": "Briard",
  "Yellow 🟡": "Cocker Spaniel",

  "Running": "Otterhound",
  "Swimming": "Briard",
  "Napping": "Cocker Spaniel",
  "Eating": "Australian Shepherd",

  "Steak": "Briard",
  "Fish": "Cocker Spaniel",
  "Carrots": "Australian Shepherd",
  "Chicken": "Otterhound",

  "Mountains": "Cocker Spaniel",
  "Beach": "Australian Shepherd",
  "Countryside": "Otterhound",
  "City": "Briard",

  "Spring": "Otterhound",
  "Summer": "Briard",
  "Autumn": "Cocker Spaniel",
  "Winter": "Australian Shepherd"
};

export default function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [element, setElement] = useState('');
  const [dog, setDog] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchDogImage(element) {

    console.log(element);
    const breed = dogBreeds[element];
    console.log(breed);
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    setDog(data.message);
  };

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchDogImage(selectedElement);
      }
    },
    [currentQuestionIndex]
  );


  return (<div>
    <Header />
    <UserProvider>
      <Routes>
      <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
      <Route
      path="/quiz"
      element={
        currentQuestionIndex < questions.length ? (
          <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
        ) : (
          <Results element={element} dog={dog} />
        )
      }
      />
      </Routes>
    </UserProvider>
  </div>)
};