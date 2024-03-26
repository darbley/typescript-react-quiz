import './Game.scss';
import AnswerOption from '../AnswerOption/AnswerOption.tsx';
import Result from '../Result/Result.tsx';
import { useQuiz } from '../../context/QuizContext/QuizContext.tsx';

function Game() {

    const { quizState } = useQuiz();
   
    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{quizState.question?.question}</h4>
                <div className="options">
                    {quizState.question?.incorrect_answers?.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>
               
                <button>Submit</button>
                
                <Result />
                
            </div>
            
        </>
    )
}

export default Game
