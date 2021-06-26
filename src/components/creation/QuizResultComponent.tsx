import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Slider, TextField, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GetApp } from "@material-ui/icons";
import { QuizResult } from "../../logic/quiz";
import { getExtremesPerCategory } from "../../logic/quizAnswerMatching";

export default function QuizResultComponent({ props, callback }) {

    const [result, setResult] = React.useState<QuizResult>(props.result);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const styles = useStyles();

    const updateResult = React.useCallback((res) => {callback(res)}, [callback]);

    React.useEffect(() => {
        updateResult(result);
    }, [result])

    const handleTitle = () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setResult({ ...result, title: event.target.value });
    };

    const handleImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResult({ ...result, imageUrl: event.target.value });
    };

    const handleIdealScores = (index) => (event: any, newValue: number | number[]) => {
        const newIdealScores = result.idealScores;
        newIdealScores[index] = newValue as number;
        setResult({ ...result, idealScores: newIdealScores});
    };

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <Paper className={styles.paper} elevation={6}>
            <TextField className={styles.title} variant="outlined" value={result.title} onChange={handleTitle()} />
            {result.imageUrl === "" ? (
                <IconButton component="span" onClick={handleClickOpen}>
                    <GetApp/>
                    Image
                </IconButton>
            ) :
            <TextField className={styles.title} label="Image URL" value={result.imageUrl} onChange={handleImageURL} />
            }
            <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
                <DialogContent>
                    <IconButton component="span" onClick={() => {}}>
                        <GetApp/>
                        Upload
                    </IconButton>
                    <DialogContentText>
                        or
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Image URL"
                        value={result.imageUrl}
                        onChange={handleImageURL}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Typography variant="h6" gutterBottom>
                Ideal score to achieve:
            </Typography>
            {result.idealScores.map((idealScore, index) => (
                <div>
                    <Typography variant="button" gutterBottom>
                        {props.scoreNames[index]}:
                    </Typography>
                    <Slider
                      defaultValue={0}
                      onChange={handleIdealScores(index)}
                      value={idealScore}
                      step={1}
                      marks
                      min={props.ranges[index].min}
                      max={props.ranges[index].max}
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
            width: 300,
            minHeight: 120,
            justify: "center",
            alignItems: "center",
        },
    }),
);