
const container = document.querySelector('.container');

const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let field = DEFAULT_SIZE;


function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  //activateButton(newMode)
  currentMode = newMode
}

function setCurrentSize(newSize) {
  field = newSize
}

function reset_all(){
	var cell_elements = document.getElementsByClassName("field");

    for(var i = (cell_elements.length - 1); i >= 0; i--)
    {
        cell_elements[i].style.backgroundColor = 'white';
    }
}

document.getElementById("reset").addEventListener("click", reset_all);

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colour')
const rainbowBtn = document.getElementById('rgb')

const sizeValue = document.getElementById('svalue')
const sizeSlider = document.getElementById('slider')

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value}`
}

function reloadGrid() {
  delete_all()
  setupGrid(field)
}

function setupGrid(size) {
	let dimension = (500/field);
	for (let i=0; i<size; i++) {
		const contenti = document.createElement('div');
		contenti.classList.add("column");
		for (let l=0; l<size; l++){
			const contentl = document.createElement('div');
			contentl.setAttribute('style',`border:1px solid black; width:${dimension}px; height:${dimension}px;`);
			contentl.classList.add("field");

			contentl.addEventListener('mouseover', changeColor)
			//contentl.addEventListener('mousedown', changeColor)			
			contenti.appendChild(contentl)
		}
	container.appendChild(contenti)

}
}

function delete_all() {
  container.innerHTML = ''
}

window.onload = () => {
  setupGrid(field)
  //activateButton(DEFAULT_MODE)
}


function getRandomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
}





function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}





function changeColor(e){
	//if (e.type === 'mouseover' && !mouseDown) return
	if (currentMode==='color') {
		const cells = document.querySelectorAll('.field');
		cells.forEach((cell)=>{cell.addEventListener('mouseover',()=>{
		cell.style.backgroundColor = currentColor;
		})
		})
	} else {
		const cells = document.querySelectorAll('.field');
		cells.forEach((cell)=>{cell.addEventListener('mouseover',()=>{
		cell.style.backgroundColor = getRandomColor();
		})
		})
	}
}




