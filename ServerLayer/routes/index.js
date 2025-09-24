const {Router} = require("express");

const router = Router();

const taskRouter = require("./api");
const categoryRouter = require("./api");

router.use("/api", categoryRouter);
router.use("/api", taskRouter);


module.exports = router;