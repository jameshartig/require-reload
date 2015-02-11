var reload = require('../reload.js'),
    timeFile = './lib/time.js',
    testModule = 'require-reload-test',
    context = require;

//must be first test otherwise context might be tainted by the timeFile already
exports.timeRequire = function(test) {
    var model = reload(timeFile, context);
    test.ok(model.success);
    test.done();
};

exports.timeReload = function(test) {
    var time = reload(timeFile, context),
        oldTime = time.time;
    test.ok(time.success);
    setTimeout(function() {
        time = reload(timeFile, context);
        test.ok(time.success);
        test.notEqual(time.time, oldTime);
        test.done();
    }, 20);
};

exports.timeThrow = function(test) {
    var time = reload(timeFile, context),
        timeAfter;
    function throws() {
        reload(timeFile, context);
    }
    root.modelFail = true;
    test.throws(throws, Error, 'Failing for test');
    delete root.modelFail;
    timeAfter = context(timeFile);
    test.strictEqual(time, timeAfter);
    test.done();
};

//must be first nodeModule test otherwise context might be tainted by the testModule already
exports.nodeModuleRequire = function(test) {
    var reloadTest = reload(testModule, context);
    test.ok(reloadTest.success);
    test.done();
};

exports.nodeModuleReload = function(test) {
    var reloadTest = reload(testModule, context),
        oldTime = reloadTest.time;
    test.ok(reloadTest.success);
    setTimeout(function() {
        reloadTest = reload(testModule, context);
        test.ok(reloadTest.success);
        test.notEqual(reloadTest.time, oldTime);
        test.done();
    }, 20);
};

exports.invalidPath = function(test) {
    function throws() {
        reload('./iDontExist.js', context);
    }
    test.throws(throws, Error, "Cannot find module './iDontExist.js'");
    test.done();
};
