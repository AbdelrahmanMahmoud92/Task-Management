const Category = require("../models/categories");



const retrieveAllCategories = async() => {
    const categories = await Category.find();
    return categories;
}

const createCategory = async(category) => {
    const newCategory = await Category.create(category);
    return newCategory;
};

module.exports = {
    retrieveAllCategories,
    createCategory
}