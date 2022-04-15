const Todo = require('./models/todo');

const headers = {
	//'Content-Type' : 'text/lain',
	'Access-Control-Allow-Headers':
		'Content-Type, Authorization, Content-Length, X-Requested-With',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
	'Content-Type': 'application/json',
};

async function changtodos(req, todos, body) {
	
	const title = JSON.parse(body).content;
	
	if (req.method === 'POST') {
		return await Todo.create({
			content: title.trim(),
			completed: false,
		});
	} else {
		const id = req.url.split('/').pop();
		
		return await Todo.updateOne({_id:id},{
			$set:{content:title.trim()}
		})
		.then(()=>{return true;})
		.catch((error)=>{
			console.log(error);
			return false;
		});
		// const index = todos.findIndex((e) => e.id == id);
		// if (title !== undefined && index !== -1) {
		// 	todos[index].title = title;
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
}

module.exports = { headers, changtodos };
