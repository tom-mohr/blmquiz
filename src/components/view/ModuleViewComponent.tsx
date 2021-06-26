import * as React from "react";
import {Button} from "@material-ui/core";
import {ModuleServerProvider} from "../../logic/module_server/ModuleServerProvider";
import {Quiz, ToolType} from "../../logic/quiz";
import {QuizViewComponent} from "./QuizViewComponent";
import "./ModuleViewComponent.css";
import {ArrowBack} from "@material-ui/icons";

interface ModuleViewComponentProps {
    onBackButtonClicked: () => void;
    viewModuleId: number;
}

export class ModuleViewComponent extends React.Component<ModuleViewComponentProps, any> {
    render() {

        const module = ModuleServerProvider.getServer().getModule(this.props.viewModuleId);

        return <div className={"module-view-main-div"}>
            <div className={"module-view-main-div-top"}>
                <Button variant={"outlined"} color={"primary"} onClick={() => this.props.onBackButtonClicked()}>
                    <ArrowBack/>Back
                </Button>
            </div>
            <div className={"module-view-main-div-inner"}>
                <h1>{module.title}</h1>
                <img className={"module-view-image"} src={module.imageUrl}/>
                {module.tools.map((tool, index) => {
                    if (tool.type === ToolType.Quiz) {
                        return <QuizViewComponent key={index} quiz={tool as Quiz}/>
                    } else {
                        return <p>(This tool ({tool.type}) can't be displayed.)</p>;
                    }
                })}
            </div>
        </div>
    }
}