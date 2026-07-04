const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Write documentation', description: 'Summarize the project setup' },
  { id: 2, name: 'Ship feature', description: 'Deploy the CRUD flow to production' }
];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required.' });
  }

  const newItem = {
    id: Date.now(),
    name,
    description
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required.' });
  }

  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  item.name = name;
  item.description = description;
  res.json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  items.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`CRUD API listening on http://localhost:${PORT}`);
});
