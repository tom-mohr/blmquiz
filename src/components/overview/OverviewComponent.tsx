import * as React from "react";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./OverviewComponent.css";
import {CardComponent} from "./cards/CardComponent";
import {ModuleServerProvider} from "../../logic/module_server/ModuleServerProvider";
import {Module} from "../../logic/quiz";

interface OverviewComponentProps {
    onCreateButtonClicked: () => void;
    onModuleClicked: (id: number) => void;
}

export class OverviewComponent extends React.Component<OverviewComponentProps, any> {

    private getModulesInColumns(): Module[][] {

        const modules = ModuleServerProvider.getServer().getAllModules();
        const columns = [[], [], []];
        const columnHeights = [0, 0, 0]

        for (let module of modules) {

            // add to smallest column
            const smallestColumn = this.getIndexOfMin(columnHeights);

            columns[smallestColumn].push(module);

            const moduleHeight = module.imageUrl ? 2 : 1;
            columnHeights[smallestColumn] += moduleHeight;
        }
        return columns;
    }

    private getIndexOfMin(values: number[]): number {
        if (!values.length) {
            return -1;
        }

        let minIndex = 0;
        let min = values[0];
        for (let i = 1; i < values.length; i++) {
            if (values[i] < min) {
                minIndex = i;
            }
        }

        return minIndex;
    }

    render() {

        return <div className={"overview-main-div"}>
            <div className={"overview-top"}>
                <h1 style={{color: "#a88a49"}}>Badisches Landesmuseum</h1>
            </div>

            <div className={"overview-card-container"}>
                {this.getModulesInColumns().map((modules, col) => <div key={col} className={"overview-card-container-column"}>
                    {modules.map(m =>
                        <CardComponent key={m.id} title={m.title} imageUrl={m.imageUrl} onClick={() => {this.props.onModuleClicked(m.id)}}/>
                    )}
                </div>)}
            </div>

            <Fab
                style={{position: "absolute", bottom: "32px", right: "12px"}}
                color="primary" aria-label="add"
                onClick={() => this.props.onCreateButtonClicked()}>
                <AddIcon />
            </Fab>
        </div>;
    }
}
