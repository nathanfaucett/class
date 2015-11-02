var tape = require("tape"),
    Class = require("..");


tape("Class", function(assert) {
    var ClassPrototype = Class.prototype,
        ChildClassPrototype;

    function ChildClass() {

        Class.call(this);

        this.value = null;
    }
    Class.extend(ChildClass, "ChildClass");
    ChildClassPrototype = ChildClass.prototype;

    ChildClassPrototype.construct = function(value) {

        ClassPrototype.construct.call(this);

        this.value = value;

        return this;
    };

    ChildClassPrototype.destructor = function() {

        ClassPrototype.destructor.call(this);

        this.value = null;

        return this;
    };

    ChildClassPrototype.toJSON = function(json) {

        json = ClassPrototype.toJSON.call(this, json);

        json.value = this.value;

        return json;
    };

    ChildClassPrototype.fromJSON = function(json) {

        ClassPrototype.fromJSON.call(this, json);

        this.value = json.value;

        return this;
    };

    var child = ChildClass.create("value"),
        json = child.toJSON(),
        fromJSON = Class.fromJSON(json);

    assert.equal(json.className, "ChildClass");
    assert.notEqual(fromJSON.__id, null);

    assert.end();
});
