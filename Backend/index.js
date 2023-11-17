const express = require('express');
const { connection } = require('./db');
const { taskModel } = require('./TaskModel');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
app.get('/alltasks', async (req, res) => {
    try {
        const data = await taskModel.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(`Internal server error: ${err}`);
    }
});

app.post('/addtask', async (req, res) => {
    const newData = req.body;
    try {
        const dataToSave = new taskModel(newData);
        await dataToSave.save();
        res.status(200).send('Data added successfully');
    } catch (err) {
        res.status(500).send(`Couldn't add data due to: ${err}`);
    }
});

app.put('/edittask/:id', async (req, res) => {
    const taskId = req.params.id;
    const updatedData = req.body;

    try {
        const result = await taskModel.findByIdAndUpdate(taskId, updatedData);
        if (result) {
            res.status(200).send('Task updated successfully');
        } else {
            res.status(404).send('Task not found');
        }
    } catch (err) {
        res.status(500).send(`Error updating task: ${err}`);
    }
});

app.delete('/deletetask/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const result = await taskModel.findByIdAndDelete(taskId);
        if (result) {
            res.status(200).send('Task deleted successfully');
        } else {
            res.status(404).send('Task not found');
        }
    } catch (err) {
        res.status(500).send(`Error deleting task: ${err}`);
    }
});

app.listen(8000, async () => {
    try {
        await connection;
        console.log('Connected to the database');
    } catch (err) {
        console.log('Error connecting to the database:', err);
    }
});
