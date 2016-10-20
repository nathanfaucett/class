class [![Build Status](https://travis-ci.org/nathanfaucett/js-class.svg?branch=master)](https://travis-ci.org/nathanfaucett/js-class)
======


```javascript
var Class = require("@nathanfaucett/class");


function ChildClass() {

    Class.call(this);

    this.value = null;
}
Class.extend(ChildClass, "namespace.ChildClass");

ChildClass.prototype.getValue = function() {
    return this.value;
};
```
