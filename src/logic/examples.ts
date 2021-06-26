import {Module, Quiz, Tool, ToolType} from "./quiz";

export const exampleModules: Module[] = [
    {
        id: 0,
        title: "Welche Epoche passt am besten zu dir?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Huber_Carl_III.Wilhelm.jpeg/256px-Huber_Carl_III.Wilhelm.jpeg",
        tools: [
            {
                type: ToolType.Quiz,
                scoreNames: ["Mittelalter", "Barock", "Neuzeit"],
                results: [
                    {
                        title: "Mittelalter",
                        idealScores: [2, 1, -1],
                    },
                    {
                        title: "Barock",
                        idealScores: [1, 3, -1],
                    },
                    {
                        title: "Neuzeit",
                        idealScores: [-3, -1, 2],
                    },
                ],
                questions: [
                    {
                        title: "Wie wichtig ist dir Hygiene?",
                        possibleAnswers: [
                            {
                                title: "sehr wichtig",
                                scoresDelta: [-2, -1, 1],
                                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/OCD_handwash.jpg/128px-OCD_handwash.jpg",
                            },
                            {
                                title: "so mittel",
                                scoresDelta: [-1, -1, 0],
                            },
                            {
                                title: "völlig unwichtig",
                                scoresDelta: [2, 1, -1],
                                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28coloured_version%29.png/128px-Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28coloured_version%29.png",
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
            } as Tool,
        ],
    },
    {
        id: 0,
        title: "Mittelalter: Welchem Stand gehörst du an?",
        tools: [],
    },
    {
        id: 0,
        title: "Welcher Herrscher-Typ bist du?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Statue-Augustus.jpg/256px-Statue-Augustus.jpg",
        tools: [],
    },
    {
        id: 0,
        title: "Finde deine historische Seelenverwandtschaft",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Carl_Friedrich_Gauss.jpg/256px-Carl_Friedrich_Gauss.jpg",
        tools: [],
    },
    {
        id: 0,
        title: "Teste deine Steinzeit-Instinkte",
        tools: [],
    },
];