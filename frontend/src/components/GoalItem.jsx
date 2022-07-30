import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import moment from 'moment'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { MdOutlineEdit } from 'react-icons/md'
import { useContext } from 'react';
import UpdateGoalContext from '../context/updateGoalContext';

function GoalItem({ goal }) {
    const dispatch = useDispatch()

    const { setUpdateCurrentId } = useContext(UpdateGoalContext)

    return (
        <div className="goal">
            <div>
                {moment(goal.createdAt).fromNow()}
                {/* {new Date(goal.createdAt).toLocaleString('en-US')} */}
            </div>
            <h2>{goal.text}</h2>

            <button
                className="update"
                onClick={() => setUpdateCurrentId(goal._id)}
            >
                <MdOutlineEdit size={25} color='green' />
            </button>
            <button
                className="close"
                onClick={() => dispatch(deleteGoal(goal._id))}
            >
                <MdOutlineDeleteForever size={25} color='#dc3545' />
            </button>
        </div>
    )
}

export default GoalItem