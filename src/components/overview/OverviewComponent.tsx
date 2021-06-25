import * as React from "react";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./OverviewComponent.css";

interface OverviewComponentProps {
    onCreateButtonClicked: () => void;
}

export class OverviewComponent extends React.Component<OverviewComponentProps, any> {

    render() {
        return <div className={"overview-main-div"}>
            <div className={"overview-top"}>
                <h1>Badisches Landesmuseum</h1>
            </div>
            <Fab
                style={{position: "absolute", bottom: "10px", right: "10px"}}
                color="primary" aria-label="add"
                onClick={() => this.props.onCreateButtonClicked()}>
                <AddIcon />
            </Fab>
        </div>;
    }
}
