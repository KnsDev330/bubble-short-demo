const sleep = async (ms) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    })
}

const main = async () => {
    const inputBox = document.querySelector('input[name="inputBox"]');
    const nums = inputBox.value.replace(/ /g, '').split(',');
    console.log(nums);
    const numsLength = nums.length;
    for(let i=0; i<numsLength; i++){
        if(nums[i] < -99 || nums[i] > 99){
            alert('Input Range is -99 to 99');
            return;
        }
        if(isNaN(nums[i])){
            alert('Invalid Input Passed');
            console.log(nums[i]);
            return;
        }
    }
    nums.forEach((num) => {
        const elem = document.createElement('div');
        elem.innerHTML = `${num}`;
        elem.classList.add('box');
        document.querySelector('.boxs').appendChild(elem);
    });

    let needToCheck = lastIndex = numsLength;
    while(0 < needToCheck){
        let done = 1;
        let boxs = document.querySelectorAll('.box');
        let boxsLength = boxs.length;
        for(let i=0; i<lastIndex-1; i++){
            const checkingIndex = boxs[i];
            const compareIndex = boxs[i+1];
            const checkingNum = parseFloat(checkingIndex.innerHTML);
            const compareNum = parseFloat(compareIndex.innerHTML);
            checkingIndex.setAttribute('data-content', '⬆️');
            checkingIndex.classList.add('bgBlue', 'test');
            compareIndex.classList.add('bgIndex');
            if(checkingNum > compareNum){
                done = 0;
                await sleep(150);
                checkingIndex.style.color = "red";
                compareIndex.style.color = "red";
                await sleep(200);
                checkingIndex.innerHTML = compareNum;
                compareIndex.innerHTML = checkingNum;
            }else{
                await sleep(350);
            }
            await sleep(500);
            checkingIndex.removeAttribute('data-content');
            checkingIndex.classList.remove('bgBlue', 'bgRed');
            compareIndex.classList.remove('bgIndex', 'bgRed');
            checkingIndex.style.color = "black";
            compareIndex.style.color = "black";
        }
        boxs[lastIndex-1].classList.add('bgIndex');
        if(done){
            boxs.forEach((box) => box.classList.add('bgIndex'));
            break;
        }
        needToCheck--;
        lastIndex--;
    }
}