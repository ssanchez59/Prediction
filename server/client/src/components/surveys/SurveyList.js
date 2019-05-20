import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchSurveys, deleteSurvey, viewSurvey, editSurvey } from '../../actions';

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return Object.values(this.props.surveys).reverse().map(survey => {
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <div className="card-content">
                            <div className="left">
                                <span className="card-title">{survey.title}</span>
                                <p>{survey.dataColumns}</p>
                                <p>{survey.labelColumns}</p>
                                <b>Reported R2: {survey.r2}</b>
                                <p>
                                    Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => this.props.viewSurvey(survey._id, this.props.history)}
                                    className="green btn-flat right white-text"
                                >
                                    View Analysis
                             <i className="material-icons right">arrow_forward</i>
                                </button>
                                <br></br>
                                <br></br>
                                <Link to="/surveys/new"
                                    onClick={() => this.props.editSurvey(survey, this.props.history)}
                                    className="green btn-flat right white-text"
                                >
                                    Edit Analysis
                             <i className="material-icons right">arrow_forward</i>
                                </Link>
                                <br></br>
                                <br></br>
                                <button
                                    onClick={() => this.props.deleteSurvey(survey._id, this.props.history)}
                                    className="red btn-flat right white-text"
                                >
                                    Delete Analysis
                             <i className="material-icons right">delete</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            });
        }
    
    render() {
        return <div>{this.renderSurveys()}</div>;
                }
            }
            
function mapStateToProps({surveys}) {
    return {surveys};
                }
                
export default connect(mapStateToProps, {fetchSurveys, deleteSurvey, viewSurvey, editSurvey })(withRouter(SurveyList));
