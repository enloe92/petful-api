const express = require('express');
const json = require('body-parser').json();

const People = require('./people.service');

const router = express.Router();

router.get('/', (req, res) => {
  const allPeople = People.get();
  return res.status(200).json(allPeople);
});

router.post('/', json, (req, res) => {
  // Add a new person to the queue.
  const { person } = req.body;
  if (!person) {
    return res.status(400).json({ error: 'Person name is required' });
  }

  People.enqueue(person);
  const people = People.get();
  return res.status(201).json(people);
});

router.delete('/', (req, res) => {
  // Add a new person to the queue.

  People.dequeue();
  const people = People.get();
  return res.status(201).json(people);
});

module.exports = router;
