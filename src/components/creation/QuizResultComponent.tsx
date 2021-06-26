import React from 'react';
import { Container, Grid, IconButton, Paper, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./QuizResultComponent.css";
import { Quiz, QuizQuestion, QuizResult } from "../../logic/quiz";

export default function QuizResultComponent({ props }) {

    const [resultProps, setResultProps] = React.useState<QuizResult>(props.result);

    const styles = useStyles();

    const handleChange = (prop: keyof QuizQuestion) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setResultProps({ ...resultProps, [prop]: event.target.value });
    };

    return (
        <div className={"result-div"}>
            <TextField variant="outlined" value={resultProps.title} onChange={handleChange("title")} />
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