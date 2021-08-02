// const num1 = 6e9
// const num2 = 100000
// const calcular = () =>{
//     let sum = 0
//     for(i=0;i<num2;i++){
//         sum++
//     }
//     return sum;
// }

// process.on("message", msg =>{
//     if(msg === "start"){
//         const cal = calcular();
//         process.send(cal)
//     }
// })

console.log("WAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

process.on("message", msg =>{
    if(msg === "start"){
        const cal = "waza";
        process.send(cal)
    }
})