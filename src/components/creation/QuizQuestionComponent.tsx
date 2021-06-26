import React from 'react';
import { Container, Grid, IconButton, Paper, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./QuizTool.css";
import { Quiz, QuizQuestion, QuizResult } from "../../logic/quiz";

export default function QuizQuestionComponent({ props }) {

    const [questionProps, setQuestionProps] = React.useState<QuizQuestion>(props.question);

    const styles = useStyles();

    const handleChange = (prop: keyof QuizQuestion) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionProps({ ...questionProps, [prop]: event.target.value });
    };

    const addAnswer = () => {
        const emptyAnswer = {
            title: "testTitle",
            imageUrl: "",
            scoresDelta: [],
        };
        const newPossibleAnswers = [...questionProps.possibleAnswers, emptyAnswer];
        setQuestionProps({...questionProps, possibleAnswers: newPossibleAnswers});
    }

    return (
        <div className={"quiz-div"}>
            <TextField variant="outlined" value={questionProps.title} onChange={handleChange("title")} />
            <Grid container justify="space-evenly" alignItems="flex-start" spacing={3}>
                {questionProps.possibleAnswers.map((answer, index) => (
                    <Grid item xs={6}>
                        <TextField variant="outlined" value={answer.title}/>
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
            justify: "flex-start",
            alignItems: "center",
        },
    }),
);