const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const errorHandle = require('./errorHandle');
const resHandle = require('./resHandle');
const { changtodos } = require('./baseHeader');
const db = mongoose
	.connect(
		process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD),
	)
	.then((value) => {
		console.log(`info：連線成功`);
	})
	.catch((err) => {
		console.log(`error：連線失敗 ${err.message}`);
	});

const todos = [];

const requestListener = (req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	});
	if (req.url == '/todos' && req.method == 'GET') {
		resHandle(res, todos);
	} else if (req.url == '/todos' && req.method == 'POST') {
		req.on('end', () => {
			try {
				changtodos(req, todos, body);
				resHandle(res, todos);
			} catch {
				errorHandle(400, res, '欄位未填寫正確，無此todo id');
			}
		});
	} else if (req.url == '/todos' && req.method == 'DELETE') {
		todos.length = 0;
		resHandle(res, todos);
	} else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
		const id = req.url.split('/').pop();
		const index = todos.findIndex((e) => e.id == id);
		if (index == -1) {
			errorHandle(400, res, '欄位未填寫正確，無此todo id');
		} else {
			todos.splice(index, 1);
			resHandle(res, todos);
		}
	} else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
		req.on('end', () => {
			try {
				if (changtodos(req, todos, body)) {
					resHandle(res, todos);
				} else {
					errorHandle(400, res, '欄位未填寫正確，無此todo id');
				}
			} catch {
				errorHandle(400, res, '欄位未填寫正確，無此todo id');
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
