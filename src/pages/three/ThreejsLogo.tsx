import { render } from "preact";
import Layout from "../../layouts/Layout.astro";
import { useEffect } from "preact/hooks";
import * as THREE from "three";
import { rotate } from "three/webgpu";

const ThreejsLogo = () => {
    useEffect(() => {
        // シーンのセットアップ
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        document.getElementById("three-container")?.appendChild(renderer.domElement);
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform sampler2D tDiffuse;
            uniform float time;
            varying vec2 vUv;

            void main() {
                vec2 uv = vUv;
                
                // ピクセル化効果
                float pixelSize = 0.01 + 0.01 * sin(time);
                uv = floor(uv / pixelSize) * pixelSize;

                // 歪み効果
                uv.x += 0.01 * sin(uv.y  + time);
                uv.y += 0.01 * cos(uv.x  + time);
                vec2 center = vec2(0.5, 0.5);
                
                vec4 color = texture2D(tDiffuse , uv);
                gl_FragColor = color;
            }
        `;
        // テクスチャの読み込みと設定
        const textureLoader = new THREE.TextureLoader();
        let material: THREE.ShaderMaterial;
        const texture = textureLoader.load("/logo2.gif", (loadedTexture) => {
            const aspectRatio = loadedTexture.image.width / loadedTexture.image.height;

            const geometry = new THREE.PlaneGeometry(aspectRatio * 2, aspectRatio * 2);
            material = new THREE.ShaderMaterial({
                uniforms: {
                    tDiffuse: { value: texture },
                    time: { value: 0.0 }
                },
                vertexShader,
                fragmentShader
            });
            const mesh = new THREE.Mesh(geometry, material);

            const clock = new THREE.Clock();
            const animateRotation = () => {
                const elapsedTime = clock.getElapsedTime();
                material.uniforms.time.value = elapsedTime;


                requestAnimationFrame(animateRotation);
            };
            animateRotation();
            scene.add(mesh);

        });

        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;

        camera.position.z = 2;


        // レンダリングループ
        const animate = () => {
            //回転

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // クリーンアップ
        return () => {
            // rendererとcanvasをクリーンアップする
            renderer.dispose();
            const container = document.getElementById("three-container");
            if (container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <html>
            <div>
                <h1>Three.js</h1>
                <p>Three.jsを使ってロゴを表示しています</p>
                <div id="three-container" style={{ width: "100%", height: "100vh" }}></div>
            </div>
        </html>
    );
};

export default ThreejsLogo;
