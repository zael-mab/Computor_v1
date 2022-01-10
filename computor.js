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

struct.firstArray.arr =
    console.log(struct);

// +-n*/m+-
const reg = /[\+\-]{0,1}\s{0,}[0-9]{1,}\s{0,}[\*\/]\s{0,}[0-9]{1,}/;
// +-n-+
const regg = /[\+\-]{1}[0-9]{1,}[\+\-]{0,}(?![\/\*])|^[0-9]{1,}[\+\-]{1}|(?![\/\*])[0-9]{1,}$/;

// (+-X/*Y)
// [^\^\/\*][\+-]{0}[0-9]{1,}[\/\*]{1}[0-9]{1,}
// +-X+-Y-+
// [\+\-]{1}[0-9]{1,}[\+\-]{1,}(?![\/\*])[0-9]{1,}[\+\-]{1}|[\+\-]{1}[0-9]{1,}[\+\-]{1,}(?![\/\*])[0-9]{1,}$|^[\+\-]{0,}[0-9]{1,}[\+\-]{1,}(?![\/\*])[0-9]{1,}[\+\-]{1}
// 



//  //////////////
const produceForm = (arr, degree) => {
    let holder;
    const cal = {
        index: 0,
        x: undefined,
        xSign: undefined,
        oper: undefined,
        y: undefined,
        ySign: undefined,
        total: 0
    };
    let total = 0;

    arr.forEach(element => {
        holder = element.slice().replace(/\s/g, '');
        const numbers = holder.match(/[0-9]{1,}/g);
        const s = holder.match(/\*\s{0,}\/|\/\s{0,}\*/g);

        cal.index = 0;
        cal.x = undefined;
        cal.y = undefined;
        cal.xSign = undefined;
        cal.ySign = undefined;
        cal.total = 0;
        for (let j = 0; j < holder.length; j++) {

            // looking for the sign
            if (holder[j].match(/[\+\-]/)) {
                cal.index = 0;
                cal.ySign = (cal.ySign === undefined && cal.x) ? holder[j] : cal.ySign;
                cal.xSign = (!cal.x && !cal.y) ? holder[j] : cal.xSign;
            }

            // Looking for the operation
            if (holder[j].match(/([\*\/])/)) {
                cal.index = 0;
                cal.oper = holder[j];
                // console.log('sign =' + cal.oper);
            }
            // Looking for a Number

            if (holder[j].match(/[0-9]/) && cal.index == 0) {
                cal.y = (cal.y === undefined && cal.x) ? parseFloat(holder.slice(j, )) : cal.y;
                cal.x = (cal.x) ? cal.x : parseFloat(holder.slice(j, ));
                cal.index = 1;

                console.log('x=' + cal.x + ' ' + 'y=' + cal.y + ' | ' + holder.slice(j, ));
            }
            //  ////////////////////////////
            if (cal.x && cal.y) {
                // console.log(`XSIGN=${cal.xSign}`);
                let factor = 1;
                factor = cal.xSign === '-' ? -1 : 1;
                cal.x = calculate(cal.x, factor, '*');
                factor = cal.ySign === '-' ? -1 : 1;
                cal.y = calculate(cal.y, factor, '*');
                if (cal.oper != undefined) {
                    cal.total += calculate(cal.x, cal.y, cal.oper);
                    console.log(`$-------->x=${cal.x} ${cal.oper} y=${cal.y} = ${cal.total}`);
                    cal.x = undefined;
                    cal.y = undefined;
                    cal.xSign = undefined;
                    cal.ySign = undefined;
                    cal.oper = undefined;
                } else {
                    cal.total += calculate(cal.x, cal.y, '+');
                    cal.x = undefined;
                    cal.y = undefined;
                    console.log(`$-------->x=${cal.x} + y=${cal.y} = ${cal.total}`);
                }
            }
            // console.log(`XSIGN=${cal.oper}`);
            if (cal.x && cal.oper && cal.total != 0) {
                cal.x = calculate(cal.x, (cal.xSign === '-' ? -1 : 1), '*');
                var t = cal.total;
                cal.total = calculate(cal.total, cal.x, cal.oper);
                console.log(`$---->total=${t} ${cal.oper} x=${cal.x} = ${cal.total}`);
                cal.oper = undefined;
                cal.x = undefined;
                cal.xSign = undefined;
            }
            // if (cal.x && cal.oper && cal.total > 0) {
            //     cal.x = calculate(cal.x, (cal.xSign === '-' ? -1 : 1), '*');
            //     cal.total = calculate(cal.total, cal.x, cal.oper);
            //     console.log(`$---->total=${cal.total} ${cal.oper} x=${cal.x} = ${cal.total}`);
            //     cal.oper = undefined;
            //     cal.x = undefined;
            //     cal.xSign = undefined;
            // } // console.log('Y');

        }
        console.log('------------');
        if (cal.x && !cal.y && !cal.oper) {
            cal.x = calculate(cal.x, (cal.xSign === '-' ? -1 : 1), '*');
            console.log(' x = ' + cal.x);
            cal.total += cal.x;
            cal.xSign = undefined;
            cal.x = undefined;
        }
        total += cal.total;
    });
    cal.total = total;
    console.log(cal);
}



const calculate = (x, y, sign) => {
    if (!x | !y) {
        console.log('E');
        process.exit(1);
    }
    if ((x === 0 || y === 0) && sign === '/') {
        console.log('Error devision by 0');
        process.exit(1);
    }
    switch (sign) {
        case '+':
            return x + y;
        case '/':
            return x / y;
        case '-':
            return x - y;
        case '*':
            return x * y;
    }
};




produceForm(struct.firstArray.x0, 0);