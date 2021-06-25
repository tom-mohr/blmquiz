import * as React from "react";
import "./CardComponent.css";

interface CardComponentProps {
    title: string;
    imageUrl?: string;
    onClick?: () => void;
}

export class CardComponent extends React.Component<CardComponentProps, any> {

    render() {
        return <div className={"card-div"} onClick={() => this.props.onClick()}>
            <div className={"card-title"}>{this.props.title}</div>
                {this.props.imageUrl &&
                <div className={"card-img-wrapper"}>
                    <img className={"card-img"} src={this.props.imageUrl}/>
                </div>}
        </div>;
    }
}