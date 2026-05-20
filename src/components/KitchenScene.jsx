import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const disposeMaterial = (material) => {
  if (material.map) material.map.dispose();
  material.dispose();
};

const createStoneTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f1eee7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 18; i += 1) {
    ctx.beginPath();
    ctx.strokeStyle = i % 3 === 0 ? 'rgba(119,112,101,0.22)' : 'rgba(176,166,151,0.18)';
    ctx.lineWidth = i % 3 === 0 ? 2 : 1;
    const y = 30 + i * 20 + Math.sin(i) * 16;
    ctx.moveTo(-40, y);
    ctx.bezierCurveTo(180, y + 40, 320, y - 35, 520, y + 22);
    ctx.bezierCurveTo(640, y + 60, 740, y - 10, 820, y + 24);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.8, 1);
  return texture;
};

const createWoodTexture = (baseColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 44; i += 1) {
    const alpha = i % 4 === 0 ? 0.18 : 0.08;
    ctx.strokeStyle = `rgba(60,39,24,${alpha})`;
    ctx.lineWidth = i % 5 === 0 ? 2 : 1;
    const x = i * 13 + Math.sin(i * 1.7) * 10;
    ctx.beginPath();
    ctx.moveTo(x, -20);
    ctx.bezierCurveTo(x + 20, 120, x - 24, 260, x + 12, 540);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.2, 1.7);
  return texture;
};

const addBox = (parent, size, position, material, withEdges = false) => {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);

  if (withEdges) {
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: '#262a28', transparent: true, opacity: 0.42 }),
    );
    mesh.add(edges);
  }

  return mesh;
};

const addCylinder = (parent, radius, depth, position, material, rotation = [0, 0, 0]) => {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 24), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
};

const addApplianceStack = (row, x, materials) => {
  addBox(row, [0.66, 1.85, 0.62], [x, 1.02, 0], materials.side, true);
  addBox(row, [0.58, 0.48, 0.025], [x, 1.08, -0.325], materials.glass, false);
  addBox(row, [0.46, 0.025, 0.015], [x, 1.24, -0.345], materials.metal, false);
  addBox(row, [0.58, 0.34, 0.025], [x, 1.54, -0.325], materials.front, true);
  addBox(row, [0.58, 0.42, 0.025], [x, 0.55, -0.325], materials.front, true);
};

const addSinkAndCooktop = (row, runLength, materials) => {
  const sinkX = -runLength * 0.22;
  addBox(row, [0.5, 0.026, 0.32], [sinkX, 0.852, -0.12], materials.sink, false);
  addBox(row, [0.36, 0.018, 0.22], [sinkX, 0.872, -0.12], materials.basin, false);
  addCylinder(row, 0.018, 0.26, [sinkX + 0.18, 0.98, -0.12], materials.metal);
  addCylinder(row, 0.014, 0.28, [sinkX + 0.08, 1.1, -0.12], materials.metal, [0, 0, Math.PI / 2]);
  addCylinder(row, 0.012, 0.12, [sinkX - 0.04, 1.1, -0.12], materials.metal);

  const cookX = runLength * 0.22;
  addBox(row, [0.58, 0.018, 0.34], [cookX, 0.852, -0.1], materials.glass, false);
  for (let i = 0; i < 4; i += 1) {
    addCylinder(
      row,
      i < 2 ? 0.07 : 0.055,
      0.006,
      [cookX + (i % 2 === 0 ? -0.13 : 0.13), 0.866, -0.18 + (i > 1 ? 0.15 : 0)],
      materials.burner,
      [Math.PI / 2, 0, 0],
    );
  }
};

const getRunMetrics = (length) => {
  const unitCount = Math.max(3, Math.min(8, Math.round(length / 0.74)));
  const runLength = unitCount * 0.72;
  return { unitCount, runLength };
};

