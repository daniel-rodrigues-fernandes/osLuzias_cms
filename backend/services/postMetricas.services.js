const metricasRepo = require('../repository/postMetricas.repository');

exports.registerView = async (postId) => {
    const post = await metricasRepo.getByPostId(postId);
    if (!post) {
        const error = new Error("Post não encontrado");
        error.status = 404;
        throw error;
    }

    await metricasRepo.createIfNotExists(postId);
    await metricasRepo.incrementViews(postId);
};

exports.registerShare = async (postId) => {
    const post = await metricasRepo.getByPostId(postId);
    if (!post) {
        const error = new Error("Post não encontrado");
        error.status = 404;
        throw error;
    }
    await metricasRepo.createIfNotExists(postId);
    await metricasRepo.incrementShares(postId);
};

exports.registerReadingTime = async (postId, tempo) => {
    await metricasRepo.createIfNotExists(postId);
    await metricasRepo.updateReadingTime(postId, tempo);
};

exports.getMetrics = async (postId) => {
    return await metricasRepo.getByPostId(postId);
};