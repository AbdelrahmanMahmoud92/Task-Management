const {Router} = require("express");

const router = Router();

const taskController = require("../../controllers/task-controller");

router.post("/", taskController.createTaskController);
router.get("/", taskController.retrieveAllTasksController);
router.get("/completed", taskController.retrieveCompletedTasksController);
router.get("/uncompleted", taskController.retrieveUnCompletedTasksController);
router.get("/:id", taskController.retrieveTaskByIdController);
router.patch("/:id/toggle", taskController.toggleTaskCompletionController);
module.exports = router;