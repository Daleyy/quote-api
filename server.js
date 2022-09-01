const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    res.status(200).send({ quote: getRandomElement(quotes) });
})

app.get('/api/quotes', (req, res) => {
    const findQuotes = quotes.filter(author => {
      return author.person === req.query.person;
    });
    if (req.query.person) {
      res.status(200).send({ quotes: findQuotes });
    } else {
      res.status(200).send({ quotes: quotes });
    }
});

app.post("/api/quotes", (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if (newQuote && newPerson) {
        quotes.push({
            quote: newQuote,
            person: newPerson,
        });
        res.status(200).send({ quote: { quote: newQuote, person: newPerson }});
    } else {
        res.status(400);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})