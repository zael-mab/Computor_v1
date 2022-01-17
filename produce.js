const parse = require('./parse');

const operat = (cal, holder, j) => {
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
    }
    // Looking for a Number

    if (holder[j].match(/[0-9]/) && cal.index == 0) {
        cal.y = (cal.y === undefined && cal.x) ? parseFloat(holder.slice(j, )) : cal.y;
        cal.x = (cal.x) ? cal.x : parseFloat(holder.slice(j, ));
        cal.index = 1;
        // console.log('x=' + cal.x + ' ' + 'y=' + cal.y + ' | ' + holder.slice(j, ));
    }
    if (cal.x && cal.y) {
        let factor = 1;
        factor = cal.xSign === '-' ? -1 : 1;
        cal.x = parse.calculate(cal.x, factor, '*');
        factor = cal.ySign === '-' ? -1 : 1;
        cal.y = parse.calculate(cal.y, factor, '*');

        if (cal.oper != undefined) {
            if ((cal.x == 0 || cal.y == 0) && cal.oper == '*')
                cal.total = parse.calculate(cal.x, cal.y, cal.oper);
            else
                cal.total += parse.calculate(cal.x, cal.y, cal.oper);
            cal = init(cal);
            cal.oper = undefined;
        } else {
            cal.total += parse.calculate(cal.x, cal.y, '+');
            cal.x = undefined;
            cal.y = undefined;
        }
    }
    if (cal.x && cal.oper && cal.total != 0) {
        cal.x = parse.calculate(cal.x, (cal.xSign === '-' ? -1 : 1), '*');
        cal.total = parse.calculate(cal.total, cal.x, cal.oper);
        cal.oper = undefined;
        cal.x = undefined;
        cal.xSign = undefined;
    }
    return cal;
}



const init = (cal) => {
    cal.x = undefined;
    cal.y = undefined;
    cal.xSign = undefined;
    cal.ySign = undefined;
    return cal;
}



//  //////////////
const reduceForm = (arr, degree) => {
    let holder;
    let cal = {
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
        holder = element.slice();
        cal.index = 0;
        cal = init(cal);
        cal.total = 0;
        
        if (degree > 0) {
            holder = holder.replace(/[X][\^]{0,1}[0-3]{0,1}/ig, '1');
        }
        // if (!holder.match(/[*]{0,1}[0][*]{0,1}/g)){
            for (let j = 0; j < holder.length; j++) {
                cal = operat(cal, holder, j);
            }
            
            if (cal.x && !cal.y && !cal.oper) {
                cal.x = parse.calculate(cal.x, (cal.xSign === '-' ? -1 : 1), '*');
                cal.total += cal.x;
                cal.xSign = undefined;
                cal.x = undefined;
            }
            // console.log ('holder' + holder, cal.total, total);
            total += cal.total;
        // }

    });
    
    let res = {
        mult: undefined,
        form: undefined
    };
    if (degree == 1) {
        res.form = total != 0 ? total.toString() + `*X` : '0';
        res.mult = total != 0 ? total.toString() : '0';
    } else if (degree >= 2) {
        res.form = total != 0 ? total.toString() + `*X^${degree}` : '0';
        res.mult = total != 0 ? total.toString() : '0';
    } else {
        res.form = total.toString();
        res.mult = '1';
    }
    
    return (res);
}



const sqrRoot = (nb) =>{
    let sqr = nb /2;
    let tmp = 0;
    while (tmp != sqr){
        tmp = sqr;
        console.log (tmp);
        sqr = (nb / tmp + tmp )/2;
        console.log (sqr);
    }
    return sqr;
};

// const sqrRoot = (nb) =>{
//     let sqrt = 1;
//     let i = 0;
//     while (true){
//         sqrt = (nb / sqrt + sqrt) /2;
//         i++;
//         if (i == nb/2 + 1 || (sqrt * sqrt) == nb)
//             break ;
//     }
//     return sqrt;
// };


function Square(n, i, j)
{
    var mid = ((i + j) / 2);
    var mul = mid * mid;
 
    // If mid itself is the square root,
    // return mid
    if ((mul == n) || (Math.abs(mul - n) < 0.00001))
        return mid;
 
    // If mul is less than n,
    // recur second half
    else if (mul < n)
        return Square(n, mid, j);
 
    // Else recur first half
    else
        return Square(n, i, mid);
}
 
// Function to find the square root of n
function findSqrt(n)
{
    var i = 1;
 
    // While the square root is not found
    var found = false;
    while (!found)
    {
         
        // If n is a perfect square
        if (i * i == n)
        {
            // document.write(i);
            return i;
            found = true;
        }
 
        else if (i * i > n)
        {
             
            // Square root will lie in the
            // interval i-1 and i
            var res = Square(n, i - 1, i);
            // document.write(res.toFixed(5));
            return res;
            found = true;
        }
        i++;
    }
}
 

module.exports = { reduceForm , sqrRoot, findSqrt};