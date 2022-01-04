

const checkSyntax = (regex1, regex2, arr) => {

    const matches = arr.match(regex1);
    // console.log (matches);
    
    if (matches != null){
        matches.forEach(element => {
            // console.log(`element => ${element}`);
            const check = element.match(regex2);
            
            if (check === null){
                console.log (`syntax Error [${element}] | ${arr}`);
                process.exit(1);
            }
        });
    }
};

const setData = (str) => {
    let j = 0;
    let parentheses = {
        index : 0,
        error: 0
    };

    for (let i = 0; i <= str.arr.length; i++){
        if ((str.arr[i] === 'X' || str.arr[i] === 'x') && str.arr[i + 1] === '^'){
            if (str.arr[i + 2] === '0'){
                str.arr = str.arr.replace(/X\^0/gi, 1);
            }
            //
            if (str.arr[i + 2] === '1'){
                str.arr = str.arr.replace('X^1', 'X');
            }
        }
// ////////////
        if (str.arr[i] === '+' || str.arr[i] === '-' || i  === str.arr.length){

            if (i == 0)
                continue;
            const tmp = str.arr.slice(j, i).trim();
            let d = degree(tmp);
            if (d == 0){
                str.x0.push(tmp);
            }else if (d == 1){
                str.x1.push(tmp);
            }else if (d == 2){
                str.x2.push(tmp);
            }
            str.degree = d > str.degree ? d : str.degree;
            
            console.log(tmp,'|', i, j, `D = ${d}`);
            j = i;
        }

// ///////////////
        parentheses.error = str.arr[i] === '(' ? parentheses.error + 1 : parentheses.error;
        parentheses.error = str.arr[i] === ')' ? parentheses.error - 1 : parentheses.error;
        parentheses.index = i;
    }
    if (parentheses.error != 0){
        console.log (parentheses.error);
    }
    return str;
}


const degree = (str) => {
    for(let i = 0; i < str.length; i++){
        if ((str[i] === `X`|| str[i] === 'x') && str[i + 1] === '^'){
            return parseInt(str[i + 2]);
        }
        if ((str[i] === 'X'|| str[i] === 'x') && str[i + 1] !== '^'){
            return 1;
        }
    }
    return 0;
}

module.exports = {checkSyntax, setData};
// module.exports = setData;