/**
 * 
 * @param vector 
 * @param rad 
 */
function ratate(vector, rad) {
  
}

class Vector {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * 旋转向量
   * @param rad 
   * @returns {Vector}
   */
  rotate(rad: number) {
    const s = Math.sin(rad)
    const c = Math.cos(rad)

    const { x, y } = this

    this.x = x * c - y * s
    this.y = x * s + y * c

    return this
  }

  transform() {

  }
}

class Matrix2 {


  multi() {

  }
}

new Float32Array
