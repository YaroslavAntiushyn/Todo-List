const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')

router.post('/registration',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Password is too short').isLength(5) 
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'The data you provided is incorrect'

                })

            } 

            const { email, password } = req.body

            const isUsed = await User.findOne({ email })

            if (isUsed) {
                return res.status(300).json({message: 'Email is invalid or already taken'})
            } 

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({
                email,
                password: hashedPassword
            })

            await user.save()

            res.status(201).json({message: 'User saved successfully'})


        } catch (err) {
            log.error(err)
        }
})


router.post('/login',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Password is too short').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'The data you provided is incorrect'
                })
            } 

            const { email, password } = req.body

            const user = await user.findOne({ email })

            if(!user) {
                return res.status(400).json({message: 'User with this email does not exist'})
            }

            const isMatch = bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({message: 'Invalid password'})
            }

            const jwtSecret = 'dghdfhsdfgwer33253frgdfzsgdfgh3464uyafh673254'

            const token = jwtToken.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (err) {
            log.error(err)
        }
})


module.exports = router