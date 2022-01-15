// get the equation *
// get two sidece by spliting with '=' *
// simplify the two strings (reduced form) *
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
// console.log (f)
if (!f[0].replace(/\s/g, '') && (!(f[1].replace(/\s/g, ''))) ){
    console.log ('Syntax Error');
    process.exit(1);
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

const correctSign = (str) => {
    // check for multiple minus signs and reduce the form.
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

struct.firstArray.arr = struct.firstArray.arr.replace(/\s/g, '');;
struct.secondArray.arr = struct.secondArray.arr.replace(/\s/g, '');;
// if (!struct.firstArray.arr || !struct.secondArray.arr){
//     console.log ('Error');
//     process.exit (1);
// }
struct.firstArray = parse.setData(struct.firstArray);
struct.secondArray = parse.setData(struct.secondArray);

//////////
console.log(struct.secondArray.arr);
console.log(struct);
/////////

/////////////////////////////
const reduce = require('./produce');

struct.firstArray.x0 = reduce.reduceForm(struct.firstArray.x0, 0).form;
struct.firstArray.x1 = reduce.reduceForm(struct.firstArray.x1, 1).form;
struct.firstArray.x2 = reduce.reduceForm(struct.firstArray.x2, 2).form;
///////
struct.secondArray.x0 = reduce.reduceForm(struct.secondArray.x0, 0).form;
struct.secondArray.x1 = reduce.reduceForm(struct.secondArray.x1, 1).form;
struct.secondArray.x2 = reduce.reduceForm(struct.secondArray.x2, 2).form;

let newForm = {
    x0: [],
    x1: [],
    x2: []
};


newForm.x0.push(struct.firstArray.x0, struct.secondArray.x0);
newForm.x1.push(struct.firstArray.x1, struct.secondArray.x1);
newForm.x2.push(struct.firstArray.x2, struct.secondArray.x2);

console.log(newForm);
newForm.x0 = reduce.reduceForm(newForm.x0, 0).form;
newForm.x1 = reduce.reduceForm(newForm.x1, 1).mult;
newForm.x2 = reduce.reduceForm(newForm.x2, 2).mult;
console.log(newForm);

//////





if (newForm.x0 == 0 && newForm.x1 == 0 && newForm.x2 == 0){
    struct.reducedForm = '0 = 0';
}else {
    struct.reducedForm = (newForm.x0 != 0 ? newForm.x0  : '') + (newForm.x1 != 0 ? ' + ' + newForm.x1 + ' * X': '') + (newForm.x2 != 0 ?' + ' + newForm.x2+ ' * X^2' : '') + ' = 0';
    struct.reducedForm = correctSign(struct.reducedForm);
}
console.log(newForm);

// //*******************Console***********************//
console.log('Reduced form: ' + struct.reducedForm);
const degree = (newForm.x2 != 0 ? 2 : (newForm.x1 != 0 ? 1 : 0));
console.log(`Polynomial degree: ${degree}`);
// //******************************************//

// Solutions
let solutions = {
    a: 0,
    b: 0,
    c: 0,
    delta: 0,
    s1: undefined,
    s2: undefined
};

if (newForm.x0 != 0 && (newForm.x1 == 0 && newForm.x2 == 0)){
    console.log (`There is no solution for this equation { Ø empty set } .`);
    process.exit(1);
}else if (newForm.x0 == 0 && newForm.x1 == 0 && newForm.x2 == 0){
    console.log (`There are infinite solutions for this equation ∞.`);
    process.exit(1);
}else if (newForm.x1 != 0 && newForm.x2 == 0 && newForm.x0 == 0){
    console.log('The solution is:\n0');
}else if (newForm.x1 != 0 && newForm.x0 != 0 && newForm.x2 == 0){
    let tmp = [];
    tmp.push(newForm.x0.concat('/-'+newForm.x1));
    console.log(`The solution is:\n${tmp[0]} = ${reduce.reduceForm(tmp).form}`);
}else if (newForm.x2 != 0){
    console.log('2');
}
/////////