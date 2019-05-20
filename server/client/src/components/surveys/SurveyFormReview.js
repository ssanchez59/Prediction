// shows inputs for usr review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

import loadCSV from '../../regressions/load-csv';
import LinearRegression from '../../regressions/linear-regression';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    function tensorFlowStuff() {
        let { features, labels, testFeatures, testLabels } = loadCSV('./regressions/cars.json', {
            shuffle: true,
            splitTest: 50,
            // dataColumns: ['horsepower','weight','displacement'],
            dataColumns: formValues.dataColumns.replace(/\s/g, '').split(","),
            // labelColumns: ['mpg']
            labelColumns: formValues.labelColumns.replace(/\s/g, '').split(","),
        });
        
        const regression = new LinearRegression(features, labels, {
            learningRate: .1,
            iterations: 40
        });
        
        regression.train();
        const r2 = regression.test(testFeatures,testLabels);
        
        formValues.r2 = r2
    }
    
    tensorFlowStuff();

    return (
        <div>
            <h5>Please confirm entries</h5>
           {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button
                onClick={() => submitSurvey(formValues, history)}
                className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}



export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));