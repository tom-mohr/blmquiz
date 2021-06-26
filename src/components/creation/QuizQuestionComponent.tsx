import React from 'react';
import {Container, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./QuizTool.css";
import {Quiz, QuizQuestion, QuizResult} from "../../logic/quiz";

export default function QuizQuestionComponent({props}) {

    const [questionProps, setQuestionProps] = React.useState<QuizQuestion>(props.question);

    const styles = useStyles();

    const handleChange = (prop: keyof QuizQuestion) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionProps({ ...questionProps, [prop]: event.target.value });
    };

    return(
        <div className={"quiz-div"}>
            <TextField variant="outlined" value={questionProps.title} onChange={handleChange("title")}/>
            <IconButton component="span" onClick={() => {}}>
        		<Add fontSize="large"/>
        	</IconButton>
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