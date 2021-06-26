import * as React from "react";
import {Quiz, QuizQuestion} from "../../logic/quiz";
import "./QuizViewComponent.tsx.css";
import {CardComponent} from "../overview/cards/CardComponent";

interface QuizViewComponentProps {
    quiz: Quiz;
}

export class QuizViewComponent extends React.Component<QuizViewComponentProps, any> {

    private renderQuestion(q: QuizQuestion): JSX.Element {
        return <div>
            <h3>{q.title}</h3>
            <div className={"quiz-view-answers-container"}>
                {q.possibleAnswers.map(a => <CardComponent style={{width: "150px"}} title={a.title} imageUrl={a.imageUrl} />)}
            </div>
        </div>;
    }

    render() {
        return <div>
            {this.props.quiz.questions.map(q => this.renderQuestion(q))}
        </div>;
    }
}