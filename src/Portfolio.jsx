import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const PROJECTS = [
  {
    id: "deepguard",
    featured: true,
    name: "DeepGuard",
    tag: "Deepfake Detection",
    status: "in progress",
    summary:
      "AI-powered web application for image and video deepfake detection with frame-level explainability.",
    detail:
      "Built a full-stack Flask application with authentication, admin controls and detection history. The system uses CNN, LSTM and Transformer-based approaches for deepfake detection and generates frame-by-frame heatmaps to show users what the model flagged.",
    stack: [
      "Python",
      "Flask",
      "SQLite",
      "TensorFlow",
      "CNNs",
      "LSTMs",
      "Transformers",
      "Google Colab",
    ],
    metric: "92% detection accuracy",
    problem:
      "Deepfake media is becoming increasingly difficult to identify manually. The goal was to build a system that could not only classify media, but also give users an understandable indication of where suspicious content was detected.",
    contribution:
      "Designed and implemented the application architecture, backend functionality, authentication flow, database integration and model integration.",
    decisions:
      "Used Flask for the backend because it provides a lightweight foundation for integrating Python-based machine-learning models with a web application.",
    github: "https://github.com/Soyamo/DeepGuard",
    demo: null,
  },
  {
    id: "transaction-anomaly",
    name: "Transaction Anomaly Tracker",
    tag: "FRAUD DETECTION",
    status: "shipped",
    summary:
      "Full-stack transaction monitoring system with CRUD functionality and an automated CI/CD pipeline.",
    detail:
      "Built complete CRUD functionality for anomaly and fraud detection, then designed a CI/CD pipeline covering testing, containerisation and security scanning. The application was deployed to Google Cloud Run through Artifact Registry.",
    stack: [
      "Python",
      "Flask",
      "MySQL",
      "Docker",
      "GitLab CI/CD",
      "GCP Cloud Run",
      "Artifact Registry",
    ],
    metric: "65% faster deployments",
    problem:
      "The system needed to provide a reliable way of recording and monitoring potentially anomalous transactions while keeping deployment repeatable and secure.",
    contribution:
      "Implemented the application functionality, database integration, Docker configuration and CI/CD pipeline.",
    decisions:
      "Containerisation provided consistency between development and deployment environments, while automated testing and security scanning reduced manual deployment steps.",
    github: "https://gitlab.com/soyamovakala/it08x30_software_factories_221018010",
    demo: null,
  },
  {
    id: "algotrader",
    name: "AlgoTrader",
    tag: "Algorithmic Trading",
    status: "in progress",
    summary:
      "Python algorithmic trading bot for micro index CFDs with walk-forward backtesting, SMC pattern diagnostics and live MT5 execution.",
    detail:
      "Built a modular trading system that connects to MetaTrader 5, pulls live and historical OHLCV data, and runs a walk-forward optimisation pipeline across thousands of bars. The system detects market regimes, identifies liquidity sweep patterns and executes live trades with ATR-based dynamic stop-loss and take-profit levels. An extensive diagnostic suite was developed to measure edge — win rate, expectancy and consistency by quarter — before any strategy code was written.",
    stack: [
      "Python",
      "MetaTrader 5 API",
      "pandas",
      "NumPy",
      "Docker",
      "GitLab CI/CD",
    ],
    metric: "Walk-forward validated edge",
    problem:
      "Retail algo trading tools are either black-box or lack rigorous statistical validation. The goal was to build a transparent system where every strategy decision is backed by measurable edge tested on out-of-sample data before any live execution.",
    contribution:
      "Designed the full pipeline: MT5 data ingestion, indicator engine, regime classifier, liquidity sweep detector, walk-forward backtester, grid-search optimiser and live execution module with position sizing and session filters.",
    decisions:
      "A diagnostic-first approach was used — measuring raw signal edge on historical data before writing any strategy logic. This avoided overfitting and revealed which patterns had statistically meaningful expectancy and which did not.",
    github: "https://github.com/Soyamo/AlgoTrader",
    demo: null,
  },
  {
    id: "hardware-platform",
    name: "Hardware Store Commerce Platform",
    tag: "E-commerce",
    status: "building",
    summary:
      "Reusable e-commerce platform concept for independent hardware and building-material stores.",
    detail:
      "A reusable platform designed around the needs of smaller hardware stores. Customers can browse products and stock, add items to an order and reserve products for collection. Payment and delivery can initially be handled in-store.",
    stack: [
      "React",
      "Python",
      "REST API",
      "PostgreSQL",
      "Docker",
      "CI/CD",
    ],
    metric: null,
    problem:
      "Many independent stores still rely heavily on phone calls, messaging and manual stock enquiries. The platform aims to make product discovery and reservations easier without forcing the business to immediately adopt online payments or delivery.",
    contribution:
      "Designing the reusable architecture, database model, product catalogue, reservation workflow and customer-facing interface.",
    decisions:
      "PostgreSQL provides a strong relational foundation for products, stock, orders, customers and store operations.",
    github: "https://github.com/Soyamo/hardware-store-platform",
    demo: null,
  },
  {
    id: "museum-ticket",
    name: "Museum Ticket System",
    tag: "Ticket Management",
    status: "shipped",
    summary:
      "C# desktop application for managing museum visitors and ticket sales.",
    detail:
      "Built a Windows Forms application with input validation and error handling backed by a normalised SQL database with referential integrity constraints and CRUD functionality.",
    stack: ["C#", "ASP.NET", "MySQL", "Windows Forms"],
    metric: null,
    problem:
      "The museum required a simple system for recording visitors and managing ticket sales while maintaining consistent database relationships.",
    contribution:
      "Implemented the user interface, validation, database interactions and CRUD functionality.",
    decisions:
      "Validation was implemented at the application level while database constraints provided an additional layer of data integrity.",
    github: "https://github.com/Soyamo/Apartheid_Musuem_Ticket_Booking_System",
    demo: null,
  },
];

