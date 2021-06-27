import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Slider, TextField, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Add, GetApp } from "@material-ui/icons";
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

    const handleDescription = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setResult({ ...result, description: event.target.value });
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
        <Box width="100%">
            <Paper className={styles.paper} elevation={6}>
                <TextField className={styles.title} label="Result Title" variant="outlined" value={result.title} onChange={handleTitle()} />
                    {result.imageUrl === "" ? (
                        <Button className={styles.button} variant={"outlined"} color={"primary"} onClick={handleClickOpen}>
                            <Add/>
                            Image
                        </Button>
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
                <TextField
                    className={styles.title2}
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={result.description} 
                    onChange={handleDescription()}
                />
                <Typography variant="h6" gutterBottom>
                    Ideal score to achieve:
                </Typography>
                {result.idealScores.map((idealScore, index) => (
                    <div>
                        <Typography variant="button" gutterBottom>
                            {props.scoreNames[index]}:
                        </Typography>
                        <Box margin="auto" width="80%">
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
                        </Box>
                    </div>
                ))}
            </Paper>
        </Box>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            //margin: theme.spacing(1),
            width: "80%",
            margin: "auto",
            paddingTop: "8px",
        },
        title2: {
            width: "80%",
            margin: "auto",
            paddingBottom: "5px",
        },
        formControl: {
            margin: theme.spacing(1),
            width: 65
        },
        paper: {
            width: "60%",
            minHeight: 120,
            margin: "auto",
            justify: "center",
            alignItems: "center",
        },
        button: {
            marginTop: "10px",
            marginBottom: "10px"
        },
    }),
);