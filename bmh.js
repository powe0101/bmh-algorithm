const constructBadMatchTable = (pattern) => {
    const map = new Map();
    const patternLength = pattern.length;

    for(let i = 0; i < patternLength - 1; i++){
        map.set(pattern[i], patternLength - i - 1);
    }
    
    //if rightmost character already in map, skip this part.        
    if(!map.has(pattern[patternLength - 1])){
        map.set(pattern[patternLength - 1], patternLength);
    }
    return map;
}

const search = (string, pattern) => {
    const badMatchTable = constructBadMatchTable(pattern);
    let offset = 0;
    
    const patternLastIndex = pattern.length - 1;
    var matches = [];
    //1
    while(offset <= string.length){
        let currentIndex = patternLastIndex;
        //2
        while(pattern[currentIndex] === string[currentIndex + offset]){
            if(currentIndex === 0){
              matches.push(offset);
              offset += 1;
              break;
            }
            currentIndex --;
        }
        //3
        const rightMostChar = string[offset + patternLastIndex];
        if (badMatchTable.has(rightMostChar)){
            offset += badMatchTable.get(rightMostChar);
        } else{
            offset += pattern.length;
        }
    }

    return matches;
}

function solution(str) 
{
   for(var i = 1; i < str.length; ++i)
   {
     var temp = str.substr(0,i);
     var result = search(str,temp);
     var count = temp.length * result.length;
     if(count == str.length)
     {
        console.log(temp);
       return temp;
     }
   }
   
   return str;
}


