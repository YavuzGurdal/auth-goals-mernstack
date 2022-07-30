const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    //res.status(200).json({ message: 'Get goals' })
    res.status(200).json(goals)
})

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    //res.status(200).json({ message: 'Set goal' })
    res.status(200).json(goal)
})
// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    //console.log(req.params);
    //console.log(req.body);

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) { // goal.user goal'u kim olusturmussa onun id'si
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        // req.body,
        { $set: req.body },
        { new: true }
    )

    //res.status(200).json({ message: `Update goal ${req.params.id}` })
    res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    //res.status(200).json({ message: `Delete goal ${req.params.id}` })
    res.status(200).json({ id: req.params.id })
})

// json() icinde gonderdiklerimizi goalSlice icindeki .addCase icinde action.payload olarak kullanacagiz.
// yani json() icinde gonderdiklerimiz payload olarak karsimiza cikiyor 

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}