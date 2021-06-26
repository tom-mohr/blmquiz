import * as React from "react";
import {Quiz} from "../../logic/quiz";
import "./QuizViewComponent.css";
import {QuestionViewComponent} from "./QuestionViewComponent";
import {calculateMatching} from "../../logic/quizAnswerMatching";

interface QuizViewComponentProps {
    quiz: Quiz;
}

interface QuizViewComponentState {
    showResult: boolean;
    matching: number[] | undefined;
}

export class QuizViewComponent extends React.Component<QuizViewComponentProps, QuizViewComponentState> {

    private readonly questionRefs: React.RefObject<QuestionViewComponent>[] = [];

    constructor(props: Readonly<QuizViewComponentProps> | QuizViewComponentProps) {
        super(props);

        this.state = {
            showResult: false,
            matching: undefined,
        };

        for (let i = 0; i < this.props.quiz.questions.length; i++) {
            this.questionRefs.push(React.createRef<QuestionViewComponent>());
        }
    }

    private hasAnsweredAll(): boolean {
        for (let i = 0; i < this.props.quiz.questions.length; i++) {
            if (this.getAnswerIndex(i) === -1) {
                return false;
            }
        }
        return true;
    }

    private getAnswerIndex(questionIndex: number): number {
        const questionViewComponent = this.questionRefs[questionIndex].current;
        if (!questionViewComponent) {
            return -1;
        }
        return questionViewComponent.getSelectedAnswerIndex();
    }

    private onAnswerChanged(): void {
        if (this.hasAnsweredAll()) {
            this.setState({showResult: true, matching: this.calculateMatching()});
        } else {
            this.setState({showResult: false});
        }
    }

    private calculateScores(): number[] {
        let scores: number[] = this.props.quiz.scoreNames.map(() => 0);

        for (let questionIndex = 0; questionIndex < this.props.quiz.questions.length; questionIndex++) {

            // get answer
            const selectedAnswerIndex = this.questionRefs[questionIndex].current.getSelectedAnswerIndex();
            const delta = this.props.quiz.questions[questionIndex].possibleAnswers[selectedAnswerIndex].scoresDelta;

            // add delta to scores
            for (let i = 0; i < delta.length; i++) {
                scores[i] += delta[i];
            }
        }
        this.questionRefs.map(ref => {
            if (!ref.current) {
                return 0;
            }
            return ref.current.getSelectedAnswerIndex();
        });

        return scores;
    }

    private calculateMatching(): number[] {
        const scores = this.calculateScores();
        return calculateMatching(this.props.quiz.questions, this.props.quiz.results, scores);
    }

    render() {
        return <div>
            {this.props.quiz.questions.map((q, index) =>
                <QuestionViewComponent key={index} ref={this.questionRefs[index]} question={q} onChange={() => this.onAnswerChanged()}/>
            )}
            {this.state.showResult && <div>
                <h2>Ergebnis:</h2>
                {this.state.matching.map((matchValue, index) => {
                    const result = this.props.quiz.results[index];
                    return <div>
                        {Math.round(matchValue * 100)}% <strong>{result.title}</strong>
                        <p>{result.description}</p>
                        {result.infoLink && <a href={result.infoLink}>Link</a>}
                    </div>;
                })}
            </div>}
        </div>;
    }
}