const buildCabinetRun = ({ parent, length, x = 0, z = 0, rotation = 0, front, upperMode, primary = false }) => {
  const { unitCount, runLength } = getRunMetrics(length);
  const start = -runLength / 2 + 0.36;
  const useWood = front.label.includes('шпон') || front.label.includes('массив');
  const frontMap = useWood ? createWoodTexture(front.color) : null;
  const stoneMap = createStoneTexture();

  const materials = {
    front: new THREE.MeshStandardMaterial({
      color: useWood ? '#ffffff' : front.color,
      map: frontMap,
      roughness: useWood ? 0.58 : 0.46,
      metalness: 0.02,
    }),
    side: new THREE.MeshStandardMaterial({ color: front.color, roughness: 0.62, metalness: 0.01 }),
    counter: new THREE.MeshStandardMaterial({ color: '#252827', roughness: 0.25, metalness: 0.03 }),
    stone: new THREE.MeshStandardMaterial({ color: '#ffffff', map: stoneMap, roughness: 0.36, metalness: 0.01 }),
    metal: new THREE.MeshStandardMaterial({ color: '#b78150', roughness: 0.24, metalness: 0.52 }),
    glass: new THREE.MeshStandardMaterial({ color: '#101514', roughness: 0.18, metalness: 0.08 }),
    basin: new THREE.MeshStandardMaterial({ color: '#8b918d', roughness: 0.2, metalness: 0.62 }),
    sink: new THREE.MeshStandardMaterial({ color: '#c3c8c4', roughness: 0.18, metalness: 0.55 }),
    burner: new THREE.MeshStandardMaterial({ color: '#343938', roughness: 0.34, metalness: 0.18 }),
    light: new THREE.MeshBasicMaterial({ color: '#ffdca6' }),
    plinth: new THREE.MeshStandardMaterial({ color: '#1d201f', roughness: 0.44, metalness: 0.1 }),
  };

  const row = new THREE.Group();
  row.rotation.y = rotation;
  row.position.set(x, 0, z);
  parent.add(row);

  addBox(row, [runLength + 0.12, 0.1, 0.08], [0, 0.07, -0.24], materials.plinth);

  for (let index = 0; index < unitCount; index += 1) {
    const x = start + index * 0.72;
    addBox(row, [0.69, 0.72, 0.62], [x, 0.43, 0], materials.side);
    addBox(row, [0.63, 0.64, 0.026], [x, 0.43, -0.325], materials.front, true);

    if (index % 3 !== 0) {
      addBox(row, [0.5, 0.012, 0.012], [x, 0.52, -0.344], materials.plinth);
      addBox(row, [0.5, 0.012, 0.012], [x, 0.33, -0.344], materials.plinth);
    }

    addBox(row, [0.32, 0.028, 0.028], [x, 0.66, -0.355], materials.metal);
  }

  addBox(row, [runLength + 0.18, 0.075, 0.72], [0, 0.84, 0], materials.counter);
  addBox(row, [runLength + 0.08, 0.62, 0.035], [0, 1.2, 0.37], materials.stone);
  addBox(row, [runLength * 0.82, 0.018, 0.026], [0, 1.36, 0.035], materials.light);

  const upperHeight = upperMode === 'ceiling' ? 0.86 : upperMode === 'high' ? 0.7 : 0.56;
  for (let index = 0; index < unitCount; index += 1) {
    if (primary && index === Math.floor(unitCount / 2) && unitCount > 4) {
      addBox(row, [0.64, 0.08, 0.26], [start + index * 0.72, 1.72, 0.18], materials.metal);
      continue;
    }

    const x = start + index * 0.72;
    addBox(row, [0.66, upperHeight, 0.36], [x, 1.67, 0.19], materials.side);
    addBox(row, [0.6, upperHeight - 0.07, 0.024], [x, 1.67, -0.004], materials.front, true);
    addBox(row, [0.28, 0.022, 0.022], [x, 1.45, -0.022], materials.metal);
  }

  if (primary) {
    addSinkAndCooktop(row, runLength, materials);
    addApplianceStack(row, -runLength / 2 - 0.48, materials);
  }

  return runLength;
};

