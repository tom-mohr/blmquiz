import React from 'react';
import {Button, Container, Grid, Paper, TextField} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./ModuleCreationComponent.css";

export default function ModuleCreationComponent({props}) {
//export class ModuleCreationComponent extends React.Component<MyProps, any> {

	const styles = useStyles();

	//render() {
		return (
			<div className={"creation-div"}>
				<Button variant={"contained"} color={"primary"} onClick={props.onBackButtonClicked}>Back!</Button>
				<Grid container className={styles.root} spacing={2} direction="row" justify="center">
					<Grid item xs={12}>
						<Paper >
							Tools
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Container maxWidth="sm">
							<TextField id="module-name-input" label="Module Name" variant="outlined" />
							<Paper>
								Module
							</Paper>
						</Container>
					</Grid>
				</Grid>
				<Button variant={"contained"} color={"primary"} onClick={() => { }}>Publish!</Button>
			</div>
		)
	//}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);
