const curry = function (f) {
    const wrap = function (f, p) {
        return function () {
            var parameters = p.concat(Array.prototype.slice.call(arguments, 0));
            if (parameters.length == f.length) {
                return f.apply(this, parameters);
            }
            return wrap(f, parameters);
        }
    };
    return wrap(f, Array.prototype.slice.call(arguments, 1));
};

const compose = function () {
    const functions = arguments;
    return function (result) {
        for (var i = functions.length - 1; i >= 0; i--) {
            result = functions[i].call(this, result);
        }
        return result;
    };
};