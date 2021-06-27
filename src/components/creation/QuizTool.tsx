import React from 'react';
import { Button, Container, Grid, IconButton, Paper, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./QuizTool.css";
import { Quiz, QuizQuestion, QuizResult } from "../../logic/quiz";
import QuizQuestionComponent from "./QuizQuestionComponent";
import QuizResultComponent from "./QuizResultComponent";
import { getExtremesPerCategory } from "../../logic/quizAnswerMatching";

export default function QuizTool({ props, callback }) {

    const [quizProps, setQuizProps] = React.useState<Quiz>(props);

    const styles = useStyles();

    const updateModule = React.useCallback((quiz) => {callback(quiz)}, [callback]);

    React.useEffect(() => {
        updateModule(quizProps);
    }, [quizProps])

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
        return (<QuizQuestionComponent props={questionProps} callback={updateQuestion}/>);
    }

    const addQuestion = () => {
        const emptyQuestion = {
            id: quizProps.questions.length,
            title: "Enter a question!",
            possibleAnswers: [],
        };
        const newQuestions = [...quizProps.questions, emptyQuestion];
        setQuizProps({ ...quizProps, questions: newQuestions });
    }

    const updateQuestion = (question) => {
        const newQuestions = quizProps.questions;
        newQuestions[question.id] = question;
        setQuizProps({ ...quizProps, questions: newQuestions });
    }

    const getResultComponentFromResult = (result) => {
        const resultProps = { result: result, scoreNames: quizProps.scoreNames, ranges: getExtremesPerCategory(quizProps.scoreNames.length, quizProps.questions)};
        return (<QuizResultComponent props={resultProps} callback={updateResult}/>);
    }

    const addResult = () => {
        const emptyResult = {
            id: quizProps.results.length,
            title: "Enter a result Title!",
            description: "",
            imageUrl: "",
            infoLink: "",
            idealScores: [],
        };
        quizProps.scoreNames.forEach(element => {
            emptyResult.idealScores.push(0);
        });
        const newResults = [...quizProps.results, emptyResult];
        setQuizProps({ ...quizProps, results: newResults });
    }

    const updateResult = (result) => {
        const newResults = quizProps.results;
        newResults[result.id] = result;
        setQuizProps({ ...quizProps, results: newResults });
    }

    return (
        <Grid container className={styles.container} spacing={6}>
            <Grid item xs={12}>
                <Paper className={styles.paper} elevation={4}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        {quizProps.scoreNames.map((scoreName, index) => (
                            <Grid item>
                                <TextField id={scoreName} variant="outlined" value={scoreName} onChange={handleScoreNameChange(index)} />
                            </Grid>
                        ))}
                        <Grid item>
                            <Button className={styles.button} color={"primary"}  variant={"contained"} onClick={addScore}>
                                <Add />
                                Add Score
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={styles.paper} elevation={4}>
                    <Grid container spacing={3}>
                        {quizProps.questions.map((question, index) => (
                            <Grid item xs={12}>
                                {getQuestionComponentFromQuestion(question)}
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item>
                        <Button className={styles.button} color={"primary"}  variant={"contained"} onClick={addQuestion}>
                            <Add />
                            Add Question
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={styles.paper} >
                    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                        {quizProps.results.map((result, index) => (
                            <Grid item>
                                {getResultComponentFromResult(result)}
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item>
                        <Button className={styles.button} color={"primary"}  variant={"contained"} onClick={addResult}>
                            <Add />
                            Add Result
                        </Button>
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
        paper: {
            padding: 30,
            textAlign: 'center',
            elevation: 4,
        },
        button: {
            marginTop: "10px",
            marginBottom: "10px"
        },
    }),
);