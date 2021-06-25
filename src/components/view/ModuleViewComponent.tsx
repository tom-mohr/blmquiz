import * as React from "react";
import {Button} from "@material-ui/core";

interface ModuleViewComponentProps {
    onBackButtonClicked: () => void;
    viewModuleId: number;
}

export class ModuleViewComponent extends React.Component<ModuleViewComponentProps, any> {
    render() {
        //todo
        return <div>
            <Button onClick={() => this.props.onBackButtonClicked()}>Zurück</Button>
            <p>Modul-ID: {this.props.viewModuleId}</p>
        </div>
    }
}