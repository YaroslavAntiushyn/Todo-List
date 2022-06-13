const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

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

            const user = new User({ email, password })

            await user.save()

            res.status(201).json({message: 'User saved successfully'})


        } catch (err) {
            log.error(err)
        }
})


module.exports = router