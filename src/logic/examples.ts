import {Module, Quiz, Tool, ToolType} from "./quiz";

export const exampleModules: Module[] = [
    {
        id: 0,
        title: "Which epoch fits you the best?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Huber_Carl_III.Wilhelm.jpeg/256px-Huber_Carl_III.Wilhelm.jpeg",
        tools: [
            {
                id: 0,
                type: ToolType.Quiz,
                scoreNames: ["Middle Ages", "Baroque", "Modern Era"],
                results: [
                    {
                        title: "Middle Ages",
                        idealScores: [2, 1, -1],
                        description: "You are perfectly suited for fighting against dragons.",
                        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/Otto_I_Manuscriptum_Mediolanense_c_1200.jpg",
                    },
                    {
                        title: "Baroque",
                        idealScores: [1, 3, -1],
                    },
                    {
                        title: "Modern Era",
                        idealScores: [-3, -1, 2],
                    },
                ],
                questions: [
                    {
                        title: "How important is hygiene to you?",
                        possibleAnswers: [
                            {
                                title: "Very important, I wash my hands all the time.",
                                scoresDelta: [-2, -1, 1],
                                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/CPMC_Surgery_%28412142792%29.jpg/320px-CPMC_Surgery_%28412142792%29.jpg",
                            },
                            {
                                title: "I shower once a week.",
                                scoresDelta: [-1, -1, 0],
                                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/OCD_handwash.jpg/128px-OCD_handwash.jpg",
                            },
                            {
                                title: "Shower? What is that?",
                                scoresDelta: [2, 1, -1],
                                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28coloured_version%29.png/128px-Paul_F%C3%BCrst%2C_Der_Doctor_Schnabel_von_Rom_%28coloured_version%29.png",
                            }
                        ],
                    },
                    {
                        title: "Do you value political participation?",
                        possibleAnswers: [
                            {
                                title: "Democracy rules!",
                                scoresDelta: [-1, -2, 1],
                                imageUrl: "https://www.ksl-nrw.de/public/inline-images/mitbestimmung.png",
                            },
                            {
                                title: "Politics is for nerds.",
                                scoresDelta: [0, 2, 0],
                                imageUrl: "https://t3.ftcdn.net/jpg/00/35/06/80/360_F_35068034_EeG6q5eo1LfAE5lSpCSKwNObyVmNlg0q.jpg",
                            },
                        ],
                    },
                    {
                        title: "Are you religious?",
                        possibleAnswers: [
                            {
                                title: "I go to church every sunday.",
                                scoresDelta: [2, 1, 0],
                            },
                            {
                                title: "I'm not sure, but Christmas is nice!",
                                scoresDelta: [-1, 1, 1],
                            },
                            {
                                title: "Pie in the sky? Doesn't make sense to me.",
                                scoresDelta: [-3, 0, 1],
                            },
                        ],
                    }
                ],
            } as Tool,
        ],
    },
    {
        id: 0,
        title: "Middle Ages: Which estate of the realm do you belong to?",
        tools: [],
    },
    {
        id: 0,
        title: "What kind of ruler are you?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Statue-Augustus.jpg/256px-Statue-Augustus.jpg",
        tools: [],
    },
    {
        id: 0,
        title: "Find your historical role model",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Carl_Friedrich_Gauss.jpg/256px-Carl_Friedrich_Gauss.jpg",
        tools: [],
    },
    {
        id: 0,
        title: "Test your Stone Age instincts",
        tools: [],
    },
];