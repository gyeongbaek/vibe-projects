import * as THREE from "three";

// Room configurations
const rooms = [
  {
    name: "Development",
    label: "Room 01",
    titleHtml: "Develop<em>ment</em>",
    color: 0xe8ff47,
    bgColor: 0x0d0d0d,
    items: [
      {
        year: "2024",
        title: "AI Dashboard Platform",
        desc: "Full-stack development with React & Node.js",
        tags: ["React", "Node.js"],
      },
      {
        year: "2024",
        title: "E-commerce Redesign",
        desc: "UI/UX improvement & performance optimization",
        tags: ["Next.js", "TypeScript"],
      },
      {
        year: "2023",
        title: "Real-time Chat Application",
        desc: "WebSocket based messaging system",
        tags: ["Socket.io", "MongoDB"],
      },
      {
        year: "2023",
        title: "Data Visualization Tool",
        desc: "Interactive charts and analytics dashboard",
        tags: ["D3.js", "Python"],
      },
    ],
  },
  {
    name: "Design",
    label: "Room 02",
    titleHtml: "Des<em>ign</em>",
    color: 0xff6b9d,
    bgColor: 0x0d0d0d,
    items: [
      {
        year: "2024",
        title: "Brand Identity System",
        desc: "Complete visual identity for tech startup",
        tags: ["Branding", "Figma"],
      },
      {
        year: "2024",
        title: "Mobile App UI Kit",
        desc: "Design system with 200+ components",
        tags: ["UI/UX", "Sketch"],
      },
      {
        year: "2023",
        title: "Editorial Layout",
        desc: "Magazine design & typography",
        tags: ["Print", "InDesign"],
      },
    ],
  },
  {
    name: "Projects",
    label: "Room 03",
    titleHtml: "Pro<em>jects</em>",
    color: 0x47e8ff,
    bgColor: 0x0d0d0d,
    items: [
      {
        year: "2024",
        title: "Open Source Contribution",
        desc: "Major features for popular library",
        tags: ["GitHub", "Open Source"],
      },
      {
        year: "2023",
        title: "Hackathon Winner",
        desc: "1st place at Seoul Tech Summit",
        tags: ["AI", "Innovation"],
      },
    ],
  },
  {
    name: "About",
    label: "Room 04",
    titleHtml: "Ab<em>out</em>",
    color: 0xffa347,
    bgColor: 0x0d0d0d,
    items: [
      {
        year: "2020-",
        title: "Curriculum Developer",
        desc: "AI & Full-stack training programs",
        tags: ["Education", "AI"],
      },
      {
        year: "2018-",
        title: "Full-stack Developer",
        desc: "React, Node.js, Three.js specialist",
        tags: ["Web", "Creative"],
      },
    ],
  },
];

let currentIndex = 0;
let isTransitioning = false;
let currentPosition = 0; // 실제 씬 위치 (무한 슬라이더용)
const ROOM_GAP = 15;
const TABLET_BREAKPOINT = 768;

// 반응형 mesh 오프셋 계산
function getMeshOffset() {
  return window.innerWidth <= TABLET_BREAKPOINT ? 0 : 2.5;
}

