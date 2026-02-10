const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        // validation
        if (!fname || !lname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // get staff role
        const role = await Role.findOne({ name: 'staff' });
        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Staff role not found",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create full name
        const fullname = `${fname} ${lname}`;
            // name: fullname,

        // create user
        const user = await User.create({
            name:fullname,
            email: email,
            password: hashedPassword,
            role: role._id
        });

        // return res.status(201).json({
        //     success: true,
        //     message: 'User created successfully',
        //     user
        // });

        return res.redirect('/index');

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration.'
        });
    }
};


exports.getregister = async (req, res) => {
    res.render("signup");
}

exports.getloginForm = async (req, res) => {
    res.render("signin");
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        // check email
        const user = await User.findOne({ email }).populate('role');

        if (!user) {
            return res.status(400).send("Email not found");
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Incorrect password");
        }


        //store  user in session
        req.session.user = {
            id: user._id,
            role: user.role.name
        }
        // login success → redirect
        return res.redirect('/index');

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
};


exports.logout = (req, res) =>{ 
    req.session.destroy((err) => {
        if(err){
            return res.status(500).send("logout failed");
        }

        res.redirect('/');
    })
}