const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id });

        res.send(surveys);
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, dataColumns, labelColumns, r2 } = req.body;

        const survey = new Survey({
            title,
            dataColumns,
            labelColumns,
            _user: req.user.id,
            dateSent: Date.now(),
            r2
        });

        try {
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user)
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.delete('/api/surveys', async (req, res) => {
        const { id } = req.body;

        const survey = await Survey.findOneAndRemove({ _id: id });

        res.send(survey);
    });

    app.get('/api/surveys/:surveyId', async (req, res) => {
        const { id } = req.query;

        const survey = await Survey.find({ _id: id });

        res.send(survey);
    });

    app.post('/api/surveys/:surveyId', async (req, res) => {
        const { id, title, dataColumns, labelColumns, r2 } = req.body;

        const survey = await Survey.findByIdAndUpdate(id,
            {
                $set: {
                    title: title,
                    dataColumns: dataColumns,
                    labelColumns: labelColumns,
                    r2: r2
                }
            }
        );

        res.send(survey);
    });
};

