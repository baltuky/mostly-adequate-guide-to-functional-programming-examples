const snakeCase = compose(debug, replace(/\s+/ig, '_'), toLowerCase);

const length = function (val) {
    return val.length;
};

const noLessThan = curry(function (len, value) {
    return value > len;
});

const initials = compose(debug,
                         join(''),
                         map(compose(toUpperCase, head)),
                         filter(compose(noLessThan(3), length)),
                         split(' '));

initials("Belarusian State University of Informatics and Radioelectronics");
snakeCase("How are you doing ?");