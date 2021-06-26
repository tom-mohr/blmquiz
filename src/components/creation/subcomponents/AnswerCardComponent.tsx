import React from 'react';
import { InputLabel, MenuItem, FormControl, Paper, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { QuizPossibleAnswer } from "../../../logic/quiz";

export default function AnswerCardComponent({ props, extraProps, callback }) {

    const [answer, setAnswer] = React.useState<QuizPossibleAnswer>(props);

    const styles = useStyles();

    const updateAnswer = React.useCallback((ans) => {callback(ans)}, [callback]);

    React.useEffect(() => {
        updateAnswer(answer);
    }, [answer])

    const handleTitle = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer({ ...answer, title: event.target.value });
    };

    const handleScoreDelta = (index) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newScoresDelta = answer.scoresDelta;
        newScoresDelta[index] = parseInt(event.target.value, 10);
        setAnswer({ ...answer, scoresDelta: newScoresDelta});
    };

    return (
        <Paper className={styles.paper}>
            <TextField className={styles.title} variant="outlined" value={answer.title} onChange={handleTitle()} />
            {extraProps.map((score, index) => (
                <div>
                    <Typography variant="button" gutterBottom>
                        {score}:
                    </Typography>
                    <TextField className={styles.formControl} defaultValue={0} size="small" type="number" variant="outlined" value={props.scoresDelta[index]} onChange={handleScoreDelta(index)} />
                </div>
            ))}
        </Paper>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(1),
            width: 200
        },
        formControl: {
            margin: theme.spacing(1),
            width: 65
        },
        paper: {
            width: 250,
            minHeight: 120,
            justify: "center",
            alignItems: "center",
        },
    }),
);