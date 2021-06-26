import React from 'react';
import { Container, Grid, IconButton, Paper, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./QuizTool.css";
import { Quiz, QuizQuestion, QuizResult } from "../../logic/quiz";
import QuizQuestionComponent from "./QuizQuestionComponent";
import QuizResultComponent from "./QuizResultComponent";

export default function QuizTool({ props }) {

    const [quizProps, setQuizProps] = React.useState<Quiz>(props.quiz);

    const styles = useStyles();

    const handleScoreNameChange = (index) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedScoreNames = quizProps.scoreNames;
        updatedScoreNames[index] = event.target.value;
        setQuizProps({ ...quizProps, scoreNames: updatedScoreNames });
    };

    const addScore = () => {
        const newScoreNames = [...quizProps.scoreNames, "Score " + (quizProps.scoreNames.length + 1)];
        setQuizProps({ ...quizProps, scoreNames: newScoreNames });
    }

    const getQuestionComponentFromQuestion = (question) => {
        const questionProps = { question: question, scores:  quizProps.scoreNames};
        return (<QuizQuestionComponent props={questionProps} />);
    }

    const addQuestion = () => {
        const emptyQuestion = {
            title: "Enter a question!",
            possibleAnswers: [],
        };
        const newQuestions = [...quizProps.questions, emptyQuestion];
        setQuizProps({ ...quizProps, questions: newQuestions });
    }

    const getResultComponentFromResult = (result) => {
        const resultProps = { result: result };
        return (<QuizResultComponent props={resultProps} />);
    }

    const addResult = () => {
        const emptyResult = {
            title: "Enter a result Title!",
            description: "",
            imageUrl: "",
            infoLink: "",
            idealScores: [],
        };
        const newResults = [...quizProps.results, emptyResult];
        setQuizProps({ ...quizProps, results: newResults });
    }

    return (
        <Grid container className={styles.container} spacing={6}>
            <Grid item xs={12}>
                <Paper elevation={4}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        {quizProps.scoreNames.map((scoreName, index) => (
                            <Grid item>
                                <TextField id={scoreName} variant="outlined" value={scoreName} onChange={handleScoreNameChange(index)} />
                            </Grid>
                        ))}
                        <Grid item>
                            <IconButton component="span" onClick={addScore}>
                                <Add />
                                Add Score
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={4}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        {quizProps.questions.map((question, index) => (
                            <Grid item>
                                {getQuestionComponentFromQuestion(question)}
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item>
                        <IconButton component="span" onClick={addQuestion}>
                            <Add fontSize="large" />
                            Add Question
                        </IconButton>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={4}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        {quizProps.results.map((result, index) => (
                            <Grid item>
                                {getResultComponentFromResult(result)}
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item>
                        <IconButton component="span" onClick={addResult}>
                            <Add fontSize="large" />
                            Add Result
                        </IconButton>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            direction: "column",
            justify: "center",
            alignItems: "center",
        },
    }),
);