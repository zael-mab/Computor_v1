// get the equation
// get two sidece by spliting with '='
// simplify the two strings (reduced form)
// get the b , a and c then calculate Delta = b^2 - 4ac
// solve quation S={( -b+√Delta / 2a ); (-b-√Delta / 2a)}

// set a structure

//    /^X[\^]?[0-2]{1}$|^X$/
//    /X[\^]?[0-2]{0,}/


const struct = {
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

struct.firstArray = parse.setData(struct.firstArray);
struct.secondArray = parse.setData(struct.secondArray);

console.log(struct);




const produce = require ('./produce');

struct.firstArray.x0 = produce.produceForm(struct.firstArray.x0, 0);
struct.firstArray.x1 = produce.produceForm(struct.firstArray.x1, 1);
struct.firstArray.x2 = produce.produceForm(struct.firstArray.x2, 2);
///////
struct.secondArray.x0 = produce.produceForm(struct.secondArray.x0, 0);
struct.secondArray.x1 = produce.produceForm(struct.secondArray.x1, 1);
struct.secondArray.x2 = produce.produceForm(struct.secondArray.x2, 2);

//////
// const arr = struct.secondArray.arr.replace();

console.log(struct);

/////////