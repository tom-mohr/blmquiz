import * as React from "react";
import {Quiz, QuizResult} from "../../logic/quiz";
import "./QuizViewComponent.css";
import {QuestionViewComponent} from "./QuestionViewComponent";
import {calculateMatching} from "../../logic/quizAnswerMatching";
import {CardComponent} from "../overview/cards/CardComponent";
import {CSSProperties} from "react";

interface QuizViewComponentProps {
    quiz: Quiz;
}

interface QuizViewComponentState {
    showResult: boolean;
    resultsOrderedByMatching: {matchValue: number, result: QuizResult}[] | undefined;
}

export class QuizViewComponent extends React.Component<QuizViewComponentProps, QuizViewComponentState> {

    private readonly questionRefs: React.RefObject<QuestionViewComponent>[] = [];

    constructor(props: Readonly<QuizViewComponentProps> | QuizViewComponentProps) {
        super(props);

        this.state = {
            showResult: false,
            resultsOrderedByMatching: undefined,
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
            this.setState({showResult: true, resultsOrderedByMatching: this.getResultsOrderedByMatching()});
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

    private getResultsOrderedByMatching(): {matchValue: number, result: QuizResult}[] {

        const matching = this.calculateMatching();;
        const results = this.props.quiz.results.slice();
        const n = matching.length;

        for (let i = 0; i < n - 1; i++) {
            // find largest of remaining
            let max = matching[i];
            let maxIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (matching[j] > max) {
                    max = matching[j];
                    maxIndex = j;
                }
            }

            // swap with first index in range
            this.swap(matching, i, maxIndex);
            this.swap(results, i, maxIndex);
        }

        return matching.map((matchValue, index) => ({matchValue: matchValue, result: results[index]}));
    }

    private swap(arr: any[], i: number, j: number): void {
        let h = arr[j];
        arr[j] = arr[i];
        arr[i] = h;
    }

    private renderResult(matchValue: number, result: QuizResult, key: number, highlight: boolean): JSX.Element {
        const percentageString = `${Math.round(matchValue * 100)}%`;
        const style: CSSProperties = {};
        if (highlight) {
            style.background = "lightgreen";
        }
        return <CardComponent title={`${percentageString} ${result.title}`} style={style} responsive={false}>
            <p>{result.description}</p>
            {result.infoLink && <a href={result.infoLink}>Link</a>}
        </CardComponent>;
    }

    render() {
        return <div>
            {this.props.quiz.questions.map((q, index) =>
                <QuestionViewComponent key={index} ref={this.questionRefs[index]} question={q} onChange={() => this.onAnswerChanged()}/>
            )}
            {this.state.showResult && <div>

                <h2>Result:</h2>
                <div className={"quiz-view-results-container"}>
                    {this.renderResult(
                        this.state.resultsOrderedByMatching[0].matchValue,
                        this.state.resultsOrderedByMatching[0].result,
                        0, true
                    )}
                </div>

                <h2>Your other results:</h2>
                <div className={"quiz-view-results-container"}>
                    {this.state.resultsOrderedByMatching.slice(1, this.state.resultsOrderedByMatching.length)
                        .map((match, index) => this.renderResult(match.matchValue, match.result, index, false)
                    )}
                </div>
            </div>}
        </div>;
    }
}