
if (root.modelFail) {
    throw new Error('Failing for test');
}

exports.success = true;
exports.time = Date.now();