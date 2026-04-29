const categoryService = require('../services/category.services');

exports.createCategory = async (req, res) => {
    try {
        const categoryId = await categoryService.createCategory(req.body);
        return res.status(201).json({ id: categoryId, message: "Categoria criada com sucesso" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getCategoryBySlug = async (req, res) => {
    try {
        const category = await categoryService.getCategoryBySlug(req.params.slug);
        res.json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json({ message: "Categoria deletada com sucesso" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        await categoryService.updateCategory(req.params.id, req.body);
        res.json({ message: "Categoria atualizada com sucesso" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};