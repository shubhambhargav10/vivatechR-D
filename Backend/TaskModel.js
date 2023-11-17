const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task: { type: String, required: true }
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = { taskModel };
