<template>
  <div id="frame" class="w-full h-full fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-0">
    <div id="virus" />
  </div>
</template>
<script>
  export default {
    mounted() {

      var urls = [
        '/images/pos-x.png',
        '/images/neg-x.png',
        '/images/pos-y.png',
        '/images/neg-y.png',
        '/images/pos-z.png',
        '/images/neg-z.png'
      ];

      const textureCube = new THREE.CubeTextureLoader().load(urls);

      textureCube.format = THREE.RGBFormat;
      textureCube.mapping = THREE.CubeReflectionMapping;

      class BackgroundMaterial extends THREE.RawShaderMaterial {
        static shader = {
          vertexShader: `
            attribute vec3 position;

            uniform mat4 projectionMatrix;
            uniform mat4 modelViewMatrix;

            void main() {
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `,
          fragmentShader: `
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform vec2 resolution;
            uniform float time;

            #define RGB(r, g, b) vec3(float(r) / 255.0, float(g) / 255.0, float(b) / 255.0)

            float blendColorDodge(float base, float blend) {
              return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
            }

            vec3 blendColorDodge(vec3 base, vec3 blend) {
              return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
            }

            vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
              return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
            }

            void main() {
              vec2 p = gl_FragCoord.xy / resolution.xy;
              p -= vec2(0.5);
              p.x *= resolution.x / resolution.y;
              vec3 color1 = RGB(40, 55, 90);
              vec3 color2 = RGB(0, 0, 0);
              vec3 highlight = RGB(255, 255, 255);
              float dist = length(p);
              float highlightDist = pow(max(0., 1. - distance(p, vec2(-0.12, 0.12)) * 4.), 3.);

              gl_FragColor = vec4(mix(color1, color2, dist), 1.0);
              gl_FragColor.rgb += highlight * highlightDist * .2;
              gl_FragColor.rgb = blendColorDodge(gl_FragColor.rgb, highlight * highlightDist);
            }
          `,
          uniforms: {
            resolution: {
              value: new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)
            }
          },
          side: THREE.BackSide
        };

        constructor() {
          super(BackgroundMaterial.shader);

          this.resize = () => {
            this.uniforms.resolution.value.set(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
          };

          window.addEventListener('resize', this.resize);
        }
      }

      class BlobMaterial extends THREE.MeshPhysicalMaterial {
        static shader = {
          uniforms: {
            u_time: { value: performance.now() }
          }
        };

        constructor() {
          super({
            color: 0x333650,
            metalness: 0.35,
            roughness: 0.125,
            envMap: textureCube,
            envMapIntensity: 2,
            flatShading: true
          });

          this.loop = timestamp => {
            window.requestAnimationFrame(this.loop);
            this.uniforms.u_time.value = timestamp;
          };

          this.onBeforeCompile = shader => {
            this.uniforms = shader.uniforms;
            Object.assign(shader.uniforms, BlobMaterial.shader.uniforms);
            shader.vertexShader = `
              uniform float u_time;
              varying vec3 vN;

              //
              // Description : Array and textureless GLSL 2D/3D/4D simplex
              //               noise functions.
              //      Author : Ian McEwan, Ashima Arts.
              //  Maintainer : stegu
              //     Lastmod : 20110822 (ijm)
              //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
              //               Distributed under the MIT License. See LICENSE file.
              //               https://github.com/ashima/webgl-noise
              //               https://github.com/stegu/webgl-noise
              //

              vec3 mod289(vec3 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
              }

              vec4 mod289(vec4 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
              }

              vec4 permute(vec4 x) {
                return mod289(((x*34.0)+1.0)*x);
              }

              vec4 taylorInvSqrt(vec4 r)
              {
                return 1.79284291400159 - 0.85373472095314 * r;
              }

              float snoise(vec3 v)
                {
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

              // First corner
                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 =   v - i + dot(i, C.xxx) ;

              // Other corners
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );

                //   x0 = x0 - 0.0 + 0.0 * C.xxx;
                //   x1 = x0 - i1  + 1.0 * C.xxx;
                //   x2 = x0 - i2  + 2.0 * C.xxx;
                //   x3 = x0 - 1.0 + 3.0 * C.xxx;
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

              // Permutations
                i = mod289(i);
                vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

              // Gradients: 7x7 points over a square, mapped onto an octahedron.
              // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                float n_ = 0.142857142857; // 1.0/7.0
                vec3  ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
                //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

              //Normalise gradients
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

              // Mix final noise value
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                              dot(p2,x2), dot(p3,x3) ) );
                }

              mat3 yrotate( float t ) {
                return mat3(
                      cos(t), 0.0, -sin(t),
                      0.0, 1.0, 0.0,
                      sin(t), 0.0, cos(t)
                  );
              }

              vec3 displace(vec3 pos) {
                float noise = snoise(.22 * pos + u_time * .001 * .5);
                float phase = cos(u_time * .0003 + 2.) * .5 + .5;
                float expo = 2. + phase * 4.;
                float shapedNoise;
                if (noise < 0.) {
                  shapedNoise = -pow(abs(noise), expo);
                } else {
                  shapedNoise = pow(noise, expo);
                }

                float scaledNoise = 5. * shapedNoise;
                float flatScaledNoise = atan(10. * (shapedNoise + .6)) + 1.;
                float mixedNoise = mix(flatScaledNoise, scaledNoise, phase);

                vec3 newPosition = pos + normal * mixedNoise;
                newPosition.y += normal.y * max(scaledNoise * 8. * phase, 0.);

                newPosition *= yrotate(newPosition.y * .1);

                return newPosition;
              }
              ${shader.vertexShader}
              `.replace('#include <project_vertex>', `
              transformed = displace(position);

              // Analytical normals failure
              // float epsilon = .00001;
              // vec3 dx = displace(position + vec3(epsilon, 0., 0.));
              // vec3 dy = displace(position + vec3(0., epsilon, 0.));
              // vec3 v1 = transformed - dx;
              // vec3 v2 = transformed - dy;
              // vNormal = normalMatrix * normalize(cross(v1,v2));

              #include <project_vertex>
            `);
            shader.fragmentShader = `
              varying vec3 vN;
              ${shader.fragmentShader}
            `.replace('#include <normal_fragment_begin>', `
              #include <normal_fragment_begin>
              // normal = normalize(vN);
              `);
            window.requestAnimationFrame(this.loop);
          };
        }
      }

      class Scene {
        constructor() {
          this.resize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
          };

          this.update = timestamp => {
            requestAnimationFrame(this.update);
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
          };

          this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
          this.camera.position.z = 50;

          this.scene = new THREE.Scene();

          this.renderer = new THREE.WebGLRenderer({
            antialias: true
          });

          this.renderer.setPixelRatio(window.devicePixelRatio);
          this.renderer.setSize(window.innerWidth, window.innerHeight);

          document.querySelector('#virus').appendChild(this.renderer.domElement);

          this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
          this.controls.enableZoom = false;
          this.controls.enablePan = false;

          const backgroundGeometry = new THREE.SphereGeometry(4000, 32, 15);
          const backgroundMaterial = new BackgroundMaterial();
          const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);

          this.scene.add(background);

          const blobGeometry = new THREE.OctahedronGeometry(10, 7);
          const blobMaterial = new BlobMaterial();

          this.blob = new THREE.Mesh(blobGeometry, blobMaterial);
          this.scene.add(this.blob);

          const ballGeometry = new THREE.OctahedronGeometry(9.9, 5);
          const ballMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xaa0000,
            metalness: 0,
            roughness: 0.125,
            envMap: textureCube,
            envMapIntensity: 4,
            flatShading: true,
            emissive: 0x440030,
            flatShading: false
          });

          const ball = new THREE.Mesh(ballGeometry, ballMaterial);
          this.scene.add(ball);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

          directionalLight.position.set(-1, 1, 1);
          directionalLight.castShadow = true;
          // this.scene.add(directionalLight);

          const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.2);

          directionalLight2.position.set(1, 2, 1);
          directionalLight2.castShadow = true;
          // this.scene.add(directionalLight2);

          const ambientLight = new THREE.AmbientLight(0x306090, 0.2);

          this.scene.add(ambientLight);

          const light = new THREE.HemisphereLight(0xaaaeff, 0x66aaf0, 0.6);

          this.scene.add(light);

          window.addEventListener('resize', this.resize);
          requestAnimationFrame(this.update);
        }
      }

      new Scene();
    }
  }
</script>
