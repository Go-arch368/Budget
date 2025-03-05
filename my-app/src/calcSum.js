function calcSum(arr){
    if(JSON.stringify(arr) in calcSum.cache){
        return calcSum.cache[JSON.stringify(arr)]
    }
     let result=0
     for (let i=0;i<arr.length;i++){
        result+=arr[i]
        console.log("...loading");
     }
     calcSum.cache[JSON.stringify(arr)]=result
     return result
}
    calcSum.cache={}
console.log(calcSum([1,2,3]));//6
console.log(calcSum([1,2,3]));//6