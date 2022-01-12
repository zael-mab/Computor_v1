// get the equation
// get two sidece by spliting with '='
// simplify the two strings (reduced form)
// get the b , a and c then calculate Delta = b^2 - 4ac
// solve quation S={( -b+√Delta / 2a ); (-b-√Delta / 2a)}

// set a structure
let struct = {
    reducedForm: '',
    firstArray: {
        degree: 0,
        arr: '',
        par: [],
        x0: [],
        x1: [],
        x2: []
    },
    secondArray: {
        degree: 0,
        arr: '',
        par: [],
        x0: [],
        x1: [],
        x2: []
    }
};


// check if the arguments
var arr = [];
if (process.argv.length > 3) {
    console.log(`Error to many args...`);
    process.exit(1);
} else if (process.argv.length == 2) {
    console.log('Error, please add an argument');
    process.exit(1);
}


//////////// get the equation from the argument
for (let i = 2; i < process.argv.length; i++) {
    arr.push(process.argv[i]);
}


///////////////// splite the equation
const f = arr[0].split('=');

if (f.length == 2) {
    struct.firstArray.arr = f[0].trim();
    struct.secondArray.arr = f[1].trim();
} else if (f.length == 1) {
    struct.firstArray.arr = f[0].trim();
    struct.secondArray.arr = '0';
}

/////////////////// match

// extract Xˆe from string
const regex1 = /X[\^]?[0-2]{0,}/gi;
// check Xˆe format
const regex2 = /^X[\^][0-2]{1}$|^X$/i;
// check sting 
const regex3 = /^[^a-wy-z<>%@#&!_,]+$/ig;

if (arr[0].match(regex3) === null) {
    console.log(`Syntax Error`);
    process.exit(1);
}

const parse = require('./parse');

//
parse.checkSyntax(regex1, regex2, arr[0]);

const correctSign = (str) => { // check for multiple minus signs and reduce the form.
    if (str.match(/(\-\s{0,}\-|\-\-)/g)) {
        str = str.replace(/(\-\s{0,}\-|\-\-)/g, '+');
    }
    // check for multiple minus and plus signs and reduce the form.
    if (str.match(/(\+\s{0,}\-|\+\-)|(\-\s{0,}\+|\-\+)/g)) {
        str = str.replace(/(\+\s{0,}\-|\+\-)|(\-\s{0,}\+|\-\+)/g, '-');
    }
    return str
}

struct.firstArray.arr = correctSign(struct.firstArray.arr);
struct.secondArray.arr = correctSign(struct.secondArray.arr);

/////
const rev = (str) => {
    if (!str.match(/^[\-\+]/)) {
        str = '+'.concat(str);
    }
    str = str.replace(/[\+]/g, '$');
    str = str.replace(/[\-]/g, '!');
    str = str.replace(/[\$]/g, '-');
    str = str.replace(/[\!]/g, '+');
    return str;
}

struct.secondArray.arr = rev(struct.secondArray.arr);
// struct.firstArray.arr = rev(struct.firstArray.arr);

struct.firstArray.arr = struct.firstArray.arr.replace(/\s/g, '');;
struct.firstArray = parse.setData(struct.firstArray);
struct.secondArray.arr = struct.secondArray.arr.replace(/\s/g, '');;
struct.secondArray = parse.setData(struct.secondArray);


console.log(struct.secondArray.arr);
console.log(struct);





const reduce = require('./produce');

struct.firstArray.x0 = reduce.reduceForm(struct.firstArray.x0, 0);
struct.firstArray.x1 = reduce.reduceForm(struct.firstArray.x1, 1);
struct.firstArray.x2 = reduce.reduceForm(struct.firstArray.x2, 2);
///////
struct.secondArray.x0 = reduce.reduceForm(struct.secondArray.x0, 0);
struct.secondArray.x1 = reduce.reduceForm(struct.secondArray.x1, 1);
struct.secondArray.x2 = reduce.reduceForm(struct.secondArray.x2, 2);

let reducedForm = {
    x0: [],
    x1: [],
    x2: []
};

reducedForm.x0.push(correctSign(struct.firstArray.x0.concat('+' + struct.secondArray.x0)));
reducedForm.x1.push(correctSign(struct.firstArray.x1.concat('+' + struct.secondArray.x1)));
reducedForm.x2.push(correctSign(struct.firstArray.x2.concat('+' + struct.secondArray.x2)));


//////

console.log(reducedForm);
reducedForm.x0 = reduce.reduceForm(reducedForm.x0, 0);
reducedForm.x1 = reduce.reduceForm(reducedForm.x1, 1);
reducedForm.x2 = reduce.reduceForm(reducedForm.x2, 2);

struct.reducedForm = reducedForm.x0 + ' + ' + reducedForm.x1 + ' + ' + reducedForm.x2 + ' = 0';
struct.reducedForm = correctSign(struct.reducedForm);
console.log(reducedForm);

// //*******************Console***********************//
console.log('Reduced form: ' + struct.reducedForm);
const degree = struct.firstArray.degree > struct.secondArray.degree ? struct.firstArray.degree : struct.secondArray.degree;
console.log(`Polynomial degree: ${degree}`);
// //******************************************//

/////////