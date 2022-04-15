const Todo = require('./models/todo');

const headers = {
	//'Content-Type' : 'text/lain',
	'Access-Control-Allow-Headers':
		'Content-Type, Authorization, Content-Length, X-Requested-With',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
	'Content-Type': 'application/json',
};

function changtodos(req, todos, body) {
	const title = JSON.parse(body).title;
	if (req.method === 'POST') {
		return Todo.create({
			content: title.trim(),
			completed: false,
		});
	} else {
		const id = req.url.split('/').pop();
		const index = todos.findIndex((e) => e.id == id);
		if (title !== undefined && index !== -1) {
			todos[index].title = title;
			return true;
		} else {
			return false;
		}
	}
}

module.exports = { headers, changtodos };
