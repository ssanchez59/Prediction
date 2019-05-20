import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, VIEW_SURVEY, EDIT_SURVEY } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteSurvey = (id, history) => async dispatch => {
  const res = await axios.delete('/api/surveys',  { data: { id: id }});

  history.push('/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const viewSurvey = (id, history) => async dispatch => {
  const res = await axios.get('/api/surveys/:surveyId',  { params: { id: id }});

  history.push('/surveys');

  dispatch({ type: VIEW_SURVEY, payload: res.data });
};

export const editSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys/:surveyId',  values);

  console.log(res);

  history.push('/surveys');

  dispatch({ type: EDIT_SURVEY, payload: res.data });
};
