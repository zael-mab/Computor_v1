// get the equation
// get two sidece by spliting with '='
// simplify the two strings (reduced form)
// get the b , a and c then calculate Delta = b^2 - 4ac
// solve quation S={( -b+√Delta / 2a ); (-b-√Delta / 2a)}

// set a structure

//    /^X[\^]?[0-2]{1}$|^X$/
//    X[\^]?[0-2]{0,}


const struct = {
    firstArray:{
        degree: 0,
        arr:'',
        x0:'',
        x1:'',
        x2:''
    },
    secondArray:{
        degree: 0,
        arr: '',
        x0:'',
        x1:'',
        x2:''
    }
};


// check if the arguments
var arr = [];
if (process.argv.length > 3){
    console.log (`Error to many args...`);
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

console.log (struct);


/////////////semplify and set Data
const setData = (str)=>{
    let j = 0;
    const reg = /X$|X\^[0-2]$/;
    for (let i = 0; i <= str.arr.length; i++){

        if (str.arr[i] === 'X' && str.arr[i + 1] === '^'){
            // 
            if (str.arr[i + 2] > '2'){
                console.log ('Error');
                process.exit(1);
            }
            // 
            if (str.arr[i + 2] === '0'){
                str.arr = str.arr.replace('X^0', 1);
            }
            //
            if (str.arr[i + 2] === '1'){
                str.arr = str.arr.replace('X^1', 'X');
            }
        }
// /////////////
        if (str.arr[i] === 'X' && str.arr[i + 1] !== '^' && Number.isInteger(parseInt(str.arr[i + 1]))){
            console.log(`Error ^ is missing between ${str.arr[i]} ${str.arr[i + 1]}`);
            break;
        }
// ///////////
        // if (){

        // }
// ////////////
        if (str.arr[i] === '+' || str.arr[i] === '-' || i  === str.arr.length){

            if (i == 0)
                continue;
            const tmp = str.arr.slice(j, i);
            let d = degree(tmp);
            if (d == 0){
                str.x0 = tmp.slice();
            }else if (d == 1){
                str.x1 = tmp.slice();
            }else if (d == 2){
                str.x2 = tmp.slice();
            }
            str.degree = d > str.degree ? d : str.degree;
            
            console.log(tmp,'|', i, j, `D = ${d}`);
            j = i;
        }
        // 
    }
    return str;
}

// ////////////////////////
const degree = (str) => {
    for(let i = 0; i < str.length; i++){
        if (str[i] === 'X' && str[i + 1] === '^' && Number.isInteger(parseInt(str[i + 2]))){
            return parseInt(str[i + 2]);
        }
        if (str[i] === 'X' && str[i + 1] !== '^'){
            return 1;
        }
    }
    return 0;
}


// ////////////////////////////
struct.firstArray = setData(struct.firstArray);
struct.secondArray = setData(struct.secondArray);
console.log (struct);
