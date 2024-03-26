import { useQuiz } from '../../context/QuizContext/QuizContext';
import './Score.scss';

function Score() {
    const { quizState } = useQuiz();

    return (
        <>  
            <div className="score">
                <div>
                    <small>Correct</small>
                    <span className="point">{quizState.score.correct}</span>
                    <span>X</span>
                    <span className="point">{quizState.score.incorrect}</span>
                    <small>Incorrect</small>
                </div>
            </div>
            
        </>
    )
}

export default Score
