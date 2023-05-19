const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');

exports.signup = async (req, res) => {
    try {
        let {fullName, email, role, password} = req.body;

        if (!fullName || !email || !role || !password)
            return res.status(400).json({message: 'All field is required'});

        const user = new User({
            fullName,
            email,
            role,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save().then(() => {
            res.send({message: 'User successfully registered'});
        });
    } catch (err) {
        console.error('Error', err.message);
    }
};

exports.signin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password)
        return res.status(400).send({message: 'Bad request'});
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(404).send('User not found');

        const validPassword = bcrypt.compareSync(
            req.body.password,
            user.password,
        );
        if (!validPassword) return res.status(400).send('Invalid credentials');

        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.API_SECRET,
            {
                expiresIn: '3d',
            },
        );

        res.status(200).send({
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullName,
            },
            message: 'Login successfull',
            accessToken: token,
        });
    } catch (err) {
        console.error('Error', err.message);
    }
};
