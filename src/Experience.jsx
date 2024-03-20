import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, useTexture } from '@react-three/drei';
import coffeeSmokeVertexShader from './shaders/coffeeSmoke/vertex.glsl'
import coffeeSmokeFragmentShader from './shaders/coffeeSmoke/fragment.glsl'
import { DoubleSide } from 'three';

export default function Experience()
{
    const groupTask = useRef(); // Crée une référence pour le groupe
    const bakedTexture = useTexture('./model/Baked.jpg')
    bakedTexture.flipY = false
    const { nodes } = useGLTF('./model/coffee.glb')
    console.log(nodes);

  
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
            <mesh position-y={1.2} scale={[0.3, 2, 1.5]}>
                {/* Ici, on reproduit THREE.PlaneGeometry(1, 1, 16, 64) en spécifiant les props correspondants */}
                <planeGeometry args={[1, 1, 16, 64]} />
                {/* ShaderMaterial avec wireframe activé */}
                <shaderMaterial 
                vertexShader={coffeeSmokeVertexShader}
                fragmentShader={coffeeSmokeFragmentShader}
                side={DoubleSide}
                 />
            </mesh>

        </group>
            <mesh geometry={nodes.Plane001_1.geometry}>
            <meshBasicMaterial map={bakedTexture} />
            </mesh>

    </>
}