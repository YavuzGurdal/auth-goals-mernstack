// burasi goals icin ana state

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new goal
export const createGoal = createAsyncThunk('goals/create',
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.createGoal(goalData, token) // goalService'den gelen createGoal() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update goal
export const updateGoal = createAsyncThunk('goals/update',
    async (goalData, thunkAPI) => {
        //console.log(goalData);

        const { _id } = goalData

        //* 1.yontem */
        // const { goalId, dataGoal } = goalData
        // console.log(goalId, dataGoal);

        try {
            const token = thunkAPI.getState().auth.user.token

            return await goalService.updateGoal(_id, goalData, token) // goalService'den gelen createGoal() fonksiyonunu calistiriyorum

            //* 1.yontem */
            //return await goalService.updateGoal(goalId, dataGoal, token) // goalService'den gelen createGoal() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user goals
export const getGoals = createAsyncThunk('goals/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.getGoals(token) // goalService'den gelen getGoals() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete user goal
export const deleteGoal = createAsyncThunk('goals/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.deleteGoal(id, token) // goalService'den gelen deleteGoal() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

/* 
A function that accepts an initial state, an object of reducer functions, 
and a "slice name", and automatically generates action creators and 
action types that correspond to the reducers and state. 
*/
export const goalSlice = createSlice({
    name: 'goal',
    initialState, // initialState'i builder parametresi olarak burdan gonderiyorum
    reducers: {
        reset: (state) => initialState, // state'i resetlemek icin
    },
    extraReducers: (builder) => {
        /* 
            builder dedigimiz initialState
            burda case'lere gore state degisimlerini yapiyorum
            pending,rejected,fulfilled,typePrefix createAsyncThunk'dan parametre olarak geliyor
        */

        // calistirdigimiz fonksiyonlardan sonra state'de yapilacak degisiklikleri burda yaziyoruz
        // mesela .addCase(getGoals.fulfilled, (state, action) => { 'de state.goals = action.payload diyerek geelen goal'u state'e ekliyorum
        builder
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })

            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.map((goal) => goal._id === action.payload._id ? { ...goal, text: action.payload.text } : goal)
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
                // action.payload.id'deki id'yi goalController.js icindeki deleteGoal'den res.status(200).json({ id: req.params.id }) seklinde gonderdim
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer