const mongoose = require('mongoose');
// schema todo rule
const todoSchema =  new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, '內容必填'],
    },
    completed: Boolean,
    updatedAt:{
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);
// build model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;


