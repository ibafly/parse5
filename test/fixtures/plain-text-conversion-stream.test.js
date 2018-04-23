'use strict';

const assert = require('assert');
const parse5 = require('../../packages/parse5/lib');
const PlainTextConversionStream = require('../../packages/parse5-plain-text-conversion-stream/lib');
const testUtils = require('../test-utils');

testUtils.generateTestsForEachTreeAdapter(module.exports, (_test, treeAdapter) => {
    _test['Plain text conversion stream'] = function() {
        const converter = new PlainTextConversionStream({ treeAdapter: treeAdapter });

        converter.write('Hey');
        converter.write('\r\nyo');
        converter.write('\u0000');
        converter.end('<html><head><body>');

        const result = parse5.serialize(converter.document, { treeAdapter: treeAdapter });

        assert.strictEqual(
            result,
            '<html><head></head><body><pre>\nHey\nyo\uFFFD&lt;html&gt;&lt;head&gt;&lt;body&gt;</pre></body></html>'
        );
    };
});