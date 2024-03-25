import React, { useEffect, useRef } from 'react';
import { useGLTF, OrbitControls, useTexture } from '@react-three/drei';
import { DoubleSide, TextureLoader, RepeatWrapping } from 'three';



import coffeeSmokeVertexShader from './shaders/coffeeSmoke/vertex.glsl'
import coffeeSmokeFragmentShader from './shaders/coffeeSmoke/fragment.glsl'
import { useFrame, useLoader } from '@react-three/fiber';

export default function Experience()
{
    const groupTask = useRef(); // Crée une référence pour le groupe
    const bakedTexture = useTexture('./model/Baked.jpg')
    bakedTexture.flipY = false
    const { nodes } = useGLTF('./model/coffee.glb')
    const smokeshadermaterial = useRef()

    const perlinTexture = useLoader(TextureLoader, '/perlin.png')
    perlinTexture.wrapS = RepeatWrapping
    perlinTexture.wrapT = RepeatWrapping


    useFrame((state, delta) => {
        smokeshadermaterial.current.uniforms.utime.value += delta;

      });

    return <>

        <color args={['black']} attach="background"/>

        <OrbitControls makeDefault />

        <group position-y={-0.02} ref={groupTask}> {/* Utilise la référence ici */}
            <mesh geometry={nodes.Plane001_2.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh geometry={nodes.Plane001_3.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh position-y={1.3} scale={[0.2, 2, 0.3]}>
                {/* Ici, on reproduit THREE.PlaneGeometry(1, 1, 16, 64) en spécifiant les props correspondants */}
                <planeGeometry args={[1, 1, 16, 64]} />
                {/* ShaderMaterial avec wireframe activé */}
                <shaderMaterial 
                ref={smokeshadermaterial}
                vertexShader={coffeeSmokeVertexShader}
                fragmentShader={coffeeSmokeFragmentShader}
                uniforms={ 
                    {
                        utime: {value : 0},
                        uPerlinTexture: {value : perlinTexture}
                }
                }
                side={DoubleSide}
                transparent
                depthWrite={false}

                 />
            </mesh>

        </group>
            <mesh geometry={nodes.Plane001_1.geometry}>
            <meshBasicMaterial map={bakedTexture} />
            </mesh>

    </>
}