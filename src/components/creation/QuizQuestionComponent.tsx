import React from 'react';
import { Box, Container, Grid, IconButton, Paper, TextField } from "@material-ui/core";
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
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField variant="outlined" value={questionProps.title} onChange={handleChange("title")} />
            </Grid>
            {questionProps.possibleAnswers.map((answer, index) => (
                <Box margin="auto" width="35%" paddingTop="8px">
                    <Grid item xs={6}>
                        <AnswerCardComponent props={answer} extraProps={props.scores} callback={updateAnswer}/>
                    </Grid>
                </Box>
            ))}
            <Grid item xs={6}>
                <IconButton component="span" onClick={addAnswer}>
                    <Add/>
                    Add Answer
                </IconButton>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            justify: "center",
            alignItems: "center",
        },
        padding: {
            padding: theme.spacing(2),
            textAlign: 'center',
          },
    }),
);