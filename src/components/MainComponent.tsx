import * as React from "react";
import "./MainComponent.css";
import {OverviewComponent} from "./overview/OverviewComponent";

enum DisplayScreen {
    Overview = 0,
    Creation = 1,
    View = 2,
}

interface MainComponentState {
    displayScreen: DisplayScreen;
}

export class MainComponent extends React.Component<any, MainComponentState> {

    constructor(props: Readonly<any> | any) {
        super(props);

        this.state = {
            displayScreen: DisplayScreen.Overview,
        };
    }

    private getDisplayScreenComponent(): JSX.Element {
        switch (this.state.displayScreen) {
            case DisplayScreen.Creation:
                return <></>;
            case DisplayScreen.View:
                return <></>;
            case DisplayScreen.Overview:
            default:
                return <OverviewComponent
                    onCreateButtonClicked={() => this.setState({displayScreen: DisplayScreen.Creation})}
                />;
        }
    }

    render() {
        return <div className={"main-div"}>
            {this.getDisplayScreenComponent()}
        </div>;
    }
}