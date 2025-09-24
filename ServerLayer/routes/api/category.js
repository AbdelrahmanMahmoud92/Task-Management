const {Router} = require("express");

const router = Router();

const categoryController = require("../../controllers/category-controller");

router.get("/", categoryController.retrieveAllCategoriesController);
router.post("/", categoryController.createCategoryController);

module.exports = router;