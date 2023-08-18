const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const customMware = require('./config/middleware');



//using cookie parser
app.use(express.urlencoded(
    {
        extended: true
    }
));
app.use(cookieParser());



//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Placementcell',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://pankaj3112:ftHLwuuPqJvyE9Qj@cluster0.lm6iyo2.mongodb.net/?retryWrites=true&w=majority',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//using flash
app.use(flash());
app.use(customMware.setflash);


//...Views....
//Layouts
app.use(expressLayouts);


//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Assets
app.use(express.static('./assets'));


// ...Controller....
// Router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});