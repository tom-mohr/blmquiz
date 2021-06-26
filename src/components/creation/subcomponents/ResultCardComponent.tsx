import React from 'react';
import { InputLabel, MenuItem, FormControl, Paper, Slider, TextField, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { QuizResult } from "../../../logic/quiz";

export default function ResultCardComponent({ props, extraProps }) {

    const [result, setResult] = React.useState<QuizResult>(props);

    const styles = useStyles();

    const handleTitle = () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setResult({ ...result, title: event.target.value });
    };

    const handleIdealScores = (index) => (event: any, newValue: number | number[]) => {
        const newIdealScores = result.idealScores;
        newIdealScores[index] = newValue as number;
        setResult({ ...result, idealScores: newIdealScores});
    };

    return (
        <Paper className={styles.paper}>
            <TextField className={styles.title} variant="outlined" value={result.title} onChange={handleTitle()} />
            {result.idealScores.map((idealScore, index) => (
                <div>
                    <Typography variant="button" gutterBottom>
                        {extraProps[index]}:
                    </Typography>
                    <Slider
                      defaultValue={0}
                      onChange={handleIdealScores(index)}
                      value={idealScore}
                      step={1}
                      marks
                      min={-10}
                      max={10}
                      valueLabelDisplay="auto"
                    />
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