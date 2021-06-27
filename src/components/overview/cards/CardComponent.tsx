import * as React from "react";
import "./CardComponent.css";
import {CSSProperties} from "react";

interface CardComponentProps {
    title: string;
    imageUrl?: string;
    onClick?: () => void;
    style?: CSSProperties;

    /**
     * Default is false.
     */
    responsive?: boolean;
}

export class CardComponent extends React.Component<CardComponentProps, any> {

    render() {

        const react = this.props.responsive === undefined ? true : this.props.responsive;

        return <div style={this.props.style}
                    className={`card-div ${react ? "card-div-responsive" : "card-div-not-responsive"}`}
                    onClick={() => {if (this.props.onClick) this.props.onClick();}}>
            <div className={"card-title"}>{this.props.title}</div>
            {this.props.children}
            {this.props.imageUrl &&
            <div className={"card-img-wrapper"}>
                <img className={"card-img"} src={this.props.imageUrl}/>
            </div>}
        </div>;
    }
}