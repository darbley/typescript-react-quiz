import { Dispatch, ReactElement, createContext, useContext, useReducer, useState } from 'react';

type Status = 'idle' | 'fetching' | 'ready'

interface QuizContextInterface {
    quizState: QuizState,
    dispatch: Dispatch<QuizAction>
}

interface QuizState {
    gameStatus: Status
}

type QuizAction = {
    type: 'setStatus';
    payload: Status;
}

const initialState:QuizState = {
    gameStatus: 'idle'
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
        case "setStatus":
          return { ...quizState, gameStatus: action.payload  };
        default:
          throw new Error("Unknown action");
    }  
}

