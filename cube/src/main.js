import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new Three.Scene();

const cubeGeometry = new Three.BoxGeometry(1,1,1)
const cubeColor = new Three.Color("rgb(45,57,216)")
const cubeMaterial = new Three.MeshBasicMaterial({color: cubeColor})
const cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial)

scene.add(cubeMesh)

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)

camera.position.z = 2

scene.add(camera)

const canvas = document.querySelector('.threeJS')

const renderer = new Three.WebGLRenderer({canvas : canvas})

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

renderer.setSize(window.innerWidth, window.innerHeight)

const renderLoop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop)
}

renderLoop()