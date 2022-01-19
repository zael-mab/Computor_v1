// get the equation *
// get two sidece by spliting with '=' *
// simplify the two strings (reduced form) *
// get the b , a and c then calculate Delta = b^2 - 4ac
// solve quation S={( -b+√Delta / 2a ); (-b-√Delta / 2a)}

// set a structure
let struct = {
    firstArray: {
        arr: ''
    },
    secondArray: {
        arr: ''
    },
};

///////////////////////////////////////////
function Node(data, degree, next){
    this.data = [];
    this.data.push(data);
    this.degree = degree;
    this.next = next;
};

function head(head){
    this.head = head;
};


function add(head, data, d){
    let node = new Node(data, d, null);
    if (!head.next){
        head.next = node;
    }else{
        let tmp = head.next;
        while (tmp.next){
            tmp = tmp.next;
        }
        tmp.next = node;
    }
}

let headNode = new Node (null, -1, null);
new head(head);

const cont = function(head){
    let temp = head.next;
    while (temp){
        console.log(temp.data);
        temp = temp.next;
    }
}

////////////////////////////////////////////////////////////////


///////////////////////////////////
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
///////////////////////////////////
let argv = process.argv[2];
//  /////////////////////////////////////////////////////////

// check arguments
if (process.argv.length > 3) {
    console.log(`Error to many args...`);
    process.exit(1);
} else if (process.argv.length == 2) {
    console.log('Error, please add an argument');
    process.exit(1);
}else if (process.argv[2].trim().length === 0){
    console.log('Error, string empty');
    process.exit(1);
}


var arr = [];
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

if (!f[0].replace(/\s/g, '') && (!(f[1].replace(/\s/g, ''))) ){
    console.log ('Syntax Error');
    process.exit(1);
}

// check sting 
const regex3 = /^[^a-wy-z<>%@#&!_,]+$/ig;

if (arr[0].match(regex3) === null) {
    console.log(`Syntax Error`);
    process.exit(1);
}

const parse = require('./parse');


parse.checkSyntax(arr[0]);

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

////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////
struct.secondArray.arr = rev(struct.secondArray.arr);

struct.firstArray.arr = struct.firstArray.arr.replace(/\s/g, '');;
struct.secondArray.arr = struct.secondArray.arr.replace(/\s/g, '');;


struct.firstArray = parse.setData(struct.firstArray, headNode);
struct.secondArray = parse.setData(struct.secondArray, headNode);

const reduce = require('./produce');

//////////////////

let newForm = {
    x0: [],
    x1: [],
    x2: []
};

const setNewForm = (head) => {
    let string = '';
    let temp = head.next;
    
    while (temp){
        const holder = [];
        holder.push(reduce.reduceForm(temp.data, temp.degree));
    
        if (holder[0].form != '0'){
            head.degree = head.degree > temp.degree ? head.degree : temp.degree;
        }

        if (temp.degree > 1){
            string = holder[0].form != '0' ? `${string} + ${holder[0].mult} * X^${temp.degree}` : string;
            if (temp.degree == 2){
                newForm.x2 = holder[0].mult;
            }
        }
        else if (temp.degree == 1){
            string = holder[0].form != '0' ? `${string} + ${holder[0].mult} * X` : string;
            newForm.x1 = holder[0].mult;
        }
        else{
            string = holder[0].form != '0' ? `${string} + ${holder[0].form}` : string;
            newForm.x0 = holder[0].form;
        }
     
        temp.data = holder;
        temp = temp.next;
    }
    if (string)
        string = correctSign(string) + ' = 0';
    else
        string = '0 = 0';
    return string;
}

const reString = setNewForm(headNode);



// //*******************Console***********************//
console.log('Reduced form: ' + reString);
console.log(`Polynomial degree: ${headNode.degree}`);
if (headNode.degree > 2){
    console.log ('I can\'t solve this equation !');
    process.exit(1);
}
// //******************************************//

// Solutions
let tmp = [];
tmp.push(`${newForm.x1}*${newForm.x1}`, `-4*${newForm.x2}*${newForm.x0}`);

let solutions = {
    a: parseFloat(newForm.x2),
    b: parseFloat(newForm.x1),
    c: parseFloat(newForm.x0),
    delta: parseFloat(reduce.reduceForm(tmp, 0).form),
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
    tmp[0] = correctSign(tmp[0]);
    console.log(`The solution is:\n${tmp[0]} = ${reduce.reduceForm(tmp).form}`);

}else if (newForm.x2 != 0){

    if (solutions.delta > 0){
        solutions.s1 = (-solutions.b + reduce.sqrRoot(solutions.delta)) / (2 * solutions.a);
        solutions.s2 = (-solutions.b - reduce.sqrRoot(solutions.delta)) / (2 * solutions.a);
        console.log (`Discriminant is strictly positive, the two solutions are :\nS1 :${solutions.s1}\nS2 :${solutions.s2}`);

    }else if (solutions.delta === 0){
        solutions.s2 = (-solutions.b - reduce.sqrRoot(solutions.delta)) / (2 * solutions.a);
        console.log(`Discriminant = 0\nS :${solutions.s2}`);

    }else if (solutions.delta < 0){
        console.log('complex solutions');
        const d =  reduce.sqrRoot(-solutions.delta) / (2 * solutions.a);
        const x = -solutions.b / (2 * solutions.a);
        console.log (`${x} + ${d}i`);
        console.log (`${x} - ${d}i`);
    }
    
}

