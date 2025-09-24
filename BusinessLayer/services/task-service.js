const validator = require("validator");
const mongoose = require("mongoose");
const taskRepository = require("../../DataLayer/repositories/task-repository");
const Category = require("../../DataLayer/models/categories")
const PRIORITY_VALIDATION  = require("../../BusinessLayer/enums/priority-validation");
const {
  ValidationError,
  NotExistError,

} = require("../errors");

const toDTO = ({_id, title, description, category_id, priority, completed, image_url}) => ({
    _id,
    title,
    description,
    priority,
    completed,
    image_url,
    category_id: {
        _id: category_id._id,
        name: category_id.name,
        color: category_id.color
    },
});

const validateTitle = async(title) => {
    if (typeof title !== "string" || !validator.isLength(title, { min: 2, max: 50 })) {
    throw new ValidationError("Task title must be between 2 and 50 characters");
}
}
const validateDescription = async(description) => {
    if (
    !validator.isLength(description, { min: 2, max: 50 }) ||
    typeof description !== "string"
  ) {
    throw new ValidationError("Task description must be between 2 and 50 characters");
  }
}

const validatePriority = async(priority) =>{
    if(!Object.values(PRIORITY_VALIDATION).includes(priority)){
        throw new ValidationError("Priority must be Low, Medium or High");
    }
}


const createTask = async(title, description, category_id, priority, image_url) => {
    await validateTitle(title);
    await validateDescription(description);
    // await validateImageUrl(image_url);
    await validatePriority(priority);
    const mongoose = require("mongoose");

    if (!mongoose.Types.ObjectId.isValid(category_id)) {
        throw new NotExistError("Category does not exist");
    }

    const categoryExists = await Category.findById(category_id);
    if (!categoryExists) {
        throw new NotExistError("Category does not exist");
    }

    const task = await taskRepository.createTask({
        title,
        description, 
        category_id, 
        priority, 
    });
    
    task.image_url = `https://picsum.photos/seed/task${task._id}/400/300`
    await task.save();
    return toDTO(task);
};

const retrieveAllTasks = async() => {
    const tasks = await taskRepository.retrieveAllTasks();
    return tasks.map(toDTO);
}


const retrieveCompletedTasks = async () => {
    const tasks = await taskRepository.retrieveCompletedTasks();
    if (!tasks || tasks.length === 0) {
        throw new NotExistError("No completed tasks found");
    }
    return tasks.map(toDTO);
};


const retrieveUncompletedTasks = async() => {
    const tasks = await taskRepository.retrieveUncompletedTasks();
    if (!tasks || tasks.length === 0) {
        throw new NotExistError("No completed tasks found");
    }
    return tasks.map(toDTO);
}

const retrieveTaskById = async(_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new NotExistError("Invalid task ID");
}

const task = await taskRepository.retrieveTaskById(_id);
if (!task) {
    throw new NotExistError("Task does not exist");
}
return toDTO(task);
}

const toggleTaskCompletion = async(_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new NotExistError("Invalid task ID");
    }
    
    const task = await taskRepository.retrieveTaskById(_id);
    if (!task) {
    throw new NotExistError("Task does not exist");
    }

    if(task.completed === true){
        task.completed = false;
    }else{
        task.completed = true;
    }
    await task.save();
    return toDTO(task);
    
}

module.exports = {
    createTask,
    retrieveAllTasks,
    retrieveCompletedTasks,
    retrieveUncompletedTasks,
    retrieveTaskById,
    toggleTaskCompletion,
}