// Three.js Setup
const container = document.getElementById("canvas-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(rooms[0].color, 1, 20);
pointLight.position.set(0, 2, 4);
scene.add(pointLight);

// Room geometry 생성 함수
function createRoomGeometry(typeIndex) {
  switch (typeIndex % 4) {
    case 0:
      return new THREE.BoxGeometry(2, 2, 2);
    case 1:
      return new THREE.IcosahedronGeometry(1.5, 0);
    case 2:
      return new THREE.OctahedronGeometry(1.5);
    case 3:
      return new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  }
}

// Room 그룹 생성 함수
function createRoomGroup(room, typeIndex) {
  const group = new THREE.Group();

  const geometry = createRoomGeometry(typeIndex);
  const meshOffset = getMeshOffset();

  const material = new THREE.MeshStandardMaterial({
    color: room.color,
    metalness: 0.3,
    roughness: 0.4,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = meshOffset;
  group.add(mesh);

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: room.color,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const wireframe = new THREE.Mesh(geometry.clone(), wireframeMaterial);
  wireframe.position.copy(mesh.position);
  wireframe.scale.setScalar(1.1);
  group.add(wireframe);

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 50;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 8;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: room.color,
    transparent: true,
    opacity: 0.6,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particles.position.x = meshOffset;
  group.add(particles);

  return { group, mesh, wireframe, particles };
}

// Room 오브젝트 배열 (무한 슬라이더를 위해 앞뒤로 복제)
const roomGroups = [];
const totalRooms = rooms.length;

// 메인 rooms + 앞뒤 복제본 생성 (총 3세트)
for (let set = -1; set <= 1; set++) {
  rooms.forEach((room, index) => {
    const roomObj = createRoomGroup(room, index);
    roomObj.group.position.x = (set * totalRooms + index) * ROOM_GAP;
    roomObj.roomIndex = index; // 원본 인덱스 저장
    scene.add(roomObj.group);
    roomGroups.push(roomObj);
  });
}

// Animation
let targetX = 0;
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Smooth camera movement
  scene.position.x += (targetX - scene.position.x) * 0.08;

  // Animate room objects
  roomGroups.forEach((room) => {
    room.mesh.rotation.y = elapsedTime * 0.3;
    room.mesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;
    room.wireframe.rotation.y = -elapsedTime * 0.2;
    room.particles.rotation.y = elapsedTime * 0.1;
  });

  renderer.render(scene, camera);
}

animate();

// Navigation - 무한 슬라이더
function navigate(direction) {
  if (isTransitioning) return;

  isTransitioning = true;

  // 다음 위치 계산
  currentPosition += direction;
  targetX = -currentPosition * ROOM_GAP;

  // 실제 인덱스 계산 (모듈러 연산으로 순환)
  currentIndex =
    (((currentIndex + direction) % totalRooms) + totalRooms) % totalRooms;

  // Update point light color
  const targetColor = new THREE.Color(rooms[currentIndex].color);
  const startColor = pointLight.color.clone();

  let progress = 0;
  const colorAnimation = setInterval(() => {
    progress += 0.05;
    if (progress >= 1) {
      pointLight.color.copy(targetColor);
      clearInterval(colorAnimation);
    } else {
      pointLight.color.lerpColors(startColor, targetColor, progress);
    }
  }, 16);

  // Update UI
  updateRoomInfo(currentIndex);
  updateIndicators(currentIndex);
  updateContentList(currentIndex);

  // 전환 완료 후 위치 리셋 (무한 루프를 위해)
  setTimeout(() => {
    // 범위를 벗어나면 중앙으로 리셋
    if (currentPosition >= totalRooms || currentPosition < 0) {
      currentPosition = currentIndex;
      targetX = -currentPosition * ROOM_GAP;
      scene.position.x = targetX; // 즉시 이동
    }
    isTransitioning = false;
  }, 600);
}

function goToRoom(index) {
  if (isTransitioning || index === currentIndex) return;

  isTransitioning = true;

  // 최단 경로 계산
  let diff = index - currentIndex;

  // 순환 최단 경로
  if (Math.abs(diff) > totalRooms / 2) {
    if (diff > 0) {
      diff -= totalRooms;
    } else {
      diff += totalRooms;
    }
  }

  currentPosition += diff;
  targetX = -currentPosition * ROOM_GAP;
  currentIndex = index;

  // Update point light color
  const targetColor = new THREE.Color(rooms[index].color);
  const startColor = pointLight.color.clone();

  let progress = 0;
  const colorAnimation = setInterval(() => {
    progress += 0.05;
    if (progress >= 1) {
      pointLight.color.copy(targetColor);
      clearInterval(colorAnimation);
    } else {
      pointLight.color.lerpColors(startColor, targetColor, progress);
    }
  }, 16);

  // Update UI
  updateRoomInfo(index);
  updateIndicators(index);
  updateContentList(index);

  setTimeout(() => {
    // 범위를 벗어나면 중앙으로 리셋
    if (currentPosition >= totalRooms || currentPosition < 0) {
      currentPosition = currentIndex;
      targetX = -currentPosition * ROOM_GAP;
      scene.position.x = targetX;
    }
    isTransitioning = false;
  }, 600);
}

function updateRoomInfo(index) {
  const room = rooms[index];
  const labelEl = document.querySelector(".room-label");
  const titleEl = document.querySelector(".room-title");

  // Fade out
  labelEl.style.animation = "none";
  titleEl.style.animation = "none";
  labelEl.style.opacity = "0";
  titleEl.style.opacity = "0";

  setTimeout(() => {
    labelEl.textContent = room.label;
    titleEl.innerHTML = room.titleHtml;

    // Fade in
    labelEl.style.animation = "fadeInUp 0.6s ease forwards";
    titleEl.style.animation = "fadeInUp 0.6s ease forwards 0.1s";
  }, 200);
}

function updateIndicators(index) {
  document.querySelectorAll(".indicator-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function updateContentList(index) {
  const room = rooms[index];
  const listEl = document.getElementById("content-list");
  const countEl = document.querySelector(".content-count span");

  countEl.textContent = room.items.length;

  listEl.innerHTML = room.items
    .map(
      (item) => `
    <div class="content-item">
      <span class="item-year">${item.year}</span>
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
      <div class="item-tags">
        ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
  `
    )
    .join("");
}

// Event Listeners
document.getElementById("prev-btn").addEventListener("click", () => navigate(-1));
document.getElementById("next-btn").addEventListener("click", () => navigate(1));

document.querySelectorAll(".indicator-dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index);
    goToRoom(index);
  });
});

// Swipe support (touch)
let touchStartX = 0;
container.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    navigate(diff > 0 ? 1 : -1);
  }
});

// Mouse drag swipe support
let isDragging = false;
let dragStartX = 0;

container.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  container.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  container.style.cursor = "grab";

  const diff = dragStartX - e.clientX;
  if (Math.abs(diff) > 50) {
    navigate(diff > 0 ? 1 : -1);
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

// Resize handler
function updateMeshPositions() {
  const meshOffset = getMeshOffset();
  roomGroups.forEach((room) => {
    room.mesh.position.x = meshOffset;
    room.wireframe.position.x = meshOffset;
    room.particles.position.x = meshOffset;
  });
}

window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  updateMeshPositions();
});
