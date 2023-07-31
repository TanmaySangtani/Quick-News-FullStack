const express = require('express')
const router = express.Router()
const UserSchema = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchUser')

//ROUTE 1: Create a user using POST "/api/auth/signup". Doesn't require authentication
router.post('/signup', [
    body('username', 'Must be atleast 6 characters').isLength({ min: 6 }),
    body('email', 'Enter a valid email').isEmail(), //messages are optional
    body('password', 'Must be atleast 6 characters').isLength({  min: 6 }),
] , async (req, res) => {

    let success = false

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json( {success, errors: errors.array()} )
    }

    try {
        let user = await UserSchema.findOne({email: req.body.email})

        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with this email already exists."})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        //create a new User
        user = await UserSchema.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })

        success = true
        res.json({success})
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 2: Login a user using POST "/api/auth/login". Doesn't require authentication
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cnnot be blank').exists()
], async (req, res) => {

    let success= false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        let user = await UserSchema.findOne({email: req.body.email})

        if (!user) {
            return res.status(400).json({success, errors: "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({success, errors: "Please try to login with correct credentials"})
        }

        const data = {
            user: {
                id: user._id
            }
        }

        success = true
        const authToken = await jwt.sign(data, process.env['JWT_SECRET'], {expiresIn: "1d"})

        const dt = new Date(Date.now() + 86400000)
        console.log(dt)
        res.cookie('auth-token', authToken, {
            expiresIn: dt,
            httpOnly: true
        })

        res.json({success, authToken})

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 3: Route that checks whether a user is logged in
router.get('/isloggedin', fetchuser, async (req, res) =>{

    if (req.user == "!") {
        res.json({success: false})
    } else {
        res.json({success: true})
    }
})

//ROUTE 4: Route that lets the user logout 
router.get('/logout', async(req, res) => {

    res.clearCookie('auth-token')
    res.json({success: true, message: "Logout successsful"})
})


//ROUTE 7: Deleting an account
router.delete('/deleteaccount', fetchuser, async (req,res) => {
 
    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id

        await UserSchema.deleteOne({_id: userId})

        res.json({success: true})
    }
})

//ROUTE 8: Fetching user details
router.get('/userdata', fetchuser, async (req, res) => {

    if (req.user === "!") {
        res.json({success: false})
    } else {
        const userId = req.user.id

        const user = await UserSchema.findOne({_id: userId})

        res.json({success: true, username: user.username, email: user.email})
    }
})

//ROUTE 9: Editing user data
router.put('/edituserdata', 
[
    body('username', 'Must be atleast 6 characters').isLength({ min: 6 }),
    body('email', 'Enter a valid email').isEmail(), //messages are optional
    body('password', 'Must be atleast 6 characters').isLength({  min: 6 }),
],
 fetchuser, async (req, res) => {

    if (req.user === "!") {
        res.json({success: false, message: "This action requires login"})
    } else {
        const userId = req.user.id

        if (req.body.username) {
            await UserSchema.updateOne({_id: userId}, {$set: {username: req.body.username}})
        } else if (req.body.email) {
            await UserSchema.updateOne({_id: userId}, {$set: {email: req.body.email}})
        } else if (req.body.password) {

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            await UserSchema.updateOne({_id: userId}, {$set: {password: secPass}})
        }

        res.json({success: true})
    }
})



//ROUTE 11: Creating user article draft


module.exports = router