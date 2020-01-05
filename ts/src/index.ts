const deepEqual = require('deep-equal');
// XXX Could not find a declaration file for module 'deep-equal'.
// import * as deepEqual from 'deep-equal';

console.log("Start.");

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
  }
  add(point: Point) {
      return new Point(this.x + point.x, this.y + point.y);
  }
}

class Point3D extends Point {
  z: number;
  constructor(x: number, y: number, z: number) {
      super(x, y);
      this.z = z;
  }
  add(point: Point3D) {
      var point2D = super.add(point);
      return new Point3D(point2D.x, point2D.y, this.z + point.z);
  }
}

const p1 = new Point3D(0, 10, 20);
const p2 = new Point3D(10, 20, 30);
const p3 = p1.add(p2);

console.log(p3);

console.log("End.");