const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "Java", "C#", "SQL", "JavaScript", "HTML/CSS"],
  },
  {
    group: "Backend",
    items: ["Flask", "FastAPI", "ASP.NET", "REST APIs"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "SQLite", "Oracle SQL", "SQL Server"],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "Google Cloud Run",
      "Artifact Registry",
      "Docker",
      "CI/CD",
      "AWS",
    ],
  },
  {
    group: "AI / ML",
    items: ["TensorFlow", "CNNs", "LSTMs", "Transformers"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "GitLab", "VS Code", "Visual Studio", "Google Colab"],
  },
];

const TIMELINE = [
  {
    when: "2025",
    title: "BSc Honours, Computer Science",
    place: "University of Johannesburg",
    note:
      "Advanced study across software engineering, systems, databases and secure software development.",
  },
  {
    when: "2022 – 2024",
    title: "BSc Information Technology",
    place: "North-West University, Potchefstroom",
    note:
      "Built foundations across software engineering, databases, programming and information systems.",
  },
];

function StatusDot({ status }) {
  const color =
    status === "shipped"
      ? "var(--accent)"
      : status === "building" || status === "in progress"
      ? "var(--accent-warn)"
      : "var(--text-dim)";

  return (
    <span
      className="pf-status-dot"
      style={{ background: color }}
      aria-hidden="true"
    />
  );
}

