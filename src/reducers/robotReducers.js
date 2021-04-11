import {
  FETCH_ROBOTS_ASYNC,
  FETCH_ROBOT_BY_ID,
  FETCH_ROBOTS_ASYNC_ERROR  
} from "../actions/actionTypes";

const initialState = {
  robots: [],
  robot: {},
  editMode: false,
  error: false,
};

export const robotReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROBOTS_ASYNC:
      return {
        ...state,
        robots: action.payload
      };
    case FETCH_ROBOTS_ASYNC_ERROR:
      return {
        ...state,
        error: true
      };
    case FETCH_ROBOT_BY_ID: {
      return {
        ...state,
        robot: state.robots.find(rbt => rbt.id === action.payload)
      };
    }
    default:
      return state;
  }
}
