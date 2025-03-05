import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new Three.Scene();

const cubeGeometry = new Three.BoxGeometry(1,1,1)
let cubeColor = new Three.Color("#787FE8")
let cubeMaterial = new Three.MeshBasicMaterial({color: cubeColor})
let cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial)
let cubeXRotation = 0
let cubeYRotation = 0
let cubeZRotation = 0 

scene.add(cubeMesh)

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)

camera.position.z = 2

scene.add(camera)

const canvas = document.querySelector('.threeJS')

const renderer = new Three.WebGLRenderer({canvas : canvas})

const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true

renderer.setSize(window.innerWidth, window.innerHeight)

const colorInput = document.querySelector('.colorInput')

const xInputSlider = document.querySelector('.xSizeInputSlider')

let xSize = 1

const xTextBox = document.querySelector('.xSizeInputText')

let rotationAxis = 'None'

colorInput.addEventListener('input', () => {
  scene.remove(cubeMesh)
  cubeColor = new Three.Color(`${colorInput.value}`)
  let cubeMaterial = new Three.MeshBasicMaterial({color: cubeColor})
  cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial)
  cubeMesh.rotation.x = cubeXRotation
  cubeMesh.rotation.y = cubeYRotation
  cubeMesh.rotation.z = cubeZRotation
  cubeMesh.scale.x = xSize
  scene.add(cubeMesh)
})

xInputSlider.addEventListener('input', () => {
  xSize = xInputSlider.value
  cubeMesh.scale.x = xInputSlider.value
  xTextBox.value = xInputSlider.value
})

xTextBox.addEventListener('input', () => {

  if(xTextBox.value == '')
    {
      
    }
  else
  {
    let val = parseFloat(xTextBox.value)
    console.log(val)
    if (xTextBox.value <= -1)
      {
        console.log('We inside 1')
        xSize = 0
      }
      else if (xTextBox.value > 10)
      {
        console.log('We inside 2')
        xSize = 10
      }
      else
      {
        console.log('We inside 3')
        xSize = xTextBox.value
      }
    
      cubeMesh.scale.x = xSize
      xInputSlider.value = xSize
      xTextBox.value = xSize
  }
  })
const rotateArr = document.querySelectorAll('.rotateRadio')
for(let i = 0; i < rotateArr.length; i ++)
{
  rotateArr[i].addEventListener('click', () => {
    let axis = rotateArr[i].id
    rotationAxis = axis
  })
}

const renderLoop = () => {
  switch(rotationAxis){
    case 'x':
      cubeXRotation += 0.007
      cubeMesh.rotation.x = cubeXRotation
      break;
    case 'y':
      cubeYRotation += 0.007
      cubeMesh.rotation.y = cubeYRotation
      break;
    case 'z':
      cubeZRotation += 0.007
      cubeMesh.rotation.z = cubeZRotation
      break; 
  }
  renderer.setSize(window.innerWidth, window.innerHeight)
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop)
}

renderLoop()