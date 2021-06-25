import * as React from "react";
import "./MainComponent.css";
import {OverviewComponent} from "./overview/OverviewComponent";
import ModuleCreationComponent from "./creation/ModuleCreationComponent";
import {ModuleViewComponent} from "./view/ModuleViewComponent";

enum DisplayScreen {
    Overview = 0,
    Creation = 1,
    View = 2,
}

interface MainComponentState {
    displayScreen: DisplayScreen;
    viewModuleId: number;
}

export class MainComponent extends React.Component<any, MainComponentState> {

    constructor(props: Readonly<any> | any) {
        super(props);

        this.state = {
            displayScreen: DisplayScreen.Overview,
            viewModuleId: -1,
        };
    }

    private moduleCreationProps: any = {onBackButtonClicked: () => this.setState({displayScreen: DisplayScreen.Overview})};

    private getDisplayScreenComponent(): JSX.Element {
        switch (this.state.displayScreen) {
            case DisplayScreen.Creation:
                return <ModuleCreationComponent props = {this.moduleCreationProps}/>;
            case DisplayScreen.View:
                return <ModuleViewComponent onBackButtonClicked={() => this.setState({displayScreen: DisplayScreen.Overview})}
                                            viewModuleId={this.state.viewModuleId} />;
            case DisplayScreen.Overview:
            default:
                return <OverviewComponent
                    onModuleClicked={(id: number) => this.setState({displayScreen: DisplayScreen.View, viewModuleId: id})}
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