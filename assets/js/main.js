// ---------------------- All Veriables ----------------------
// ------- filters Veriables -------
let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');
// ------- btns Veriables -------
let upload = document.getElementById('upload');
let download = document.getElementById('download');
let reset = document.getElementById('reset');
// image
let img = document.getElementById('img');
let canvas = document.getElementById('canvas');
let imgBox = document.querySelector('.img');

let context = canvas.getContext('2d');

let filtersBox = document.querySelector('.filters');
let allFillters = document.querySelectorAll('ul li input');

window.onload = ()=>{
    imgBox.style.display = 'none';
    filtersBox.style.display = 'none';
}

// ---------------------- Reset all values ----------------------
reset.addEventListener('click',resteValue());
function resteValue(){
    img.style.filter = 'none';
    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    grayscale.value = 0;
    blur.value = 0;
    hueRotate.value = 0;
}

// ---------------------- Uplaod image  ----------------------
upload.onchange = ()=>{
    resteValue();
    imgBox.style.display = 'block';
    filtersBox.style.display = 'block';
    readImageFile();
    img.onload = ()=>{
        drawIncanvas();
    }
}

function readImageFile(){
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = ()=>{
        img.src = file.result;
    }
}
function drawIncanvas(){
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img,0,0,canvas.width,canvas.height);
    img.style.display = 'none';
}
// ---------------------- Add filters ----------------------
allFillters.forEach(filter=>{
    filter.addEventListener('input',()=>{
        context.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
        context.drawImage(img,0,0,canvas.width,canvas.height);
    });
})
// ---------------------- Download the image ----------------------
download.addEventListener('click',()=>{
    download.href = canvas.toDataURL(undefined,'1080px');
})

