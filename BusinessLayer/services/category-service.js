const validator = require("validator");
const categoryRepository = require("../../DataLayer/repositories/category-repository");
const { ValidationError } = require("../errors");
const toDTO = ({_id, name, color}) => ({
    _id,
    name,
    color
});
const validateColor = async(color) => {
  if (!validator.isHexColor(color)) {
    throw new ValidationError("Category color must be a valid HEX code");
  }
};
const retrieveAllCategories = async() => {
    const categories = await categoryRepository.retrieveAllCategories();
    return categories.map(toDTO);
}

const createCategory = async(name, color) => {
    await validateColor(color);
    const category = await categoryRepository.createCategory({
        name,
        color
    });
    return toDTO(category);
}

module.exports = {
    retrieveAllCategories,
    createCategory
}