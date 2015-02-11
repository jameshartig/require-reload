module.exports = function(name, ctx) {
    var req = ctx || require,
        id = req.resolve(name),
        oldCache = req.cache[id];
    delete req.cache[id];
    try {
        return req(id);
    } catch (e) {
        if (oldCache !== undefined) {
            req.cache[id] = oldCache; //restore the old cache since the new failed
        }
        throw e;
    }
    return null;
};