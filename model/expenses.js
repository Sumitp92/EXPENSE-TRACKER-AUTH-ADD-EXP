const Sequelize = require('sequelize');
const sequelize = require('../util/databases');

const expenseRecord = sequelize.define('expensestable', {
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'expensestables', 
    timestamps: true
});

module.exports = expenseRecord;