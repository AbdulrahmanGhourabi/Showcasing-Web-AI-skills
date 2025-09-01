 let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

        function initThree() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ 
                canvas: document.getElementById('three-canvas'),
                antialias: true,
                alpha: true 
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            // Create particle system
            const geometry = new THREE.BufferGeometry();
            const particleCount = 1000;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 100;
                positions[i + 1] = (Math.random() - 0.5) * 100;
                positions[i + 2] = (Math.random() - 0.5) * 100;

                colors[i] = Math.random();
                colors[i + 1] = Math.random() * 0.5 + 0.5;
                colors[i + 2] = 1;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            camera.position.z = 30;

            // Mouse interaction
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            });

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.001;
            particles.rotation.y += 0.002;

            // Mouse interaction effect
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;

            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Smooth scrolling navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav item
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollIndicator').style.transform = `scaleX(${scrolled / 100})`;
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
        });
  