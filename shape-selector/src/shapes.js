import * as Three from 'three'


export class Cube{
    constructor(scene, color, xVal, yVal, zVal)
    {
        this.scene = scene
        this.color = color
        this.xVal = xVal
        this.yVal = yVal
        this.zVal = zVal
        this.cubeGeometry = new Three.BoxGeometry(xVal,yVal,zVal);
        this.cubeColor = new Three.Color(this.color);
        this.cubeMaterial = new Three.MeshBasicMaterial({color: this.cubeColor});
        this.cubeMesh = new Three.Mesh(this.cubeGeometry, this.cubeMaterial);
        this.scene.add(this.cubeMesh)
        this.cubeMesh.position.set(0,0,0)
        this.objectID = this.cubeMesh.geometry.uuid
        this.objectType = 'Cube'
    }
}