import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* editProfile(action) {
  try {
    yield axios.put(`/api/user/profile/`+ action.payload.id, action.payload.username, action.payload.email_address, action.payload.phone_number);
  } catch (error) {
    console.log('error updating profile', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('EDIT_PROFILE', editProfile);
}

export default userSaga;
