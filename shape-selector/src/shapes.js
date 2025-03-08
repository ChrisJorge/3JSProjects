import * as Three from 'three'


export class Cube{
    constructor(scene)
    {
        this.scene = scene
        this.cubeGeometry = new Three.BoxGeometry(1,1,1);
        this.cubeColor = new Three.Color("#787FE8");
        this.cubeMaterial = new Three.MeshBasicMaterial({color: this.cubeColor});
        this.cubeMesh = new Three.Mesh(this.cubeGeometry, this.cubeMaterial);
        this.scene.add(this.cubeMesh)
        this.cubeMesh.position.set(0,0,0)
        this.objectID = this.cubeMesh.geometry.uuid
        this.objectType = 'Cube'
    }
}