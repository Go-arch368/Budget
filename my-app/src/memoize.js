function factorial(n){
    if(n in factorial.cache){
        return factorial.cache[n]
    }
    let product=1
    for(let i=n;i>0;i--){
        product*=i
        console.log("loading...")
    }
    factorial.cache[n]=product
    return product
}
factorial.cache={}
console.log(factorial(5))
console.log(factorial(5))
console.log(factorial(5))
console.log(factorial(6))
console.log(factorial(6))
console.log(factorial(6))