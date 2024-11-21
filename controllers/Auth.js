const User = require('../model/auth'); 
const expenseRecord = require('../model/expenses');

const bcrypt = require('bcrypt')
const AddUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name,
                email,
                password : hashedPassword
        })
        res.status(201).json({ success: true, message: 'User signed up successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error occurred during signup' });
    }
};
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login request received with email:', email);

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
        res.status(200).json({
            success: true,
            message: 'User login successful',
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error occurred during login' });
    }
};







const getExp = async (req, res) => {
    try {
        const expense = await expenseRecord.findAll();
        res.json({ success: true, expense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error' });
    }
};

// Post function
const addExp = async (req, res) => {
    try {
        const { amount, description, category } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({ success: false, message: "Missing Expense" });
        }

        const expense = await expenseRecord.create({ amount, description, category });
        res.status(201).json({ success: true, expense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error to add expenses" });
    }
};

// Delete function
const delExp = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await expenseRecord.findByPk(id);

        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense ID not found' });
        }

        await expense.destroy();
        res.status(200).json({ success: true, message: 'Expense Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error to delete Expense' });
    }
};

//edit function 
const editExp = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, description, category } = req.body;

        // Check if the expense exists
        const expense = await expenseRecord.findByPk(id);

        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense ID not found' });
        }

        // Update the expense with the new data
        expense.amount = amount;
        expense.description = description;
        expense.category = category;

        // Save the updated expense record
        await expense.save();

        res.status(200).json({ success: true, expense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error to update expense' });
    }
};

module.exports = { AddUser, LoginUser , getExp, addExp, delExp , editExp};