var has = require("@nathanfaucett/has"),
    isNull = require("@nathanfaucett/is_null"),
    isFunction = require("@nathanfaucett/is_function"),
    apply = require("@nathanfaucett/apply"),
    inherits = require("@nathanfaucett/inherits"),
    EventEmitter = require("@nathanfaucett/event_emitter"),
    createPool = require("@nathanfaucett/create_pool"),
    uuid = require("@nathanfaucett/uuid");


var GLOBAL_CLASSES = global.__GLOBAL_CLASSES__ || (global.__GLOBAL_CLASSES__ = {}),
    ClassPrototype;


module.exports = Class;


function Class() {

    EventEmitter.call(this, -1);

    this._id = null;
}
EventEmitter.extend(Class);
createPool(Class);
ClassPrototype = Class.prototype;

Class.extend = function(Child, className) {
    if (has(Class.__classes, className)) {
        throw new Error("extend(Child, className) class named " + className + " already defined");
    } else {
        Class.__classes[className] = Child;

        inherits(Child, this);
        createPool(Child);
        Child.className = Child.prototype.className = className;

        if (isFunction(this.onExtend)) {
            apply(this.onExtend, arguments, this);
        }

        return Child;
    }
};

Class.inherit = Class.extend;

Class.__classes = GLOBAL_CLASSES;

Class.hasClass = function(className) {
    return has(Class.__classes, className);
};

Class.getClass = function(className) {
    if (Class.hasClass(className)) {
        return Class.__classes[className];
    } else {
        throw new Error("getClass(className) class named " + className + " is not defined");
    }
};

Class.newClass = function(className) {
    return new(Class.getClass(className))();
};

Class.fromJSON = function(json) {
    return (Class.newClass(json.className)).fromJSON(json);
};

Class.className = ClassPrototype.className = "Class";

Class.create = function() {
    var instance = new this();
    return apply(instance.construct, arguments, instance);
};

ClassPrototype.construct = function() {

    this._id = uuid.v4();

    return this;
};

ClassPrototype.destructor = function() {

    this._id = null;

    return this;
};

ClassPrototype.generateNewId = function() {

    this._id = uuid.v4();

    return this;
};

ClassPrototype.toJSON = function(json) {
    json = json || {};

    json._id = this._id;
    json.className = this.className;

    return json;
};

ClassPrototype.fromJSON = function( /* json */ ) {

    if (isNull(this._id)) {
        this.generateNewId();
    }

    return this;
};
