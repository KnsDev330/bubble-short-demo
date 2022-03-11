const sleep = async (ms) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    })
}

const addStep = (i, step) => {
    const boxs = document.querySelectorAll('.box');
    const child = document.createElement('div');
    child.classList.add('steps-boxs');
    let string = `<div data-step="${Math.abs(step) < 10 ? '0'+Math.abs(step) : Math.abs(step)}" class="step">Step</div>`;
    let boxsNew = document.querySelectorAll('.box');
    boxsNew.forEach((v, index) => string += `
        <div class="steps-box" ${([i, i+1].includes(index) ? `style="border-bottom: 2px solid red"` : ``)}>${v.innerHTML}</div>
    `);
    child.innerHTML = string;
    document.querySelector(".steps").prepend(child);
}

let busy = false;
const main = async () => {
    if(busy) return;
    let step = 0;
    document.querySelector('.boxs').innerText = '';
    document.querySelector(".steps").innerText = '';
    const condition = document.querySelector("input[name='type']:checked").value === 'asc' ? true : false;
    busy = !busy;
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

    let lastIndex = numsLength;
    while(0 < lastIndex){
        let done = 1;
        const boxs = document.querySelectorAll('.box');
        for(let i=0; i<lastIndex-1; i++){
            const checkingIndex = boxs[i];
            const compareIndex = boxs[i+1];
            const checkingNum = parseFloat(checkingIndex.innerHTML);
            const compareNum = parseFloat(compareIndex.innerHTML);
            checkingIndex.setAttribute('data-content', '⬆️');
            checkingIndex.classList.add('bgBlue');
            compareIndex.classList.add('bgGreen');
            const conditionX = condition ? checkingNum > compareNum : compareNum > checkingNum;
            if(conditionX){
                done = 0;
                await sleep(150);
                checkingIndex.style.color = "red";
                compareIndex.style.color = "red";
                await sleep(200);
                checkingIndex.innerHTML = compareNum;
                compareIndex.innerHTML = checkingNum;
                step--;
                addStep(i, step);
            }else{
                await sleep(350);
            }
            await sleep(500);
            checkingIndex.removeAttribute('data-content');
            checkingIndex.classList.remove('bgBlue', 'bgRed');
            compareIndex.classList.remove('bgGreen', 'bgRed');
            checkingIndex.style.color = "black";
            compareIndex.style.color = "black";
        }
        boxs[lastIndex-1].classList.add('bgGreen');
        if(done){
            boxs.forEach((box) => box.classList.add('bgGreen'));
            busy = !busy;
            break;
        }
        lastIndex--;
    }
}