import * as React from "react";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./OverviewComponent.css";
import {CardComponent} from "./cards/CardComponent";

interface OverviewComponentProps {
    onCreateButtonClicked: () => void;
    onModuleClicked: (id: number) => void;
}

interface BlmModule {
    id: number;
    title: string;
    imageUrl?: string;
}

const exampleModules: BlmModule[] = [
    {
        id: 0,
        title: "Welcher Herrscher-Typ bist du?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Statue-Augustus.jpg",
    },
    {
        id: 1,
        title: "Welche Epoche passt am besten zu dir?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Huber_Carl_III.Wilhelm.jpeg/800px-Huber_Carl_III.Wilhelm.jpeg",
    },
    {
        id: 2,
        title: "Finde deine historische Seelenverwandtschaft",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Carl_Friedrich_Gauss.jpg",
    },
    {
        id: 3,
        title: "Teste deine Steinzeit-Instinkte",
    },
    {
        id: 4,
        title: "Mittelalter: Welchem Stand gehörst du an?",
    }
];

export class OverviewComponent extends React.Component<OverviewComponentProps, any> {

    //todo
    private getNextCard(): BlmModule {
        // for testing
        const randomIndex = Math.floor(Math.random() * exampleModules.length);
        return exampleModules[randomIndex];
    }

    private getBlmModulesInColumns(): BlmModule[][] {
        const columns = [[], [], []];
        for (let i = 0; i < 8; i++) {

            // find smallest column
            const smallestColumn = Math.floor(Math.random() * columns.length); //todo

            columns[smallestColumn].push(this.getNextCard());
        }
        return columns;
    }

    render() {

        const columns = this.getBlmModulesInColumns();

        return <div className={"overview-main-div"}>
            <div className={"overview-top"}>
                <h1>Badisches Landesmuseum</h1>
            </div>

            <div className={"overview-card-container"}>
                {this.getBlmModulesInColumns().map(blmModules => <div className={"overview-card-container-column"}>
                    {blmModules.map(m =>
                        <CardComponent title={m.title} imageUrl={m.imageUrl} onClick={() => {this.props.onModuleClicked(m.id)}}/>
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
