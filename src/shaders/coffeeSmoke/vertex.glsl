varying vec2 vUv;


vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, -s, s, c); // Correction de la matrice pour la convention habituelle
    return m * value;
}

uniform float utime; // Assure-toi que cette uniform est bien passée au shader
uniform sampler2D uPerlinTexture;

void main()
{
    vec3 newPosition = position;
    
    // Ajuste cet angle pour contrôler l'intensité de la torsion

    
    // Utilise utime pour rendre l'effet dynamique
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - utime * 0.005)).r;
    float angle = twistPerlin * 12.0;
    
    newPosition.xz = rotate2D(newPosition.xz, angle);


    //wind

    vec2 windoffset = vec2(
        texture(uPerlinTexture, vec2(0.25, utime * 0.01)).r - 0.5, 
        texture(uPerlinTexture, vec2(0.75, utime * 0.01)).r - 0.5
    );
    windoffset *= pow(uv.y, 2.0) * 10.0;
    newPosition.xz += windoffset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}
