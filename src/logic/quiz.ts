export interface Module {
    id: number,
    title: string,
    imageUrl?: string,
    tools?: Tool[],
}

export interface Tool {}

export interface Quiz extends Tool{
    /**
     * Must contain at least 1 string.
     */
    scoreNames: string[];
    results: QuizResult[];
    questions: QuizQuestion[];
}

export interface QuizResult {
    title: string;
    description?: string;
    imageUrl?: string;
    /**
     * A link may provide the user with further information on their result.
     */
    infoLink?: string;
    /**
     * One value per category. (-> Length must match length of Quiz.categoryNames.)
     * This result is picked if the user's scores match these idealValues the best.
     */
    idealScores: number[];
}

export interface QuizQuestion {
    title: string;
    /**
     * Must contain at least 2 possible answers.
     */
    possibleAnswers: QuizPossibleAnswer[];
}

export interface QuizPossibleAnswer {
    title: string;
    imageUrl?: string;
    /**
     * One value per category. (-> Length must match length of Quiz.categoryNames.)
     * If the user picks this possible answer, how should their scores change per category?
     */
    scoresDelta: number[];
}
