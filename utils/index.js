/**
 * initizalized and get rendering for webGL
 * @param {HTMLCanvasElement} canvas 
 * @param {boolean} debug 
 * @returns {WebGLRenderingContext}
 */
function getWebGLContext(canvas, debug) {
  const gl = canvas.getContext('webgl')
  return gl
}

// const c = document.querySelector('canvas')
// const gl = c.getContext('webgl')

/**
 * create a shader object
 * @param {WebGLRenderingContext} gl 
 * @param {number} type the type of the shader object to be created
 * @param {*} source shader program
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (shader === null) {
    console.log('unable to create shader')
    return
  }

  // set the shader program
  gl.shaderSource(shader, source)

  // complie the shader
  gl.compileShader(shader)

  // check the result of compilation
  const complied = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!complied) {
    const error = gl.getShaderInfoLog(shader)
    console.log('Failed to complie shader:' + error)
    gl.deleteShader(shader)
    return null
  }

  return shader
}

/**
 * create the linked program object
 * @param {WebGLRenderingContext} gl GL context
 * @param {string} vshader a vertex shader program
 * @param {string} fshader a fragment shader program
 */
function createProgram(gl, vshader, fshader) {
  const vertextShader = loadShader(gl, gl.VERTEX_SHADER, vshader)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader)

  if (!vertextShader || !fragmentShader) {
    return null
  }

  // create a program object
  const program = gl.createProgram()

  if (!program) {
    return null
  }

  // attach the shader objects
  gl.attachShader(program, vertextShader)
  gl.attachShader(program, fragmentShader)

  // link the program object
  gl.linkProgram(program)

  // check the result of linking
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked) {
    const error = gl.getProgramInfoLog(program)
    console.log(`Failed to link program: ${error}`)
    gl.deleteProgram(program)
    gl.deleteShader(vertextShader)
    gl.deleteShader(fragmentShader)
    return null
  }

  return program
}

/**
 * create a program object and make current
 * @param {WebGLRenderingContext} gl 
 * @param {string} vshader a vertex shder program
 * @param {string} fshader a fragment shader program
 */
function initShaders(gl, vshader, fshader) {
  const program = createProgram(gl, vshader, fshader)
  if (!program) {
    console.log('Failed to create program')
    return false
  }

  gl.useProgram(program)
  gl.program = program
  
  return true
}
