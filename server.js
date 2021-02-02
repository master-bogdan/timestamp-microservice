const express = require('express');
const path = require('path');
const routes = require('./routes/app');

// App initialize
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Dynamic data setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server run on port - ${PORT}`);
});