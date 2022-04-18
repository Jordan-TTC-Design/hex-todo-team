const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const errorHandle = require('./errorHandle');
const resHandle = require('./resHandle');
const { changtodos } = require('./baseHeader');
const DATABASE = require('./constants/connection');
const Todo = require('./models/todo');

const db = mongoose
	.connect(DATABASE)
	.then((value) => {
		console.log(`info：連線成功`);
	})
	.catch((err) => {
		console.log(`error：連線失敗 ${err.message}`);
	});

const todos = [];

const requestListener = async (req, res) => {
	let body = '';
	req.on('data', chunk => {
		body +=  chunk;	
			
	});
	
	if (req.url == '/todos' && req.method == 'GET') {
		const todos = await Todo.find();
		resHandle(res, todos);
	} else if (req.url.startsWith('/todos/') && req.method === 'GET') {
		try {
			const id = req.url.split('/').pop();
			const todo = await Todo.findOne({ _id: id });
			await resHandle(res, todo);
		} catch (error) {
		  await	errorHandle(400, res, error.message);
		}
	} else if (req.url == '/todos' && req.method == 'POST') {
		req.on('end', async () => {
			try {
				console.log('1',body);
				await changtodos(req, body);
				const todos = await Todo.find({});
				await resHandle(res, todos);
			} catch (error) {
				await errorHandle(400, res, error.message);
			}
		});
	} else if (req.url == '/todos' && req.method == 'DELETE') {
		const todos = await Todo.deleteMany({})		
		await resHandle(res, todos);
	} else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
		const id = req.url.split('/').pop();
		const todos =await Todo.deleteOne({ _id: id })
		resHandle(res, todos);
	} else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
		req.on('end', async () => {
			try {
				const todos =await changtodos(req, body)
				await	resHandle(res, todos);
			} catch {
				await errorHandle(400, error, '欄位未填寫正確，無此todo id');
			}
		});
	} else if (req.method == 'OPTIONS') {
		resHandle(res, todos, false);
	} else {
		errorHandle(404, res, '無此網站路由');
	}
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
