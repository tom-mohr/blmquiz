import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, TextField, Typography } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { QuizPossibleAnswer } from "../../../logic/quiz";

export default function AnswerCardComponent({ props, extraProps, callback }) {

    const [answer, setAnswer] = React.useState<QuizPossibleAnswer>(props);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const styles = useStyles();

    const updateAnswer = React.useCallback((ans) => { callback(ans) }, [callback]);

    React.useEffect(() => {
        updateAnswer(answer);
    }, [answer])

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer({ ...answer, title: event.target.value });
    };

    const handleImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer({ ...answer, imageUrl: event.target.value });
    };

    const handleScoreDelta = (index) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newScoresDelta = answer.scoresDelta;
        newScoresDelta[index] = parseInt(event.target.value, 10);
        setAnswer({ ...answer, scoresDelta: newScoresDelta });
    };

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <Paper className={styles.paper}>
            <TextField className={styles.title} label="Answer" variant="outlined" value={answer.title} onChange={handleTitle} />
            {answer.imageUrl === "" ? (
                <IconButton component="span" onClick={handleClickOpen}>
                    <GetApp/>
                    Image
                </IconButton>
            ) :
            <TextField className={styles.title} label="Image URL" value={answer.imageUrl} onChange={handleImageURL} />
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
                        value={answer.imageUrl}
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