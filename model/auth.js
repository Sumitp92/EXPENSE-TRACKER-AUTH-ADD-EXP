const Sequelize = require('sequelize')
const sequelize = require('../util/databases')

const NewRec = sequelize.define('expensetable' , {
    name:{
        type : Sequelize.STRING , 
        allowNull: false,
    },
    email:{
        type : Sequelize.STRING , 
        allowNull : false , 
        unique: true,
    },
    password:{
        type : Sequelize.STRING,
        allowNull : false,
    },
},{
    tableName: 'expensetable', 
    timestamps: true
});


module.exports = NewRec ; 