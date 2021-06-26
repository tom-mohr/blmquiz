import {Quiz, ToolType} from "./quiz";

export const exampleQuizzes: Quiz[] = [
    {// "Welche Epoche passt am besten zu dir?"
        type: ToolType.Quiz,
        scoreNames: ["Mittelalter", "Barock", "Neuzeit"],
        results: [
            {
                title: "Mittelalter",
                idealScores: [5, -5, -5],
            },
            {
                title: "Barock",
                idealScores: [-5, 5, -5],
            },
            {
                title: "Neuzeit",
                idealScores: [-5, -5, 5],
            },
        ],
        questions: [
            {
                title: "Wie wichtig ist dir Hygiene?",
                possibleAnswers: [
                    {
                        title: "sehr wichtig",
                        scoresDelta: [-2, -1, 1],
                    },
                    {
                        title: "so mittel",
                        scoresDelta: [-1, -1, 0],
                    },
                    {
                        title: "völlig unwichtig",
                        scoresDelta: [2, 1, -1],
                    }
                ],
            },
            {
                title: "Legst du Wert auf politische Mitbestimmung?",
                possibleAnswers: [
                    {
                        title: "ja",
                        scoresDelta: [-1, -2, 1],
                    },
                    {
                        title: "nein",
                        scoresDelta: [0, 2, 0],
                    },
                ],
            }
        ],
    }
];