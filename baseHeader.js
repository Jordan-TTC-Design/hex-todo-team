const Todo = require('./models/todo');

const headers = {
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json',
};

async function changtodos(req, body) {
  const content = JSON.parse(body).content;
  const completed = JSON.parse(body).completed;

  if (req.method === 'POST') {
    return await Todo.create({
      content: content.trim(),
      completed: false,
    });
  } else {
    const id = req.url.split('/').pop();
    const obj = { content: content.trim(), completed, updatedAt: Date.now() };
    console.log(obj);
    return await Todo.updateOne({ _id: id }, obj);
  }
}

module.exports = { headers, changtodos };
