const categoryRepository = require("../../DataLayer/repositories/category-repository");
const categoryService = require("../../BusinessLayer/services/category-service");
const { ValidationError, NotExistError } = require("../../BusinessLayer/errors");

const retrieveAllCategoriesController = async(req, res) => {
    try {
        const categories = await categoryService.retrieveAllCategories();
        res.status(200).json({
            message: "Categories retrieved successfully",
            data: categories
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
const createCategoryController = async(req, res) => {
    try {
    const { name, color } = req.body;
    const category = await categoryService.createCategory(name, color);
    res.status(201).json({
        message: "Category created successfully",
        data: category
    });
    } catch (error) {
        if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
    }else if (error instanceof NotExistError) {
        return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
    }
    
};

module.exports = {
    retrieveAllCategoriesController,
    createCategoryController
}