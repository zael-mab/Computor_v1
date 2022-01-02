// get the equation
// get two sidece by spliting with '='
// simplify the two strings (reduced form)
// get the b , a and c then calculate Delta = b^2 - 4ac
// solve quation S={( -b+√Delta / 2a ); (-b-√Delta / 2a)}

// set a structure
const struct = {
    degree: 0,
    firstArray:{
        arr:'',
        x0:'',
        x1:'',
        x2:''
    },
    secondArray:{
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
        if (str.arr[i] === '+' || str.arr[i] === '-' || i  === str.arr.length){

            if (i == 0)
                continue;
            const tmp = str.arr.slice(j, i);
            console.log(tmp,'|', i, j);
            // if (!isNaN(parseInt(tmp))){
            //     console.log(`====>${(parseInt(tmp))}`);
            //     num.push(parseInt(tmp));
            // }else {
            //     num.push(tmp);
            // }
            j = i;
        }
        // 
    }
    return str;
}

struct.firstArray = setData(struct.firstArray);
struct.secondArray = setData(struct.secondArray);
console.log (struct);
// /////////////////




// const simplify = (str) => {
//     console.log (`\n${str}`);
//     let num = [];
//     let j = 0;
//     for (let i = 0; i <= str.length; i++){
//         if (str[i] === '+' || str[i] === '-' || i  === str.length){

//             if (i == 0)
//                 continue;
            
//             let nb;
//             const tmp = str.slice(j, i);
//             console.log(tmp,'|', i, j);

//             if (!isNaN(parseInt(tmp))){
//                 console.log(`====>${(parseInt(tmp))}`);
//                 num.push(parseInt(tmp));
//             }else {
//                 num.push(tmp);
//             }
//             j = i;
//         }
//     }
//     console.log (`num = ${num}\n`);
//     return num;
// }

// const firstArray = simplify(f[0]);
// console.log(firstArray.length);
// for(let i = 0; i < firstArray.length; i++){
//     console.log(Number.isInteger(firstArray[i]));

// }
// const secondArray = simplify(f[1]);