// Requiring Necessary Modules
const express = require('express')
const app = express();


// Setting the view engine
app.set('view engine', 'ejs');

// Routing Requests
const indexRouter = require(process.cwd() + '/routes/index')
const commissionRouter = require(process.cwd() + '/routes/commission-calculator');
app.use('/', indexRouter);
app.use('/commission-calculator', commissionRouter);

// Loading Static Files
app.use(express.static('public'))


// Telling the server which port to listen on
const port = 3000
app.listen(process.env.PORT || port, () => {
    console.log(`Server is listening on port ${port}.`)
})