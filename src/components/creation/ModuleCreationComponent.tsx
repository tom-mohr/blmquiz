import React from 'react';
import {Container, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {CameraAlt, Close, FeaturedVideo, FilterFrames, Forum, Help, Link, Message, Mic, Room, Publish, Videocam} from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import "./ModuleCreationComponent.css";

export default function ModuleCreationComponent({props}) {
//export class ModuleCreationComponent extends React.Component<MyProps, any> {

	const styles = useStyles();

	//render() {
		return (
			<div className={"creation-div"}>
				<TextField id="module-name-input" label="Module Name" variant="outlined"/>
				<Grid container className={styles.container} spacing={3}>
					<Grid item xs={2}>
						<Paper className={styles.paper}>
							Tools
							<Grid container>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <Videocam fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <Message fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <Mic fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <Room fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <CameraAlt fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <Link fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <Forum fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <Help fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <FilterFrames fontSize="large"/>
        							</IconButton>
								</Grid>
								<Grid item xs={6}>
									<IconButton component="span" onClick={props.onBackButtonClicked}>
        							  <FeaturedVideo fontSize="large"/>
        							</IconButton>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={10}>
						<Paper className={styles.paper}>
							Module
						</Paper>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item>
						<IconButton component="span" onClick={props.onBackButtonClicked}>
        				  <Close fontSize="large"/>
						  Cancel
        				</IconButton>
					</Grid>
					<Grid item>
						<IconButton component="span" onClick={props.onBackButtonClicked}>
        				  <Publish fontSize="large"/>
						  Publish
        				</IconButton>
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
			height: 310,
		},
	}),
);
