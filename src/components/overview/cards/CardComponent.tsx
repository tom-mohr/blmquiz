import * as React from "react";
import "./CardComponent.css";
import {CSSProperties} from "react";

interface CardComponentProps {
    title: string;
    imageUrl?: string;
    onClick?: () => void;
    style?: CSSProperties;
}

export class CardComponent extends React.Component<CardComponentProps, any> {

    render() {
        return <div style={this.props.style} className={"card-div"} onClick={() => {if (this.props.onClick) this.props.onClick();}}>
            <div className={"card-title"}>{this.props.title}</div>
                {this.props.imageUrl &&
                <div className={"card-img-wrapper"}>
                    <img className={"card-img"} src={this.props.imageUrl}/>
                </div>}
        </div>;
    }
}