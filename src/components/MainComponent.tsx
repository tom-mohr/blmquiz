import * as React from "react";
import {Button} from "@material-ui/core";
import "./MainComponent.css";

export class MainComponent extends React.Component<any, any> {
    render() {
        return <div className={"main-div"}>
            <Button variant={"contained"} color={"primary"}>Hello World!</Button>
        </div>;
    }
}