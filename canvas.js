let canvas = document.getElementById("canvas");// 获取一个canvas ；
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
//获取canvas的视口屏幕宽高
let proceed = false //设置一个鼠标判定值
let ctx = canvas.getContext('2d');
let last //声明个last变量作为上一次坐标标记
ctx.fillStyle = 'black';
ctx.strokeStyle = 'none';
ctx.lineWidth = 5;
ctx.lineCap = "round";
function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
let isTouchDevice = 'ontouchstart' in document.documentElement;//获取触屏的参数（给手机和平板）
if(isTouchDevice){
    canvas.ontouchstart = (a) =>{
        let x = a.touches[0].clientX
        let y = a.touches[0].clientY
        last = [x, y]
    }
    canvas.ontouchmove = (a) =>{
        let x = a.touches[0].clientX
        let y = a.touches[0].clientY
        drawLine(last[0], last[1], x, y)
        last = [x, y]
    }
}else{
    canvas.onmousedown = (a) => {
        proceed = true
        last = [a.clientX, a.clientY]
    }
    canvas.onmousemove = (a) => {
        if(proceed === true) {
            drawLine(last[0], last[1], a.clientX, a.clientY)
            last = [a.clientX, a.clientY]
        }
    }
}
canvas.onmouseup = () => {
    proceed = false
}
//设置个函数，让设置的鼠标判定值不按下时为假