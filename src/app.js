const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');
const quotesRouter = require('./routes/quotes.js');
const complainRouter = require('./routes/complain.js');
const apiRouter = require('./routes/api.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const app = express();
const filePath404Page = path.resolve(__dirname, '../client/404.html');

// Serve static files from the 'client' folder
app.use(express.static('client'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/bye', indexRouter);
app.use('/helloJSON', indexRouter);
app.use('/timeJSON', indexRouter);
app.use('/quotes', quotesRouter);
app.use('/complain', complainRouter);
app.use('/api', apiRouter);
app.use((req, res) => {
  res.status(404).sendFile(filePath404Page);
});

// Start the server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
