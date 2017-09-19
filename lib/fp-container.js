var Container = function (value) {
    this.__value = value;
};

Container.of = function (value) {
    return new Container(value);
};

Container.prototype.map = function (f) {
    return Container.of(f(this.__value));
};

var Maybe = function (value) {
    this.__value = value;
};

Maybe.of = function (value) {
    return new Maybe(value);
};

Maybe.prototype.isPresented = function () {
    return (this.__value !== null || this.__value !== undefined);
};

Maybe.prototype.map = function (f) {
    return this.isPresented() ? Maybe.of(f(this.__value)) : Maybe.of(null);
};

var IO = function (f) {
    this.__value = f;
};

IO.of = function (f) {
    return new IO(function () {
        return f;
    });
};

IO.prototype.map = function (f) {
    return new IO(compose(f, this.__value));
};

var c = Container.of(10);

console.log(c.map(function (v) {
    return v * 2;
}));

var boris = Maybe.of({name: "Boris"});
console.log(boris.map(function (value) {
    return value["age"];
}));

var diana = Maybe.of({name: "Diana", age: 22});
console.log(diana.map(function (value) {
    return value["age"];
}));