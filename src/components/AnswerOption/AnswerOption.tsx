import './AnswerOption.scss';
import { decode } from 'html-entities';
import { useQuiz } from '../../context/QuizContext/QuizContext.tsx';

function AnswerOption({answer}: {answer : string}) {

    const { dispatch, quizState } = useQuiz();

    return (
        <>  
            {
                answer &&
                <div className="answer-option">
                    <p 
                        className={`
                            ${answer === quizState.userAnswer ? 'selected' : ''}
                            ${quizState.gameStatus === 'answered' && answer === quizState.question?.correct_answer ? 'correct' : ''}
                        `}
                        onClick={() => dispatch({type: 'setUserAnswer', payload: answer})}> 
                       {decode (answer)}
                    </p>
                </div>
            }
            
        </>
    )
}

export default AnswerOption