export default function KitchenScene({ length, layout, front, upperMode }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return undefined;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#f5f2ea', 7, 13);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(4.9, 3.0, -5.8);
    camera.lookAt(0, 0.92, -0.45);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0xffffff, 0);
    mount.appendChild(renderer.domElement);

    const room = new THREE.Group();
    scene.add(room);

    const floorMat = new THREE.MeshStandardMaterial({ color: '#d7d1c4', roughness: 0.72 });
    const wallMat = new THREE.MeshStandardMaterial({ color: '#f3f1eb', roughness: 0.86 });
    const returnWallMat = new THREE.MeshStandardMaterial({
      color: '#f3f1eb',
      roughness: 0.86,
      transparent: true,
      opacity: 0.42,
    });
    const grooveMat = new THREE.MeshStandardMaterial({ color: '#b8afa2', roughness: 0.8 });
    const copperMat = new THREE.MeshStandardMaterial({ color: '#a85f34', roughness: 0.38, metalness: 0.22 });

    addBox(room, [7.8, 0.08, 6.1], [0, -0.04, -0.55], floorMat);
    addBox(room, [7.8, 3.1, 0.08], [0, 1.48, 0.9], wallMat);
    addBox(room, [0.08, 3.1, 6.1], [-3.72, 1.48, -1.6], wallMat);

    for (let i = 0; i < 10; i += 1) {
      addBox(room, [7.4, 0.006, 0.018], [0, 0.015, -3.3 + i * 0.55], grooveMat);
    }

    const accentRail = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.032, 0.032), copperMat);
    accentRail.position.set(0, 1.02, 0.82);
    room.add(accentRail);

    const model = new THREE.Group();
    room.add(model);

    const meters = length / 100;
    const normalized = Math.min(5.8, Math.max(2.2, meters));
    const mainRunLength = buildCabinetRun({
      parent: model,
      length: normalized,
      front,
      upperMode,
      primary: true,
    });
    const cornerDepth = 0.34;

    if (layout === 'corner' || layout === 'ushape') {
      const sideLength = normalized * 0.7;
      const { runLength: sideRunLength } = getRunMetrics(sideLength);
      addBox(room, [0.08, 2.72, sideRunLength + 0.42], [-mainRunLength / 2 - 0.06, 1.34, -sideRunLength / 2], returnWallMat);
      buildCabinetRun({
        parent: model,
        length: sideLength,
        x: -mainRunLength / 2 + cornerDepth,
        z: -sideRunLength / 2,
        rotation: -Math.PI / 2,
        front,
        upperMode,
      });
    }

    if (layout === 'ushape') {
      const leftLength = normalized * 0.56;
      const { runLength: leftRunLength } = getRunMetrics(leftLength);
      addBox(room, [0.08, 2.72, leftRunLength + 0.42], [mainRunLength / 2 + 0.06, 1.34, -leftRunLength / 2], returnWallMat);
      buildCabinetRun({
        parent: model,
        length: leftLength,
        x: mainRunLength / 2 - cornerDepth,
        z: -leftRunLength / 2,
        rotation: Math.PI / 2,
        front,
        upperMode,
      });
    }

    const ambient = new THREE.HemisphereLight('#ffffff', '#b6aa9a', 2.1);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight('#ffffff', 3.8);
    keyLight.position.set(2.5, 5.2, -3.6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1536;
    keyLight.shadow.mapSize.height = 1536;
    scene.add(keyLight);

    const warmLight = new THREE.PointLight('#ffd5a2', 7.5, 5.8);
    warmLight.position.set(0.2, 1.45, -0.2);
    scene.add(warmLight);

    const resize = () => {
      const width = mount.clientWidth || 640;
      const height = mount.clientHeight || 420;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame;
    const startTime = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      room.rotation.y = -0.12 + Math.sin(elapsed * 0.42) * 0.025;
      warmLight.intensity = 7.1 + Math.sin(elapsed * 1.1) * 0.28;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach(disposeMaterial);
          else disposeMaterial(object.material);
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, [front, layout, length, upperMode]);

  return <div className="kitchen-scene" ref={mountRef} aria-label="3D визуализация кухни" />;
}
