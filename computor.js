// get the equation
// get two sidece by spliting with '='
// simplify the two strings (reduced form)
// get the b , a and c then calculate Delta = b^2 - 4ac
// solve quation S={( -b+√Delta / 2a ); (-b-√Delta / 2a)}

// set a structure

//    /^X[\^]?[0-2]{1}$|^X$/
//    /X[\^]?[0-2]{0,}/


const struct = {
    firstArray:{
        degree: 0,
        arr:'',
        par:[],
        x0:[],
        x1:[],
        x2:[]
    },
    secondArray:{
        degree: 0,
        arr: '',
        par:[],
        x0:[],
        x1:[],
        x2:[]
    }
};


// check if the arguments
var arr = [];
if (process.argv.length > 3){
    console.log (`Error to many args...`);
    process.exit(1);
}else if (process.argv.length == 2){
    console.log ('Error, please add an argument');
    process.exit(1);
}


//////////// get the equation from the argument
for (let i = 2; i < process.argv.length; i++){
    arr.push(process.argv[i]);
}


///////////////// splite the equation
const f = arr[0].split('=');

if (f.length == 2){
    struct.firstArray.arr = f[0].trim();
    struct.secondArray.arr = f[1].trim();
}else if (f.length == 1){
    struct.firstArray.arr = f[0].trim();
    struct.secondArray.arr = '0';
}

/////////////////// match

const regex1 = /X[\^]?[0-2]{0,}/gi;
const regex2 = /^X[\^][0-2]{1}$|^X$/i;
const regex3 = /^[^a-wy-z<>%@#&!_.]+$/ig;

if (arr[0].match(regex3) === null){
    console.log (`Syntax Error`);
    process.exit (1);
}

const parse = require ('./parse');

parse.checkSyntax(regex1, regex2, arr[0]);

struct.firstArray = parse.setData(struct.firstArray);
struct.secondArray = parse.setData(struct.secondArray);

console.log (struct);
//  ([\+\-]{0,}[0-9]{1,})([\*\/]{1}[0-9]{1,})


const produceForm = (arr, degree) => {
    let holder;
    const cal = {
        index:0,
        x: undefined,
        sign: undefined,
        y: undefined,
        total: 0
    };

    
    arr.forEach(element => {
        holder = element.slice();
        let match1 = holder.match(/[\*\/]/g);
        
        // / or * operation
        if (holder.match(/[\*\/]/g)){
            console.log (`\t [${holder}]operation ${match1}`);
            match1 = holder.match(/(?:[\*\/])[0-9]{1,}/g);
            console.log (`\t\tsec match =>${match1}`);
            console.log (`\t ther match =>${match1}`);
            match1 = holder.match(/^[\+\-]{0,}[0-9]{1,}/);
            console.log (`\t four match =>${match1}`);
        }
        console.log (`holder === ${holder} | ${parseInt(holder)}`);

    });


    console.log (cal);
}


const calculate = (x, y, sign) => {
    if ((x === 0 || y === 0)&& sign === '/'){
        console.log('Error devision by 0');
        process.exit(1);
    }
    switch (sign) {
        case '+':
             return x + y;
        case '/':
            return  x / y;
        case '-':
            return  x - y;
        case '*':
            return  x * y;
    }
};




produceForm (struct.firstArray.x0, 0);

