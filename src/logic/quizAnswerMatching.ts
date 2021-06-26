import {QuizPossibleAnswer, QuizQuestion, QuizResult} from "./quiz";

/**
 * Returns array of values in the range [0, 1] that indicate
 * how close the user's answer is to the respective ideal result.
 * 1 means that the answer matches the ideal result perfectly.
 * @param quizQuestions
 * @param quizResults
 * @param scores
 */
export function calculateMatching(quizQuestions: QuizQuestion[],
                                  quizResults: QuizResult[],
                                  scores: number[]): number[] {

    const dimension = scores.length;

    // calculate distance to each possible result
    const differences: number[][] = quizResults
        .map(result => arrayDiff(scores, result.idealScores));

    const rangeSizePerCategory = getExtremesPerCategory(dimension, quizQuestions)
        .map(range => range.max - range.min);

    // divide each coordinate by the size of the range of that category
    const normalizedDifferences: number[][] = differences
        .map(diff => diff.map((d, category) =>
            rangeSizePerCategory[category] ? d / rangeSizePerCategory[category] : 0
        ));
    // -> normalizedDifferences are vectors in [-1, 1]^n

    const normalizedDistances = normalizedDifferences
        .map(euclideanNorm)
        .map(d => d / Math.sqrt(dimension));  // map to (0, 1)

    //todo this is just for debugging
    // console.log("scores:");
    // console.log(scores);
    // console.log("ideal scores:");
    // console.log(quizResults.map(r => r.idealScores));
    // console.log("differences:");
    // console.log(differences);
    // console.log("normalized differences:");
    // console.log(normalizedDifferences);
    // console.log("extremes per category:");
    // console.log(getExtremesPerCategory(dimension, quizQuestions));
    // console.log("normalized distances:");
    // console.log(normalizedDistances);

    return normalizedDistances
        .map(val => 1 - val);  // distance 0 gets 1 in matching
}

type Range = { min: number, max: number };

export function getExtremesPerCategory(scoreCategoryCount: number, quizQuestions: QuizQuestion[]): Range[] {

    let extremesPerCategory = [];
    for (let categoryIndex = 0; categoryIndex < scoreCategoryCount; categoryIndex++) {

        let extremesSum = {
            min: 0,
            max: 0,
        };

        quizQuestions.forEach(q => {
            // find worst and best answers for this category
            const extremes = getExtremes(q.possibleAnswers, categoryIndex);
            extremesSum.min += extremes.min;
            extremesSum.max += extremes.max;
        });

        extremesPerCategory.push(extremesSum);
    }

    return extremesPerCategory;
}

function getExtremes(possibleAnswers: QuizPossibleAnswer[], categoryIndex: number): Range {

    if(possibleAnswers.length === 0)
    {
        return {
            min: 0,
            max: 0,
        };
    }

    // set initial value
    let min = possibleAnswers[0].scoresDelta[categoryIndex];
    let max = min;

    for (let i = 1; i < possibleAnswers.length; i++) {
        const delta = possibleAnswers[i].scoresDelta[categoryIndex];
        if (delta < min) {
            min = delta;
        }
        if (delta > max) {
            max = delta;
        }
    }

    return {
        min: min,
        max: max,
    };
}

/**
 * Returns "b - a" (index-wise).
 * @param a
 * @param b
 */
function arrayDiff(a: number[], b: number[]): number[] {
    return b.map((value, i) => value - a[i]);
}

function euclideanNorm(values: number[]): number {
    return Math.sqrt(values.reduce((sum, val) => sum + val * val, 0));
}

function arraySum(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0);
}