function Reveal({ children, className = "", style }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("pf-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pf-reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;
        let start = 0;
        const duration = 1100;
        const startTime = performance.now();

        const update = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(start + (target - start) * eased);

          setValue(current);

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
        observer.unobserve(element);
      },
      { threshold: 0.6 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function HeroScene({ darkMode }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = Math.max(mount.clientWidth, 1);
    const height = Math.max(mount.clientHeight, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
    });

    mount.appendChild(renderer.domElement);

    const particleCount = 180;
    const brainPositions = new Float32Array(particleCount * 3);
    const systemPositions = new Float32Array(particleCount * 3);
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.sin(phi * 5) * 0.12 + (Math.random() - 0.5) * 0.3;

      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      let z = radius * Math.cos(phi);

      x *= 1.25;
      y *= 0.9;
      z *= 0.65;

      if (x > 0) x += 0.08;
      else x -= 0.08;

      brainPositions[i3] = x;
      brainPositions[i3 + 1] = y;
      brainPositions[i3 + 2] = z;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }

    const architecture = [
      { y: 1.35, width: 2.9, count: 40 },
      { y: 0.68, width: 2.4, count: 36 },
      { y: 0, width: 2.1, count: 36 },
      { y: -0.68, width: 1.8, count: 34 },
      { y: -1.35, width: 2.8, count: 34 },
    ];

    let architectureIndex = 0;

    architecture.forEach((layer) => {
      const columns = Math.ceil(Math.sqrt(layer.count));

      for (let i = 0; i < layer.count && architectureIndex < particleCount; i++) {
        const i3 = architectureIndex * 3;
        const column = i % columns;
        const row = Math.floor(i / columns);
        const rowCount = Math.ceil(layer.count / columns);

        const xStep = layer.width / Math.max(columns - 1, 1);
        const zStep = 0.42 / Math.max(rowCount - 1, 1);

        const x = -layer.width / 2 + column * xStep;
        const z = -0.21 + row * zStep;

        systemPositions[i3] = x + (Math.random() - 0.5) * 0.08;
        systemPositions[i3 + 1] = layer.y + (Math.random() - 0.5) * 0.08;
        systemPositions[i3 + 2] = z;
        
        architectureIndex++;
      }
    });

    while (architectureIndex < particleCount) {
      const i3 = architectureIndex * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 1.2;

      systemPositions[i3] = Math.cos(angle) * radius;
      systemPositions[i3 + 1] = (Math.random() - 0.5) * 2.7;
      systemPositions[i3 + 2] = (Math.random() - 0.5) * 0.35;

      architectureIndex++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: darkMode ? 0x75b89f : 0x2f6f5e,
      size: 0.075,
      transparent: true,
      opacity: darkMode ? 0.9 : 0.78,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      const ix = brainPositions[i * 3];
      const iy = brainPositions[i * 3 + 1];
      const iz = brainPositions[i * 3 + 2];

      for (let j = i + 1; j < particleCount; j++) {
        const jx = brainPositions[j * 3];
        const jy = brainPositions[j * 3 + 1];
        const jz = brainPositions[j * 3 + 2];

        const dx = ix - jx;
        const dy = iy - jy;
        const dz = iz - jz;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 0.55) {
          linePositions.push(ix, iy, iz, jx, jy, jz);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: darkMode ? 0x75b89f : 0x2f6f5e,
      transparent: true,
      opacity: darkMode ? 0.22 : 0.15,
    });

    const brainLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(brainLines);

    const architectureLinePositions = [];
    const layerYs = [1.35, 0.68, 0, -0.68, -1.35];

    layerYs.forEach((y, index) => {
      if (index < layerYs.length - 1) {
        architectureLinePositions.push(0, y - 0.18, 0, 0, layerYs[index + 1] + 0.18, 0);
      }
    });

    const architectureLineGeometry = new THREE.BufferGeometry();
    architectureLineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(architectureLinePositions, 3)
    );

    const architectureLineMaterial = new THREE.LineBasicMaterial({
      color: darkMode ? 0x75b89f : 0x2f6f5e,
      transparent: true,
      opacity: 0,
    });

    const architectureLines = new THREE.LineSegments(
      architectureLineGeometry,
      architectureLineMaterial
    );
    scene.add(architectureLines);

    const dataCount = 18;
    const dataPositions = new Float32Array(dataCount * 3);

    for (let i = 0; i < dataCount; i++) {
      dataPositions[i * 3] = (Math.random() - 0.5) * 3;
      dataPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      dataPositions[i * 3 + 2] = 0.1 + Math.random() * 0.3;
    }

    const dataGeometry = new THREE.BufferGeometry();
    dataGeometry.setAttribute("position", new THREE.BufferAttribute(dataPositions, 3));

    const dataMaterial = new THREE.PointsMaterial({
      color: darkMode ? 0xd69a5d : 0xc97a2e,
      size: 0.11,
      transparent: true,
      opacity: 0.9,
    });

    const dataParticles = new THREE.Points(dataGeometry, dataMaterial);
    scene.add(dataParticles);

    const labels = ["FRONTEND", "API", "BACKEND", "DATABASE", "CLOUD"];
    const labelElements = labels.map((label) => {
      const element = document.createElement("div");
      element.textContent = label;
      element.style.position = "absolute";
      element.style.left = "50%";
      element.style.transform = "translateX(-50%)";
      element.style.fontFamily = '"SFMono-Regular", Consolas, monospace';
      element.style.fontSize = "9px";
      element.style.letterSpacing = "0.12em";
      element.style.color = darkMode ? "#75b89f" : "#2f6f5e";
      element.style.opacity = "0";
      element.style.pointerEvents = "none";
      element.style.transition = "opacity 0.4s ease";
      mount.appendChild(element);
      return element;
    });

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    mount.addEventListener("mousemove", handleMouseMove);

    const startTime = performance.now();
    let frameId;

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const raw = (Math.sin(elapsed * 0.38) + 1) / 2;
      const morph = raw * raw * (3 - 2 * raw);

      const positionAttribute = geometry.getAttribute("position");

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const bx = brainPositions[i3];
        const by = brainPositions[i3 + 1];
        const bz = brainPositions[i3 + 2];

        const sx = systemPositions[i3];
        const sy = systemPositions[i3 + 1];
        const sz = systemPositions[i3 + 2];

        const brainWave = Math.sin(elapsed * 1.5 + i * 0.13) * 0.035;

        positionAttribute.setXYZ(
          i,
          bx + (sx - bx) * morph,
          by + (sy - by) * morph + brainWave * (1 - morph),
          bz + (sz - bz) * morph
        );
      }

      positionAttribute.needsUpdate = true;
      brainLines.material.opacity = (darkMode ? 0.22 : 0.15) * (1 - morph);
      architectureLines.material.opacity = 0.45 * morph;

      particles.rotation.y = Math.sin(elapsed * 0.18) * 0.12;
      particles.rotation.x = Math.sin(elapsed * 0.13) * 0.05;
      brainLines.rotation.copy(particles.rotation);

      for (let i = 0; i < dataCount; i++) {
        const i3 = i * 3;
        const phase = (elapsed * 0.35 + i / dataCount) % 1;

        dataPositions[i3] = Math.sin(i * 1.7) * 0.65;
        dataPositions[i3 + 1] = 1.55 - phase * 3.1;
        dataPositions[i3 + 2] = 0.18;
      }

      dataGeometry.getAttribute("position").needsUpdate = true;
      dataParticles.material.opacity = 0.9 * morph;

      camera.position.x += (mouseX * 0.35 - camera.position.x) * 0.035;
      camera.position.y += (-mouseY * 0.25 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      const labelVisibility = Math.max(0, (morph - 0.55) / 0.45);

      labelElements.forEach((element, index) => {
        element.style.opacity = labelVisibility;
        const y = 50 - (layerYs[index] / 3.1) * 43;
        element.style.top = `${y}%`;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;

      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };

    // Follow layout changes, including those caused by fonts loading.
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousemove", handleMouseMove);

      labelElements.forEach((element) => {
        if (element.parentNode === mount) {
          mount.removeChild(element);
        }
      });

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      architectureLineGeometry.dispose();
      architectureLineMaterial.dispose();
      dataGeometry.dispose();
      dataMaterial.dispose();
      renderer.dispose();
    };
  }, [darkMode]);

  return (
    <div
      ref={mountRef}
      className="pf-hero-canvas"
      aria-hidden="true"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    />
  );
}

