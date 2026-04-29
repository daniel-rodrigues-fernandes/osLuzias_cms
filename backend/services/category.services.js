const categoryRepository = require('../repository/category.repository');
const slugify = require('slugify');

exports.createCategory = async (data) => {
    const { nome, descricao } = data;
    if (!nome) {
        throw new Error("Nome da categoria é obrigatório");
    }
    const slug = slugify(nome, { lower: true, strict: true });
    return await categoryRepository.createCategory({ nome, slug, descricao });
};

exports.getAllCategories = async () => {
    return await categoryRepository.findAll();
};

exports.getCategoryById = async (id) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
        throw new Error("Categoria não encontrada");
    }
    return category;
};

exports.getCategoryBySlug = async (slug) => {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
        throw new Error("Categoria não encontrada");
    }
    return category;
};

exports.deleteCategory = async (id) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
        throw new Error("Categoria não encontrada");
    }
    return await categoryRepository.delete(id);
};

exports.updateCategory = async (id, data) => {
    const category = await categoryRepository.findById(id); 
    if (!category) {
        throw new Error("Categoria não encontrada");
    }
    const { nome, descricao } = data;
    const slug = slugify(nome, { lower: true, strict: true });
    return await categoryRepository.update(id, { nome, slug, descricao });
};