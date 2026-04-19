const service = require('../services/postMetricas.services');

exports.addView = async (req, res) => {
    try {
        await service.registerView(req.params.postId);
        res.json({ message: "Visualização registrada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addShare = async (req, res) => {
    try {
        await service.registerShare(req.params.postId);
        res.json({ message: "Compartilhamento registrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMetrics = async (req, res) => {
    try {
        const data = await service.getMetrics(req.params.postId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};