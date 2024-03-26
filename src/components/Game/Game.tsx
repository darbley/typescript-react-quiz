import './Game.scss';
import AnswerOption from '../AnswerOption/AnswerOption.tsx';
import Result from '../Result/Result.tsx';
import { useQuiz } from '../../context/QuizContext/QuizContext.tsx';
import { decode } from 'html-entities';

function Game() {

    const { quizState } = useQuiz();
   
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
               
               {quizState.userAnswer && 
                    <button>Submit</button>
               }
               
                
                <Result />
                
            </div>
            
        </>
    )
}

export default Game
