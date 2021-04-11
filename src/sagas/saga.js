import {
  takeEvery,
  call,
  put
} from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_ROBOTS,
  FETCH_ROBOTS_ASYNC,
} from "../actions/actionTypes";
import { fetchRobots } from "./api";

export default function* rootWatcher() {
  yield takeEvery(FETCH_ROBOTS, fetchRobotsAsync);
}

export function* fetchRobotsAsync() {
  let response = yield call(fetchRobots);
  yield put({ type: FETCH_ROBOTS_ASYNC, payload: response.data });
}
