import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import { DragControls } from 'three/addons/controls/DragControls.js';
import {Cube} from './shapes.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
scene.add(camera)
const canvas = document.querySelector('.threeJS')
const renderer = new THREE.WebGLRenderer({canvas : canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.x = 7.26
camera.position.y = 2.63
camera.position.z = 5.63

const size = 10
const division = 10
const gridHelper = new THREE.GridHelper(size, division)
scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const orbitController = new OrbitControls(camera, renderer.domElement)
orbitController.enableDamping = true
let dragObjectArray = []
const dragController = new DragControls(dragObjectArray, camera, renderer.domElement)

let objects = {}
let selectedObject = null
const cubeCreator = document.querySelector('.cubeCreator')
const cubeColorElement = document.querySelector('.cubeColor')
const cubeXElementSlider = document.querySelector('.cubeXSlider')
const cubeYElementSlider = document.querySelector('.cubeYSlider')
const cubeZElementSlider = document.querySelector('.cubeZSlider')
const cubeXInputBox = document.querySelector('.cubeXText')
const cubeYInputBox = document.querySelector('.cubeYText')
const cubeZInputBox = document.querySelector('.cubeZText')
let cubeColorValue = "#787FE8"
let cubeXValue = 1
let cubeYValue = 1
let cubeZValue = 1
const rayCaster = new THREE.Raycaster();
const pointer = new THREE.Vector2()

const checkObjectCoordinates = (object) => {
    if(object !== null && object.objectType =='Cube')
    {   
        if(object.cubeMesh.position.y < (0.43 + (0.485 * (object.cubeGeometry.parameters.height - 1))))
        {
            object.cubeMesh.position.y = 0.43 + (0.485 * (object.cubeGeometry.parameters.height - 1))
        }
    }
}

const validateNumber = (number) => {
    console.log(typeof(number))
    if (isNaN(number) == true)
      {
        return -1
      }
    else if (number < 0)
      {
        return 0
      }
    else if (number > 3.5)
      {
        return 3.5
      }
    else
    {
      return number
    }
}
  
  const checkString = (string) => {
  
    for(let index = 0; index < string.length; index++)
    {
      if (string[index] == '.' && index == string.length - 1)
        {
          return true
        } 
    }
    return false
}
  
const validateScaleInput = (scaleInput) => {
  
    let containsPeriod = checkString(scaleInput)
  
    return containsPeriod ? -1 : validateNumber(parseFloat(scaleInput))
  
}

const renderLoop = () => {
    checkObjectCoordinates(selectedObject)
    orbitController.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop)
} 


cubeCreator.addEventListener('click', () => {
    let cube = new Cube(scene, cubeColorValue, cubeXValue, cubeYValue, cubeZValue)
    cube.cubeMesh.position.y = 0.43 + (0.485 * (cube.cubeGeometry.parameters.height - 1))
    objects[cube.cubeMesh.geometry.uuid] = cube
    dragObjectArray.push(cube.cubeMesh)
    console.log(objects)
})

dragController.addEventListener('dragstart', (event) => {
    orbitController.enabled = false
    selectedObject = objects[event.object.geometry.uuid]
})

dragController.addEventListener('dragend', () => {
    orbitController.enabled = true
})

cubeColorElement.addEventListener('input', () => {
    cubeColorValue = cubeColorElement.value
})

cubeXElementSlider.addEventListener('input', () => {
    cubeXValue = cubeXElementSlider.value
    cubeXInputBox.value = cubeXElementSlider.value
})

cubeXInputBox.addEventListener('input', () => {
    let val = validateScaleInput(cubeXInputBox.value)

    if(val == -1)
    {
        cubeXValue = cubeXInputBox.value
    }
    else
    {
        cubeXValue = val 
    }

    cubeXElementSlider.value = cubeXValue
    cubeXInputBox.value = cubeXValue
})

cubeYElementSlider.addEventListener('input', () => {
    cubeYValue = cubeYElementSlider.value
    cubeYInputBox.value = cubeYElementSlider.value
})

cubeYInputBox.addEventListener('input', () => {
    let val = validateScaleInput(cubeYInputBox.value)

    if(val == -1)
    {
        cubeYValue = cubeYInputBox.value
    }
    else
    {
        cubeYValue = val 
    }

    cubeYElementSlider.value = cubeYValue
    cubeYInputBox.value = cubeYValue
})

cubeZElementSlider.addEventListener('input', () => {
    cubeZValue = cubeZElementSlider.value
    cubeZInputBox.value = cubeZElementSlider.value
})

cubeZInputBox.addEventListener('input', () => {
    let val = validateScaleInput(cubeZInputBox.value)

    if(val == -1)
    {
        cubeZValue = cubeZInputBox.value
    }
    else
    {
        cubeZValue = val 
    }

    cubeZElementSlider.value = cubeZValue
    cubeZInputBox.value = cubeZValue
})


window.addEventListener('click', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1

    rayCaster.setFromCamera(pointer, camera);
    const intersectedObject = rayCaster.intersectObjects(scene.children)

    if(intersectedObject.length > 0)
    {
        let selected = null
        for(let index = 0; index < intersectedObject.length; index++)
        {
            if (intersectedObject[index].object.type == 'Mesh')
            {
                selected = intersectedObject[index];
                selectedObject = objects[selected.object.geometry.uuid]
                break;
            }
        }
    } 
})

renderLoop()