const {Router} = require("express");

const router = Router();

const taskRouter = require("./tasks");
const categoryRouter = require("./category");

router.use("/v1/categories", categoryRouter);
router.use("/v1/tasks", taskRouter);

module.exports = router;