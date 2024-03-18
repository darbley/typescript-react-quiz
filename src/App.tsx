
import './App.scss'
import Score from './components/Score/Score.tsx';
import Game from './components/Game/Game.tsx';
import { useQuiz } from './context/QuizContext/QuizContext.tsx';

function App() {

  const {quizState, dispatch}  = useQuiz();
  console.log('state is ',quizState);
  return (
    <>
      <Score />
      <Game /> 
      <h2> {quizState.gameStatus} </h2>
      <button onClick={() => dispatch({ type: 'setStatus', payload: 'fetching'})}></button>
       
    </>
  )
}

export default App
