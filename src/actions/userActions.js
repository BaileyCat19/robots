import {FETCH_ROBOTS, FETCH_ROBOT_BY_ID} from './actionTypes';



export const fetchRobots = ()=>({
    type:FETCH_ROBOTS
});

export const fetchRobotById = (id) =>(
    {
        type:FETCH_ROBOT_BY_ID,
        payload:id
    }
)
