const express = require('express');
const sequelize = require('./model/expenses'); 
const Auth = require('./model/auth'); 
const bodyParser = require('body-parser');
const routes = require('./routes/router'); 
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Use the routes defined in router.js
app.use('/api', routes);

// Serve HTML files for signup and login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Sync database and start the server
sequelize.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });