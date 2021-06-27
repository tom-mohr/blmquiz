import React, { useCallback } from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, TextField, Typography} from "@material-ui/core";
import { CameraAlt, Close, FeaturedVideo, FilterFrames, Forum, GetApp, Help, Link, Message, Mic, Room, Publish, Videocam } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./ModuleCreationComponent.css";
import { Module,ToolType } from "../../logic/quiz";
import { ModuleServerProvider } from "../../logic/module_server/ModuleServerProvider";
import QuizTool from "./QuizTool";


export default function ModuleCreationComponent({ props }) {
	//export class ModuleCreationComponent extends React.Component<MyProps, any> {

	const moduleServer = ModuleServerProvider.getServer();

	const [moduleProps, setModuleProps] = React.useState<Module>(
		{
			id: 0,
			title: '',
			imageUrl: '',
			tools: [],
		});
	const [dialogOpen, setDialogOpen] = React.useState(false);

	const handleChange = (prop: keyof Module) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setModuleProps({ ...moduleProps, [prop]: event.target.value });
	};

	const updateModuleTool = (tool) => {
		const updatedTools = moduleProps.tools;
		updatedTools[tool.id] = tool;
		setModuleProps({ ...moduleProps, tools: updatedTools });
	};

	const addQuizTool = () => {
		const emptyQuiz = {
			id: moduleProps.tools.length,
			type: ToolType.Quiz,
			scoreNames: ["Score 1"],
			results: [],
			questions: [],
		}
		const newTools = [...moduleProps.tools, emptyQuiz]

		setModuleProps({ ...moduleProps, tools: newTools });
	}

	const getComponentFromTool = (tool) => {
		if (tool.type === ToolType.Quiz) {
			return (<QuizTool props={tool} callback={updateModuleTool} />);
		}
		else {
			return null;
		}
	}

	const publish = () => {
		console.log(moduleProps);
		moduleServer.addModule(moduleProps);
		props.onBackButtonClicked();
	}

	const styles = useStyles();

	const handleClickOpen = () => {
		setDialogOpen(true);
	};

	const handleClose = () => {
			setDialogOpen(false);
	};

	//render() {
	return (
		<div className={"creation-div"}>
			<TextField id="module-name-input" label="Module Name" variant="outlined" value={moduleProps.title} onChange={handleChange('title')} />
			<Box paddingBottom="15px">
				{moduleProps.imageUrl === "" ? (
						<IconButton component="span" onClick={handleClickOpen}>
								<GetApp/>
								Image
						</IconButton>
				) :
				<TextField className={styles.title} label="Image URL" variant="outlined" value={moduleProps.imageUrl} onChange={handleChange("imageUrl")} />
				}
			</Box>
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
                        value={moduleProps.imageUrl}
                        onChange={handleChange("imageUrl")}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
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
							<Button fullWidth={true} variant={"outlined"} color={"primary"} onClick={props.onBackButtonClicked}>
								<Close fontSize="large" />
								Cancel
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button fullWidth={true} variant={"contained"} color={"primary"} onClick={publish}>
								<Publish fontSize="large" />
								Publish
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={10}>
					{moduleProps.tools.length === 0 ? (
						<div className={"center-text"}>
							Use Tools on the right to add content to the module!
						</div>
					) : null}
					<Grid container spacing={6}>
						{moduleProps.tools.map((tool) => (
							<Grid item xs={12}>
								{getComponentFromTool(tool)}
							</Grid>
						))}
					</Grid>
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
			backgroundColor: "Gainsboro",
		},
		title: {
			margin: theme.spacing(2),
		},
	}),
);
