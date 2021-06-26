import React from 'react';
import { Container, Grid, IconButton, Paper, TextField } from "@material-ui/core";
import { CameraAlt, Close, FeaturedVideo, FilterFrames, Forum, Help, Link, Message, Mic, Room, Publish, Videocam } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./ModuleCreationComponent.css";
import { Module, Quiz, QuizQuestion, QuizResult, ToolType } from "../../logic/quiz";
import QuizTool from "./QuizTool";

export default function ModuleCreationComponent({ props }) {
	//export class ModuleCreationComponent extends React.Component<MyProps, any> {

	const [moduleProps, setModuleProps] = React.useState<Module>(
		{
			id: 0,
			title: '',
			imageUrl: '',
			tools: [],
		});

	const handleChange = (prop: keyof Module) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setModuleProps({ ...moduleProps, [prop]: event.target.value });
	};

	const addQuizTool = () => {
		const emptyQuiz = {
			type: ToolType.Quiz,
			scoreNames: ["Score 1"],
			results: [],
			questions: [],
		}
		const newTools = [...moduleProps.tools, emptyQuiz]

		setModuleProps({ ...moduleProps, tools: newTools });
		console.log(moduleProps);
		console.log(moduleProps.tools);
	}

	const getComponentFromTool = (tool) => {
		console.log(tool);
		if (tool.type === ToolType.Quiz) {
			console.log("Das war ein Erfolg");
			const quizProps = { quiz: tool };
			return (<QuizTool props={quizProps} />);
		}
		else {
			return null;
		}
	}

	const styles = useStyles();

	//render() {
	return (
		<div className={"creation-div"}>
			<TextField id="module-name-input" label="Module Name" variant="outlined" value={moduleProps.title} onChange={handleChange('title')} />
			<Grid container className={styles.container} spacing={3}>
				<Grid item xs={2}>
					<Paper className={styles.paper}>
						Tools
						<Grid container>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<Videocam fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<Message fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<Mic fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<Room fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<CameraAlt fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<Link fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<Forum fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<Help fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={props.onBackButtonClicked}>
									<FilterFrames fontSize="large" />
								</IconButton>
							</Grid>
							<Grid item xs={6}>
								<IconButton component="span" onClick={addQuizTool}>
									<FeaturedVideo fontSize="large" />
								</IconButton>
							</Grid>
						</Grid>
					</Paper>
					<Grid container>
						<Grid item xs={12}>
							<IconButton component="span" onClick={props.onBackButtonClicked}>
								<Close fontSize="large" />
								Cancel
							</IconButton>
						</Grid>
						<Grid item xs={12}>
							<IconButton component="span" onClick={props.onBackButtonClicked}>
								<Publish fontSize="large" />
								Publish
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={10}>
					<Paper className={styles.paper}>
						Use Tools on the right to add content to the module!
						<Grid container spacing={10}>
							{moduleProps.tools.map((tool) => (
								<Grid item xs={12}>
									{getComponentFromTool(tool)}
								</Grid>
							))}
						</Grid>
					</Paper>
				</Grid>
			</Grid>

		</div>
	)
	//}
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			//flexGrow: 1,
			display: "flex",
			direction: "row",
			justify: "center",
			alignItems: "center",
		},
		module: {
			direction: "column",
			justify: "center",
			alignItems: "center",
		},
		paper: {
			textAlign: 'center',
		},
	}),
);
