'use strict';
module.exports = {
    testURL:'http://localhost/',
    testRegex: '/test/[^/]*(\\.js|\\.coffee|[^d]\\.ts)$',
    rootDir: process.cwd(),
    roots: ['<rootDir>/test'],
    collectCoverageFrom: ['*.js'],
};