function ArchitectureVisual() {
  return (
    <div className="pf-architecture" aria-label="Software architecture flow">
      <div className="pf-arch-node">APPLICATION</div>
      <div className="pf-arch-line" />
      <div className="pf-arch-row">
        <div className="pf-arch-node small">API</div>
        <div className="pf-arch-node small">AUTH</div>
      </div>
      <div className="pf-arch-line" />
      <div className="pf-arch-row">
        <div className="pf-arch-node small">DATABASE</div>
        <div className="pf-arch-node small">ML MODEL</div>
      </div>
      <div className="pf-arch-line" />
      <div className="pf-arch-node">CLOUD / CI/CD</div>
    </div>
  );
}

export default function Portfolio() {
  const [openProject, setOpenProject] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  
  const [darkMode, setDarkMode] = useState(true);

  const NAME = "Soyamo Vakala";
  const EMAIL = "lloydsoyamo@gmail.com";
  const GITHUB = "https://github.com/Soyamo";
  const LINKEDIN = "https://linkedin.com/in/svakala";

  const CV_LINK = `${import.meta.env.BASE_URL}Resume_Soyamo.pdf`;
  const PHOTO_SRC = `${import.meta.env.BASE_URL}profile.jpeg`;
  const LOGO_SRC = `${import.meta.env.BASE_URL}sv.svg`;

  const toggleProject = (id) => {
    setOpenProject(openProject === id ? null : id);
  };

  return (
    <div className={`pf-root ${darkMode ? "pf-dark" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600;700&display=swap');

        html {
          scroll-behavior: smooth;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100vw;
          min-height: 100vh;
          overflow-x: hidden;
        }

        #about,
        #impact,
        #skills,
        #projects,
        #engineering,
        #background,
        #contact {
          scroll-margin-top: 108px;
        }

        .pf-root {
          --bg: #f7f8fc;
          --surface: #ffffff;
          --surface-2: #eef0f7;
          --text: #1b1f2a;
          --text-dim: #5b6172;
          --accent: #2f6f5e;
          --accent-on: #ffffff;
          --accent-warn: #c97a2e;
          --border: #e1e4ed;
          --shadow: 0 18px 50px rgba(24, 31, 42, 0.08);

          background: var(--bg);
          color: var(--text);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          min-height: 100vh;
          width: 100vw;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .pf-dark {
          --bg: #0c1110;
          --surface: #111817;
          --surface-2: #17211e;
          --text: #edf4f0;
          --text-dim: #9caea6;
          --accent: #6bb394;
          --accent-on: #08100d;
          --accent-warn: #d69a5d;
          --border: #26332f;
          --shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
        }

        .pf-root *,
        .pf-root *::before,
        .pf-root *::after {
          box-sizing: border-box;
        }

        .pf-root h1,
        .pf-root h2,
        .pf-root h3 {
          font-family: "Bricolage Grotesque", "Inter", sans-serif;
          font-weight: 600;
          color: var(--text);
        }

        .pf-mono {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        }

        .pf-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* NAV & LOGO */

        .pf-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: color-mix(in srgb, var(--bg) 90%, transparent);
          backdrop-filter: blur(12px);
          border-bottom: none;
        }

        .pf-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 120px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .pf-nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
        }

        .pf-nav-logo-img {
          height: 120px;
          max-height: 100%;
          width: auto;
          border-radius: 12px;
          object-fit: contain;
          display: block;
        }

        .pf-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .pf-nav-links a {
          position: relative;
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-dim);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 6px;
          transition: color 0.25s ease, background 0.25s ease, transform 0.2s ease;
        }

        .pf-nav-links a::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 2px;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pf-nav-links a:hover {
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 8%, transparent);
          transform: translateY(-1px);
        }

        .pf-nav-links a:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .pf-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pf-icon-btn,
        .pf-nav-toggle {
          border: none;
          background: var(--surface);
          color: var(--text);
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease;
        }

        .pf-icon-btn {
          width: 38px;
          height: 38px;
          font-size: 16px;
        }

        .pf-icon-btn:hover,
        .pf-nav-toggle:hover {
          transform: translateY(-2px);
        }

        .pf-nav-toggle {
          display: none;
          padding: 8px 14px;
          font-size: 13px;
        }

        /* HERO */

        .pf-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px 40px 60px;
          min-height: auto;
        }

        .pf-hero-content {
          max-width: 720px;
        }

        .pf-status-line {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          color: var(--text-dim);
          background: var(--surface);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          margin-bottom: 28px;
        }

        .pf-status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .pf-hero h1 {
          font-size: clamp(44px, 5.5vw, 76px);
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0 0 24px;
        }

        .pf-hero h1 span {
          color: var(--accent);
        }

        .pf-hero p {
          color: var(--text-dim);
          font-size: 18px;
          line-height: 1.7;
          margin: 0 0 36px;
        }

        .pf-cta-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .pf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          padding: 12px 22px;
          border-radius: 8px;
          text-decoration: none;
          border: none;
          color: var(--text);
          background: var(--surface);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .pf-btn:hover {
          transform: translateY(-2px);
        }

        .pf-btn-primary {
          background: var(--accent);
          color: var(--accent-on);
          font-weight: 600;
        }

        .pf-hero-canvas {
          width: 100%;
          height: 480px;
          min-width: 0;
        }

        /* IMPACT */

        .pf-impact {
          background: var(--surface);
          border-radius: 16px;
          box-shadow: var(--shadow);
          margin: 20px 0 60px;
        }

        .pf-impact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .pf-impact-card {
          padding: 32px 28px;
          text-align: center;
        }

        .pf-impact-number {
          display: block;
          font-family: "Bricolage Grotesque", sans-serif;
          font-size: 36px;
          font-weight: 600;
          letter-spacing: -0.04em;
          color: var(--accent);
        }

        .pf-impact-label {
          display: block;
          color: var(--text-dim);
          font-size: 13px;
          margin-top: 4px;
        }

        /* SECTIONS */

        .pf-section {
          padding: 108px 0;
          border-bottom: none;
        }

        .pf-section-heading {
          margin-bottom: 45px;
        }

        .pf-eyebrow {
          color: var(--accent);
          font-family: "SFMono-Regular", Consolas, monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pf-section h2 {
          font-size: 36px;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .pf-section-intro {
          color: var(--text-dim);
          max-width: 65ch;
          margin: 12px 0 0;
          font-size: 16px;
        }

        /* FEATURED */

        .pf-featured {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 0;
          border: none;
          border-radius: 20px;
          background: var(--surface);
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .pf-featured-visual {
          min-height: 480px;
          padding: 42px;
          background: var(--surface-2);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .pf-featured-content {
          padding: 48px;
        }

        .pf-project-kicker {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: "SFMono-Regular", Consolas, monospace;
          font-size: 11px;
          color: var(--text-dim);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pf-featured-content h3 {
          font-size: 38px;
          line-height: 1.08;
          margin: 18px 0 14px;
          letter-spacing: -0.035em;
        }

        .pf-featured-content > p {
          color: var(--text-dim);
          font-size: 15px;
          line-height: 1.7;
        }

        .pf-featured-metric {
          display: inline-flex;
          margin: 18px 0;
          padding: 10px 16px;
          border-radius: 6px;
          background: var(--surface-2);
          color: var(--accent);
          font-weight: 700;
          font-size: 13px;
        }

        .pf-featured-links {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        /* ARCHITECTURE */

        .pf-architecture {
          width: 100%;
          max-width: 430px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pf-arch-node {
          width: 190px;
          padding: 13px 15px;
          border-radius: 8px;
          border: 1px solid var(--accent);
          background: var(--surface);
          color: var(--accent);
          text-align: center;
          font-family: "SFMono-Regular", Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 7%, transparent);
          animation: pfPulse 3s ease-in-out infinite;
        }

        .pf-arch-node.small {
          width: 140px;
          animation-delay: 0.6s;
        }

        .pf-arch-row {
          display: flex;
          gap: 30px;
        }

        .pf-arch-line {
          height: 28px;
          width: 1px;
          background: var(--accent);
          opacity: 0.45;
        }

        @keyframes pfPulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        /* PROJECTS */

        .pf-project-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pf-project {
          border-radius: 12px;
          background: var(--surface);
          box-shadow: var(--shadow);
          padding: 12px 28px;
          transition: transform 0.2s ease;
        }

        .pf-project:hover {
          transform: translateY(-2px);
        }

        .pf-project-button {
          width: 100%;
          border: 0;
          background: transparent;
          color: inherit;
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 20px;
          align-items: center;
          text-align: left;
          padding: 18px 0;
          cursor: pointer;
        }

        .pf-project-main {
          min-width: 0;
        }

        .pf-project-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 17px;
          font-weight: 600;
        }

        .pf-project-summary {
          color: var(--text-dim);
          font-size: 14px;
          margin: 6px 0 0;
          max-width: 75ch;
        }

        .pf-project-tag {
          font-family: "SFMono-Regular", Consolas, monospace;
          color: var(--text-dim);
          font-size: 11px;
          white-space: nowrap;
          letter-spacing: 0.05em;
        }

        .pf-project-arrow {
          color: var(--accent);
          font-size: 20px;
          transition: transform 0.25s ease;
        }

        .pf-project-button[aria-expanded="true"] .pf-project-arrow {
          transform: rotate(45deg);
        }

        .pf-project-detail {
          padding: 10px 0 20px;
          max-width: 900px;
        }

        .pf-project-detail p {
          color: var(--text-dim);
          font-size: 14.5px;
          margin: 0 0 20px;
        }

        .pf-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .pf-detail-box {
          padding: 18px;
          background: var(--surface-2);
          border-radius: 8px;
        }

        .pf-detail-box strong {
          display: block;
          color: var(--text);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 6px;
        }

        .pf-detail-box span {
          color: var(--text-dim);
          font-size: 13px;
        }

        .pf-project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pf-chip {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          padding: 5px 12px;
          border-radius: 6px;
          background: var(--surface-2);
          color: var(--text-dim);
          transition: background 0.18s ease, color 0.18s ease;
        }

        .pf-chip:hover {
          background: var(--accent);
          color: var(--accent-on);
        }

        /* ENGINEERING */

        .pf-engineering {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 70px;
          align-items: center;
        }

        .pf-engineering-copy p {
          color: var(--text-dim);
          font-size: 15px;
          line-height: 1.75;
        }

        .pf-build-steps {
          display: grid;
          gap: 16px;
        }

        .pf-build-step {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 20px;
          padding: 22px 24px;
          background: var(--surface);
          border-radius: 12px;
          box-shadow: var(--shadow);
        }

        .pf-build-number {
          color: var(--accent);
          font-family: "SFMono-Regular", Consolas, monospace;
          font-size: 13px;
          font-weight: 600;
          padding-top: 2px;
        }

        .pf-build-step h3 {
          margin: 0 0 4px;
          font-size: 16px;
        }

        .pf-build-step p {
          margin: 0;
          color: var(--text-dim);
          font-size: 13.5px;
        }

        /* SKILLS */

        .pf-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .pf-skill-group {
          padding: 28px;
          background: var(--surface);
          border-radius: 14px;
          box-shadow: var(--shadow);
        }

        .pf-skill-group h3 {
          font-size: 13px;
          color: var(--text-dim);
          margin: 0 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .pf-skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* ABOUT */

        .pf-about {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 50px;
          align-items: center;
          padding: 40px;
          background: var(--surface);
          border-radius: 20px;
          box-shadow: var(--shadow);
        }

        .pf-photo {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          background: var(--surface-2);
        }

        .pf-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pf-photo-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Bricolage Grotesque", sans-serif;
          font-size: 42px;
          color: var(--accent);
        }

        .pf-about-copy {
          color: var(--text-dim);
          font-size: 16px;
          line-height: 1.7;
        }

        .pf-about-facts {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }

        /* TIMELINE */

        .pf-timeline {
          max-width: 900px;
        }

        .pf-timeline-item {
          display: grid;
          grid-template-columns: 120px 24px 1fr;
          gap: 24px;
          position: relative;
          padding-bottom: 38px;
        }

        .pf-timeline-item:last-child {
          padding-bottom: 0;
        }

        .pf-timeline-when {
          color: var(--text-dim);
          font-size: 12px;
          padding-top: 2px;
        }

        .pf-timeline-rail {
          position: relative;
        }

        .pf-timeline-rail::before {
          content: "";
          position: absolute;
          left: 4px;
          top: 8px;
          bottom: -38px;
          width: 2px;
          background: var(--surface-2);
        }

        .pf-timeline-item:last-child .pf-timeline-rail::before {
          display: none;
        }

        .pf-timeline-dot {
          width: 10px;
          height: 10px;
          margin-top: 6px;
          border-radius: 50%;
          background: var(--accent);
        }

        .pf-timeline-title {
          margin: 0 0 3px;
          font-weight: 600;
          font-size: 16px;
        }

        .pf-timeline-place {
          margin: 0 0 6px;
          color: var(--text-dim);
          font-size: 14px;
        }

        .pf-timeline-note {
          margin: 0;
          color: var(--text-dim);
          font-size: 14px;
        }

        /* CONTACT */

        .pf-contact {
          padding: 100px 0 60px;
        }

        .pf-contact-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          padding: 60px;
          background: var(--surface);
          border-radius: 20px;
          box-shadow: var(--shadow);
        }

        .pf-contact h2 {
          font-size: 40px;
          margin: 0 0 12px;
          letter-spacing: -0.03em;
        }

        .pf-contact p {
          color: var(--text-dim);
          font-size: 15px;
          max-width: 50ch;
          margin: 0;
        }

        .pf-contact-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pf-footer-bottom {
          margin-top: 60px;
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: var(--text-dim);
          font-size: 12px;
        }

        /* REVEAL */

        .pf-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }

        .pf-reveal.pf-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* MOBILE RESPONSIVENESS */

        @media (max-width: 900px) {
          .pf-hero {
            grid-template-columns: 1fr;
            min-height: auto;
            padding-top: 40px;
            gap: 30px;
          }

          .pf-hero-canvas {
            height: 320px;
            order: -1;
          }

          .pf-featured {
            grid-template-columns: 1fr;
          }

          .pf-engineering {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .pf-about {
            grid-template-columns: 1fr;
            padding: 30px;
          }

          .pf-contact-inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 36px;
          }
        }

        @media (max-width: 700px) {
          .pf-nav-links {
            display: none;
          }

          .pf-nav-links.pf-nav-open {
            display: flex;
            position: absolute;
            top: 96px;
            left: 0;
            right: 0;
            background: var(--surface);
            box-shadow: var(--shadow);
            flex-direction: column;
            padding: 20px 5vw;
            gap: 16px;
          }

          .pf-nav-toggle {
            display: inline-block;
          }

          .pf-impact-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .pf-detail-grid {
            grid-template-columns: 1fr;
          }

          .pf-timeline-item {
            grid-template-columns: 80px 20px 1fr;
            gap: 14px;
          }

          .pf-footer-bottom {
            flex-direction: column;
          }
        }
      `}</style>

      {/* NAVIGATION */}

      <nav className="pf-nav">
        <div className="pf-container pf-nav-inner" style={{ position: "relative" }}>
          
          <a href="#top" className="pf-nav-logo" onClick={() => setNavOpen(false)}>
            <img src={LOGO_SRC} alt="SV Logo" className="pf-nav-logo-img" />
          </a>

          <div className={`pf-nav-links ${navOpen ? "pf-nav-open" : ""}`}>
            <a href="#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
            <a href="#engineering" onClick={() => setNavOpen(false)}>Engineering</a>
            <a href="#skills" onClick={() => setNavOpen(false)}>Skills</a>
            <a href="#background" onClick={() => setNavOpen(false)}>Background</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
          </div>

          <div className="pf-nav-actions">
            <button
              className="pf-icon-btn"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <button
              className="pf-nav-toggle"
              onClick={() => setNavOpen(!navOpen)}
              aria-expanded={navOpen}
            >
              {navOpen ? "close" : "menu"}
            </button>
          </div>
        </div>
      </nav>

      <main id="top">

        {/* HERO */}

        <section className="pf-hero">
          <div className="pf-hero-content">
            <div className="pf-status-line pf-mono">
              <StatusDot status="shipped" />
              AVAILABLE · SOFTWARE DEV ENGINEER / DATA ENGINEER · SOUTH AFRICA
            </div>

            <h1>
              Software engineer building <span>data-driven systems.</span>
            </h1>

            <p>
              Computer Science Honours graduate building full-stack applications, data systems and security-focused software with Python, Java, SQL and cloud technologies.
            </p>

            <div className="pf-cta-row">
              <a className="pf-btn pf-btn-primary" href="#projects">
                View projects →
              </a>

              <a className="pf-btn" href={CV_LINK} target="_blank" rel="noopener noreferrer">
                Download CV
              </a>

              <a className="pf-btn" href={GITHUB} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>

          <HeroScene darkMode={darkMode} />
        </section>

        {/* IMPACT */}

        <div className="pf-container">
          <section id="impact" className="pf-impact">
            <div className="pf-impact-grid">
              <Reveal className="pf-impact-card">
                <span className="pf-impact-number">
                  <CountUp target={92} suffix="%" />
                </span>
                <span className="pf-impact-label">Deepfake detection accuracy</span>
              </Reveal>

              <Reveal className="pf-impact-card">
                <span className="pf-impact-number">
                  <CountUp target={65} suffix="%" />
                </span>
                <span className="pf-impact-label">Faster deployment time</span>
              </Reveal>

              <Reveal className="pf-impact-card">
                <span className="pf-impact-number">
                  <CountUp target={3} suffix="+" />
                </span>
                <span className="pf-impact-label">Full-stack systems built</span>
              </Reveal>
            </div>
          </section>

          {/* ABOUT */}

          <section id="about" className="pf-section">
            <Reveal>
              <div className="pf-section-heading">
                <div className="pf-eyebrow">01 / About</div>
                <h2>Who I am</h2>
              </div>

              <div className="pf-about">
                <div className="pf-photo">
                  {PHOTO_SRC ? (
                    <img src={PHOTO_SRC} alt={NAME} />
                  ) : (
                    <div className="pf-photo-placeholder">SV</div>
                  )}
                </div>

                <div>
                  <p className="pf-about-copy">
                    I'm a Computer Science Honours graduate from the University of Johannesburg interested in building reliable software around data, security and automation.
                  </p>

                  <p className="pf-about-copy">
                    I enjoy taking a problem from requirements and database design through to application code, testing and deployment. My projects have included fraud detection systems, machine-learning applications, relational databases and cloud deployments.
                  </p>

                  <div className="pf-about-facts">
                    <span className="pf-chip pf-mono">Johannesburg, South Africa</span>
                    <span className="pf-chip pf-mono">Open to relocation</span>
                    <span className="pf-chip pf-mono">Software engineering</span>
                    <span className="pf-chip pf-mono">Data engineering</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* FEATURED PROJECT */}

          <section id="projects" className="pf-section">
            <Reveal>
              <div className="pf-section-heading">
                <div className="pf-eyebrow">02 / Work</div>
                <h2>Featured project</h2>
                <p className="pf-section-intro">
                  A closer look at the kind of systems I like to build.
                </p>
              </div>

              {(() => {
                const p = PROJECTS.find((project) => project.featured);

                return (
                  <article className="pf-featured">
                    <div className="pf-featured-visual">
                      <div className="pf-project-kicker">
                        <StatusDot status={p.status} />
                        {p.tag}
                      </div>

                      <ArchitectureVisual />
                    </div>

                    <div className="pf-featured-content">
                      <div className="pf-project-kicker">FEATURED</div>
                      <h3>{p.name}</h3>
                      <p>{p.summary}</p>

                      <div className="pf-featured-metric">{p.metric}</div>

                      <p>
                        <strong>The problem:</strong> {p.problem}
                      </p>

                      <p>
                        <strong>What I built:</strong> {p.contribution}
                      </p>

                      <div className="pf-project-stack">
                        {p.stack.map((item) => (
                          <span className="pf-chip pf-mono" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="pf-featured-links">
                        <a
                          className="pf-btn pf-btn-primary"
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on GitHub ↗
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })()}
            </Reveal>

            {/* OTHER PROJECTS */}

            <Reveal style={{ marginTop: 65 }}>
              <div className="pf-section-heading">
                <div className="pf-eyebrow">Other work</div>
                <h2>Projects</h2>
              </div>

              <div className="pf-project-list">
                {PROJECTS.filter((p) => !p.featured).map((p) => {
                  const open = openProject === p.id;

                  return (
                    <article className="pf-project" key={p.id}>
                      <button
                        className="pf-project-button"
                        onClick={() => toggleProject(p.id)}
                        aria-expanded={open}
                      >
                        <div className="pf-project-main">
                          <div className="pf-project-title">
                            <StatusDot status={p.status} />
                            {p.name}
                          </div>

                          <div className="pf-project-summary">{p.summary}</div>
                        </div>

                        <span className="pf-project-tag">{p.tag}</span>
                        <span className="pf-project-arrow" aria-hidden="true">+</span>
                      </button>

                      {open && (
                        <div className="pf-project-detail">
                          <p>{p.detail}</p>

                          <div className="pf-detail-grid">
                            <div className="pf-detail-box">
                              <strong>The problem</strong>
                              <span>{p.problem}</span>
                            </div>

                            <div className="pf-detail-box">
                              <strong>My contribution</strong>
                              <span>{p.contribution}</span>
                            </div>

                            <div className="pf-detail-box">
                              <strong>Technical decision</strong>
                              <span>{p.decisions}</span>
                            </div>
                          </div>

                          {p.metric && (
                            <div className="pf-featured-metric">{p.metric}</div>
                          )}

                          <div className="pf-project-stack">
                            {p.stack.map((item) => (
                              <span className="pf-chip pf-mono" key={item}>
                                {item}
                              </span>
                            ))}
                          </div>

                          <div className="pf-featured-links">
                            <a
                              className="pf-btn"
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {p.github.includes("gitlab.com") ? "GitLab" : p.github === GITHUB ? "GitHub profile" : "GitHub"} ↗
                            </a>

                            {p.demo && (
                              <a
                                className="pf-btn"
                                href={p.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Live demo ↗
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </section>

          {/* ENGINEERING */}

          <section id="engineering" className="pf-section">
            <Reveal>
              <div className="pf-engineering">
                <div className="pf-engineering-copy">
                  <div className="pf-eyebrow">03 / Engineering</div>
                  <h2>How I build</h2>

                  <p>
                    I try to approach software problems as systems rather than isolated coding tasks. I start by understanding the requirements and constraints, then work through the design before implementing and testing the solution.
                  </p>

                  <p>
                    My goal is simple: build something that is understandable, maintainable and reliable rather than unnecessarily complicated.
                  </p>
                </div>

                <div className="pf-build-steps">
                  <div className="pf-build-step">
                    <div className="pf-build-number">01</div>
                    <div>
                      <h3>Understand</h3>
                      <p>Break the problem into requirements, constraints, inputs and expected outputs.</p>
                    </div>
                  </div>

                  <div className="pf-build-step">
                    <div className="pf-build-number">02</div>
                    <div>
                      <h3>Design</h3>
                      <p>Choose the architecture, database structure, APIs and responsibilities of each component.</p>
                    </div>
                  </div>

                  <div className="pf-build-step">
                    <div className="pf-build-number">03</div>
                    <div>
                      <h3>Build</h3>
                      <p>Implement incrementally using readable, testable and maintainable code.</p>
                    </div>
                  </div>

                  <div className="pf-build-step">
                    <div className="pf-build-number">04</div>
                    <div>
                      <h3>Validate</h3>
                      <p>Test normal cases, edge cases, failure scenarios and security concerns.</p>
                    </div>
                  </div>

                  <div className="pf-build-step">
                    <div className="pf-build-number">05</div>
                    <div>
                      <h3>Deploy</h3>
                      <p>Containerise the application and automate repeatable deployment where appropriate.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* SKILLS */}

          <section id="skills" className="pf-section">
            <Reveal>
              <div className="pf-section-heading">
                <div className="pf-eyebrow">04 / Toolkit</div>
                <h2>Technical skills</h2>
                <p className="pf-section-intro">
                  Technologies I've used across academic, personal and full-stack projects.
                </p>
              </div>

              <div className="pf-skills-grid">
                {SKILLS.map((skill) => (
                  <div className="pf-skill-group" key={skill.group}>
                    <h3>{skill.group}</h3>
                    <div className="pf-skill-chips">
                      {skill.items.map((item) => (
                        <span className="pf-chip pf-mono" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* BACKGROUND */}

          <section id="background" className="pf-section">
            <Reveal>
              <div className="pf-section-heading">
                <div className="pf-eyebrow">05 / Background</div>
                <h2>Education</h2>
              </div>

              <div className="pf-timeline">
                {TIMELINE.map((item) => (
                  <div className="pf-timeline-item" key={item.title}>
                    <div className="pf-timeline-when pf-mono">{item.when}</div>
                    <div className="pf-timeline-rail">
                      <div className="pf-timeline-dot" />
                    </div>
                    <div>
                      <p className="pf-timeline-title">{item.title}</p>
                      <p className="pf-timeline-place">{item.place}</p>
                      <p className="pf-timeline-note">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* CONTACT */}

          <section id="contact" className="pf-contact">
            <Reveal>
              <div className="pf-contact-inner">
                <div>
                  <div className="pf-eyebrow">06 / Contact</div>
                  <h2>Let's build something.</h2>
                  <p>
                    I'm currently looking for software engineering, data engineering, graduate and entry-level opportunities.
                  </p>
                </div>

                <div className="pf-contact-links">
                  <a className="pf-btn pf-btn-primary" href={`mailto:${EMAIL}`}>
                    Email me
                  </a>
                  <a className="pf-btn" href={GITHUB} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                  <a className="pf-btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    LinkedIn ↗
                  </a>
                </div>
              </div>

              <div className="pf-footer-bottom">
                <span>© 2026 {NAME}</span>
                <span className="pf-mono">Built with React + Three.js</span>
              </div>
            </Reveal>
          </section>

        </div>
      </main>
    </div>
  );
}
