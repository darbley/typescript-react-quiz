
import './App.scss'
import Score from './components/Score/Score.tsx';
import Game from './components/Game/Game.tsx';
import FullPageLoader from './components/FullPageLoader/FullPageLoader';
import { useQuiz } from './context/QuizContext/QuizContext.tsx';
import { useEffect } from 'react';
import { Question, QuestionResponse } from './context/QuizContext/QuizContext.tsx';


function App() {

  const { quizState, dispatch } = useQuiz();

  const fetchQuestions = async () => {
    try{
      dispatch({ type: 'setStatus', payload: 'fetching'})
      const response = await fetch('https://opentdb.com/api.php?amount=10')
      // Add Type Annotation for the data
      const data : QuestionResponse = await(response.json())
      console.log('data is ',data);
      if(data.response_code === 0){
        let question : Question = data.results[0].question
        dispatch({ type: 'setStatus', payload: 'ready'})
      }else {
        dispatch({ type: 'setStatus', payload: 'error'})
      }
    }catch(err){
      console.log('error is ',err);
      dispatch({ type: 'setStatus', payload: 'error'})
    }
    
    
  }

  useEffect(() => {
    if(quizState.gameStatus === 'idle'){
      console.log('idle ');
      fetchQuestions();
    }
  },[quizState])

  return (
    <>
      {
        quizState.gameStatus === 'fetching' ?
        <FullPageLoader /> : quizState.gameStatus === 'error' ?
        <p>Error ...</p> : quizState.gameStatus === 'ready' ?
        <>
          <Score />
          <Game /> 
        </> :
        ''
      }
       
    </>
  )
}

export default App
