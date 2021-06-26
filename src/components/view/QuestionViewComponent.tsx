import * as React from "react";
import {CardComponent} from "../overview/cards/CardComponent";
import {QuizQuestion} from "../../logic/quiz";
import {CSSProperties} from "react";

interface QuestionViewComponentProps {
    question: QuizQuestion;
    onChange: () => void;
}

interface QuestionViewComponentState {
    selectedIndex: number;
}

export class QuestionViewComponent extends React.Component<QuestionViewComponentProps, QuestionViewComponentState> {

    constructor(props: Readonly<QuestionViewComponentProps> | QuestionViewComponentProps) {
        super(props);

        this.state = {
            selectedIndex: -1,
        };
    }

    public getSelectedAnswerIndex(): number {
        return this.state.selectedIndex;
    }

    private clickedOnAnswer(index: number): void {
        if (this.state.selectedIndex === index) {
            this.setState({selectedIndex: -1});
        } else {
            this.setState({selectedIndex: index});
        }
    }

    componentDidUpdate(prevProps: Readonly<QuestionViewComponentProps>, prevState: Readonly<QuestionViewComponentState>, snapshot?: any) {
        if (this.state.selectedIndex !== prevState.selectedIndex) {
            this.props.onChange();
        }
    }

    render() {
        return <div>
            <h3>{this.props.question.title}</h3>
            <div className={"quiz-view-answers-container"}>
                {this.props.question.possibleAnswers.map((a, index) => {
                    const style: CSSProperties = {width: "150px"};

                    if (index === this.state.selectedIndex) {
                        style.background = "lightblue";
                    }

                    return <CardComponent key={index}
                                          style={style}
                                          title={a.title}
                                          imageUrl={a.imageUrl}
                                          onClick={() => this.clickedOnAnswer(index)}/>;
                })}
            </div>
        </div>;
    }
}
