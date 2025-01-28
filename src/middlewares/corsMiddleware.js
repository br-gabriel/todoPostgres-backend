const setCorsHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};

module.exports = setCorsHeaders;