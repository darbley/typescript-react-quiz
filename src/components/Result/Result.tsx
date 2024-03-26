import { useQuiz  } from '../../context/QuizContext/QuizContext.tsx';
import { decode } from 'html-entities';


function Result() {

    const { quizState } = useQuiz();
    return (
        <>  
            {
                quizState.userAnswer === quizState.question?.correct_answer ? 
                    <div className="result correct">&#10003; You answered correctly!</div> 
                :
                <>
                    <div className="result incorrect">&#x274c; Your answer was wrong :/</div> <br />
                    <p>The correct answer is {decode (quizState.question?.correct_answer)}</p>
                </>
                
            }
            
        </>
    )
}

export default Result
