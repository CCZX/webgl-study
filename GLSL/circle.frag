#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;

  st -= 0.5;

  float radius = length(st);

  float color = radius > 0.2 ? 1.0 : 0.0;

  gl_FragColor = vec4(vec3(color), 1.0);
}

