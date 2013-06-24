//TODO test it
exports.createDocument = function () {
    return {
        nodeName: '#document',
        quirksMode: false,
        childNodes: []
    };
};

exports.createElement = function (tagName, attrs, namespaceURI) {
    return {
        nodeName: tagName,
        tagName: tagName,
        attrs: attrs,
        namespaceURI: namespaceURI,
        childNodes: [],
        parentNode: null
    };
};

exports.createCommentNode = function (data) {
    return {
        nodeName: '#comment',
        data: data,
        parentNode: null
    };
};

var createTextNode = function (value) {
    return {
        nodeName: '#text',
        value: value,
        parentNode: null
    }
};

var appendNode = exports.appendChild = function (parentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
};

var insertBefore = exports.insertBefore = function (parentNode, newNode, referenceNode) {
    var insertionIdx = parentNode.childNodes.indexOf(referenceNode);

    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
};

exports.detachNode = function (node) {
    if (node.parentNode) {
        var idx = node.parentNode.childNodes.indexOf(node);

        node.parentNode.childNodes.splice(idx, 1);
        node.parentNode = null;
    }
};

exports.insertCharacter = function (parentNode, ch) {
    var childNodesLength = parentNode.childNodes.length,
        lastChild = childNodesLength && parentNode.childNodes[childNodesLength - 1];

    if (lastChild && lastChild.nodeName === '#text')
        lastChild.value += ch;
    else
        appendNode(parentNode, createTextNode(ch));
};

exports.insertCharacterBefore = function (parentNode, ch, referenceNode) {
    var prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

    if (prevNode && prevNode.nodeName === '#text')
        prevNode.value += ch;
    else
        insertBefore(parentNode, createTextNode(ch), referenceNode);
};

exports.adoptAttributes = function (recipientNode, attrs) {
    var recipientAttrsMap = [];

    for (var i = 0; i < recipientNode.attrs.length; i++)
        recipientAttrsMap.push(recipientNode.attrs[i].name);

    for (var j = 0; j < attrs.length; j++) {
        if (recipientAttrsMap.indexOf(attrs[i].name) === -1)
            recipientNode.attrs.push(attrs[i]);
    }
};

exports.getFirstChild = function (node) {
    return node.childNodes[0];
};

exports.getParentNode = function (node) {
    return node.parentNode;
};

exports.getElementTagName = function (element) {
    return element.tagName;
};

exports.getElementNamespaceURI = function (element) {
    return element.namespaceURI;
};

exports.getElementAttrs = function (element) {
    return element.attrs;
};
