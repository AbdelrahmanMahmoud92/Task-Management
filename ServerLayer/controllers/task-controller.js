const asyncHandler = require("express-async-handler");

const taskRepository = require("../../DataLayer/repositories/task-repository");
const taskService = require("../../BusinessLayer/services/task-service");
const {
  ValidationError,
  NotExistError,
} = require("../../BusinessLayer/errors");

const retrieveAllTasksController = async (req, res) => {
  try {
    const tasks = await taskService.retrieveAllTasks();
    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    if (error instanceof NotExistError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const retrieveTaskByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.retrieveTaskById(id);

    res.status(200).json({
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    if (error instanceof NotExistError) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createTaskController = async (req, res) => {
  try {
    const { title, description, category_id, priority, imageUrl } = req.body;

    const task = await taskService.createTask(
      title,
      description,
      category_id,
      priority,
      imageUrl
    );

    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof NotExistError) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const retrieveCompletedTasksController = async (req, res) => {
  try {
    const tasks = await taskService.retrieveCompletedTasks();
    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    if (error instanceof NotExistError) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const retrieveUnCompletedTasksController = async (req, res) => {
  try {
    const tasks = await taskService.retrieveUncompletedTasks();
    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    if (error instanceof NotExistError) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const toggleTaskCompletionController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.toggleTaskCompletion(id);
    res.status(200).json({
      message: `Completion status of (${updatedTask.title}) task updated to (${updatedTask.completed}) successfully`,
      data: updatedTask,
    });
  } catch (error) {
    if (error instanceof NotExistError) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  retrieveAllTasksController,
  retrieveTaskByIdController,
  createTaskController,
  retrieveCompletedTasksController,
  retrieveUnCompletedTasksController,
  toggleTaskCompletionController,
};
