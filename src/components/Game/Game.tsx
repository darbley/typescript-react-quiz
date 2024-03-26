import './Game.scss';
import AnswerOption from '../AnswerOption/AnswerOption.tsx';
import Result from '../Result/Result.tsx';
import { useQuiz  } from '../../context/QuizContext/QuizContext.tsx';
import { decode } from 'html-entities';

function Game() {

    const { quizState, dispatch } = useQuiz();

    const handleSubmit = () => {
        dispatch({type: 'setStatus', payload: 'answered'})
        if(quizState.userAnswer === quizState.question?.correct_answer){
            dispatch({type: 'setScore', payload: 'correct'})
        } else {
            dispatch({type: 'setScore', payload: 'incorrect'})
        }
    }
   
    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{decode (quizState.question?.question)}</h4>
                <div className="options">
                    {quizState.question?.incorrect_answers?.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>
               
                {
                    quizState.userAnswer && quizState.gameStatus !== 'answered' &&
                    <button onClick={handleSubmit}>Submit</button>
                }

                {
                    quizState.gameStatus === 'answered' &&
                    <>
                        <Result />
                        <button onClick={() => {dispatch({type: 'setStatus', payload: 'idle'})}}>Next Question</button>
                    </>
                }
               
            </div>
            
        </>
    )
}

export default Game
