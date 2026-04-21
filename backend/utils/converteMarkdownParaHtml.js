const { marked } = require("marked");
const sanitizeHtml = require("sanitize-html");

exports.parseMarkdown = (markdown) => {
    const html = marked(markdown);

    // 🔒 evitar XSS
    const safeHtml = sanitizeHtml(html);

    return safeHtml;
};