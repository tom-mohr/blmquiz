import React from 'react';
import { Container, Grid, IconButton, Paper, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./QuizQuestionComponent.css";
import { Quiz, QuizQuestion, QuizResult } from "../../logic/quiz";
import AnswerCardComponent from './subcomponents/AnswerCardComponent';

export default function QuizQuestionComponent({ props, callback }) {

    const [questionProps, setQuestionProps] = React.useState<QuizQuestion>(props.question);

    const styles = useStyles();

    const updateQuestion = React.useCallback((question) => {callback(question)}, [callback]);

    React.useEffect(() => {
        updateQuestion(questionProps);
    }, [questionProps])

    const handleChange = (prop: keyof QuizQuestion) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionProps({ ...questionProps, [prop]: event.target.value });
    };

    const addAnswer = () => {
        const emptyAnswer = {
            id: questionProps.possibleAnswers.length,
            title: "testTitle",
            imageUrl: "",
            scoresDelta: [],
        };
        props.scores.forEach(element => {
            emptyAnswer.scoresDelta.push(0);
        });
        const newPossibleAnswers = [...questionProps.possibleAnswers, emptyAnswer];
        setQuestionProps({...questionProps, possibleAnswers: newPossibleAnswers});
    }

    const updateAnswer = (answer) => {
        const newPossibleAnswers = questionProps.possibleAnswers;
        newPossibleAnswers[answer.id] = answer;
        setQuestionProps({ ...questionProps, possibleAnswers: newPossibleAnswers });
    }

    return (
        <div className={"question-div"}>
            <TextField variant="outlined" value={questionProps.title} onChange={handleChange("title")} />
            <Grid container direction="row" justify="space-around" alignItems="baseline" spacing={3}>
                {questionProps.possibleAnswers.map((answer, index) => (
                    <Grid item xs={6}>
                        <AnswerCardComponent props={answer} extraProps={props.scores} callback={updateAnswer}/>
                    </Grid>
                ))}
                <Grid item xs={6}>
                    <IconButton component="span" onClick={addAnswer}>
                        <Add/>
                        Add Answer
                    </IconButton>
                </Grid>
            </Grid>
        </div>
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