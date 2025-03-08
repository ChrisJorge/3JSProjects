import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import { DragControls } from 'three/addons/controls/DragControls.js';

import {Cube} from './shapes.js'

const scene = new Three.Scene()
// const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)drt
const camera = new Three.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
camera.position.z = 5
scene.add(camera)
const canvas = document.querySelector('.threeJS')
const renderer = new Three.WebGLRenderer({canvas : canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)
let objects = {}
const cubeCreator = document.querySelector('.cubeCreator')

const rayCaster = new Three.Raycaster();
const pointer = new Three.Vector2()

let dragObjectArray = []
let dragController = new DragControls(dragObjectArray, camera, renderer.domElement);

cubeCreator.addEventListener('click', () => {
    let cube = new Cube(scene)
    cube.cubeMesh.position.z = -1
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
        let clickedObject = intersectedObject[0]
        console.log(clickedObject)
        console.log(objects[clickedObject.object.geometry.uuid])
    }
})
const renderLoop = () => {
    dragController.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(renderLoop)
}

renderLoop()