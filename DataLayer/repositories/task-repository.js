const Task = require("../models/tasks");


const retrieveAllTasks = async() => {
    const tasks = await Task.find().populate("category_id");
    return tasks
}

const retrieveTaskById = async(id) => {
    const task = await Task.findById(id);
    return task ? task : null;
};

const retrieveCompletedTasks = async () => {
    const tasks = await Task.find({ completed: true });
    return tasks
};

const retrieveUncompletedTasks = async() => {
    const tasks = await Task.find({completed: false});
    return tasks
}

const createTask = async(task) => {
    const newTask = await Task.create(task);
    return newTask.populate("category_id");
};

module.exports = { 
    retrieveAllTasks, 
    retrieveTaskById, 
    createTask,
    retrieveCompletedTasks,
    retrieveUncompletedTasks
};