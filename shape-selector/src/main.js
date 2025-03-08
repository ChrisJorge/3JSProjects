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
const rayCaster = new THREE.Raycaster();
const pointer = new THREE.Vector2()


dragController.addEventListener('dragstart', (event) => {
    orbitController.enabled = false
    selectedObject = objects[event.object.geometry.uuid]
})

dragController.addEventListener('dragend', () => {
    orbitController.enabled = true
})

const checkObjectCoordinates = (object) => {
    if(object !== null && object.objectType =='Cube')
    {   
        if(object.cubeMesh.position.y < (0.43 + (0.485 * (object.cubeGeometry.parameters.height - 1))))
        {
            object.cubeMesh.position.y = 0.43 + (0.485 * (object.cubeGeometry.parameters.height - 1))
        }
    }
}

const renderLoop = () => {
    checkObjectCoordinates(selectedObject)
    orbitController.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop)
} 


cubeCreator.addEventListener('click', () => {
    let cube = new Cube(scene)
    cube.cubeMesh.position.y = 0.43 + (0.485 * (cube.cubeGeometry.parameters.height - 1))
    objects[cube.cubeMesh.geometry.uuid] = cube
    dragObjectArray.push(cube.cubeMesh)
    console.log(objects)
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