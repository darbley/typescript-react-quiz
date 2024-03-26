import { Dispatch, ReactElement, createContext, useContext, useReducer, useState } from 'react';

export interface Question {
    category: string;
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuestionResponse {
    response_code: number;
    results: Question[]
}

type Status = 'idle' | 'fetching' | 'ready' | 'error' | 'answered'

interface QuizContextInterface {
    quizState: QuizState,
    dispatch: Dispatch<QuizAction>
}

interface QuizState {
    gameStatus: Status,
    question: Question | null,
    userAnswer: string | null
}

type QuizAction = 
    { type: 'setStatus'; payload: Status; } |
    { type: 'setQuestion'; payload: Question } |
    { type: 'setUserAnswer'; payload: string }

const initialState:QuizState = {
    gameStatus: 'idle',
    question: null,
    userAnswer: null
}

const QuizContext = createContext<QuizContextInterface>({
    quizState: initialState,
    dispatch: () => null
});

const QuizProvider = ({children} : {children: ReactElement} ) => {
//    const [quizState, setQuizState] = useState(initialState)
    const [quizState, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <QuizContext.Provider value={{quizState, dispatch}}>
            {children}
        </QuizContext.Provider>
    )

}

export default QuizProvider

// Create small hook to use to grab state. 
export const useQuiz = () => {
    return useContext(QuizContext);
}

const QuizReducer = (quizState: QuizState, action: QuizAction):QuizState => {
    switch (action.type) {
        case "setQuestion":
          return { ...quizState, question: action.payload  };
        case "setStatus":
          return { ...quizState, gameStatus: action.payload  };
        case "setUserAnswer":
          return { ...quizState, userAnswer: action.payload  };
        default:
          throw new Error("Unknown action");
    }  
}

