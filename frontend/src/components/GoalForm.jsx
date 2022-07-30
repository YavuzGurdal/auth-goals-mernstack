import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal, updateGoal } from '../features/goals/goalSlice'

import { useContext } from 'react';
import UpdateGoalContext from '../context/updateGoalContext';

function GoalForm({ goals }) {
    const inputFocus = useRef();
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const { updateCurrentId, setUpdateCurrentId } = useContext(UpdateGoalContext)
    //console.log(updateCurrentId);

    const goal = (updateCurrentId ? goals.find((goal) => goal._id === updateCurrentId) : null);
    //console.log(goal);


    useEffect(() => {
        if (goal) setText(goal.text);
        inputFocus.current.focus();
    }, [goal]);

    const clear = () => {
        setUpdateCurrentId('');
        setText('')
    };

    const onSubmit = (e) => {
        e.preventDefault()

        if (updateCurrentId) {
            //console.log(text);
            //console.log(updateCurrentId);

            //* 1.yontem */
            //const goalText = { text }           
            //dispatch(updateGoal({ goalId: updateCurrentId, dataGoal: goalText }));

            dispatch(updateGoal({ ...goal, text: text }));
            // goal icindeki herseyi alip sadece text'i yeni text ile degistiriyorum
            clear();
        } else {
            dispatch(createGoal({ text }))
            clear();
        }
        //setText('')
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input
                        className='goalInput'
                        ref={inputFocus}
                        autoComplete="off"
                        type="text"
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                {
                    updateCurrentId ?
                        (
                            <>
                                <div className="form-group">
                                    <button className="btn btn-block" type='submit'>
                                        Edit Goal
                                    </button>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block" onClick={() => clear()}>
                                        Clear
                                    </button>
                                </div>
                            </>
                        )
                        :
                        (
                            <div className="form-group">
                                <button className="btn btn-block" type='submit'>
                                    Add Goal
                                </button>
                            </div>
                        )
                }
            </form>
        </section>
    )
}

export default GoalForm