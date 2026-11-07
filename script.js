/* ============================================================
   SCRIPT | Abdul Wahab Portfolio
   "Scholarly Elegance" Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // =============================
    // ENGINEERING PRELOADER ANIMATION
    // =============================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const line = document.querySelector('.preloader-line');
        const nodeConsistency = document.querySelector('.node-consistency');
        const nodeHardworking = document.querySelector('.node-hardworking');
        const nodeSuccess = document.querySelector('.node-success');
        const statusText = document.getElementById('preloader-status');

        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        // Animation sequence
        setTimeout(() => {
            // Stage 1: Move to Consistency
            line.style.width = '33.33%';
            statusText.textContent = 'Establishing Consistency...';
            
            setTimeout(() => {
                nodeConsistency.classList.add('active-gold');
                line.style.background = 'var(--clr-accent-1)';
                line.style.boxShadow = '0 0 10px var(--clr-accent-1)';
                
                setTimeout(() => {
                    // Stage 2: Move to Hard Working
                    line.style.width = '66.66%';
                    statusText.textContent = 'Applying Hard Work...';
                    
                    setTimeout(() => {
                        nodeHardworking.classList.add('active-diamond');
                        line.style.background = '#E0FFFF';
                        line.style.boxShadow = '0 0 15px #00FFFF';
                        
                        setTimeout(() => {
                            // Stage 3: Move to Success
                            line.style.width = '100%';
                            statusText.textContent = 'Achieving Success...';
                            
                            setTimeout(() => {
                                nodeSuccess.classList.add('active-success');
                                line.style.background = 'linear-gradient(90deg, var(--clr-accent-1), #00FFFF)';
                                line.style.boxShadow = '0 0 20px var(--clr-accent-1), 0 0 20px #00FFFF';
                                statusText.textContent = 'System Ready.';
                                
                                // Fade out preloader
                                setTimeout(() => {
                                    preloader.classList.add('hidden');
                                    document.body.style.overflow = ''; // Restore scrolling
                                    setTimeout(() => {
                                        preloader.remove(); // Remove from DOM after fade
                                    }, 800);
                                }, 1200); // Hold success state
                                
                            }, 500); // Time to reach node 3
                            
                        }, 700); // Hold Hard Working state
                        
                    }, 500); // Time to reach node 2
                    
                }, 700); // Hold Consistency state
                
            }, 500); // Time to reach node 1
            
        }, 500); // Initial delay
    }

    // =============================
    // READING PROGRESS BAR
    // =============================
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollTotal) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    // =============================
    // AURORA BOREALIS Background (Subtle Academic Style)
    // =============================
    const canvas = document.getElementById('aurora-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animationId;
        let time = 0;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function getAuroraColors() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                return [
                    { r: 212, g: 168, b: 75, a: 0.02 },   // Academic Gold
                    { r: 107, g: 142, b: 181, a: 0.02 },  // Steel Blue
                    { r: 160, g: 140, b: 120, a: 0.015 }, // Warm Grey
                ];
            }
            return [
                { r: 200, g: 150, b: 62, a: 0.03 },    // Academic Gold
                { r: 91, g: 127, b: 164, a: 0.03 },    // Slate Blue
                { r: 160, g: 140, b: 120, a: 0.02 },   // Warm Grey
            ];
        }

        function drawAurora() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const colors = getAuroraColors();
            time += 0.002; // Slower, more elegant movement

            for (let i = 0; i < colors.length; i++) {
                const c = colors[i];
                const layers = 2; // Reduced layers for subtlety

                for (let l = 0; l < layers; l++) {
                    ctx.beginPath();

                    const yBase = canvas.height * (0.2 + i * 0.2);
                    const amplitude = 60 + i * 20 + l * 15;
                    const frequency = 0.0008 + i * 0.0002;
                    const phase = time * (0.3 + i * 0.1) + l * 0.5;

                    ctx.moveTo(0, yBase);

                    for (let x = 0; x <= canvas.width; x += 5) {
                        const y = yBase +
                            Math.sin(x * frequency + phase) * amplitude +
                            Math.sin(x * frequency * 2.0 + phase * 1.2) * (amplitude * 0.3) +
                            Math.cos(x * frequency * 0.5 + phase * 0.5) * (amplitude * 0.2);
                        ctx.lineTo(x, y);
                    }

                    ctx.lineTo(canvas.width, canvas.height);
                    ctx.lineTo(0, canvas.height);
                    ctx.closePath();

                    const gradient = ctx.createLinearGradient(0, yBase - amplitude, 0, yBase + amplitude * 2);
                    gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
                    gradient.addColorStop(0.3, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * (1 - l * 0.3)})`);
                    gradient.addColorStop(0.6, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 0.5 * (1 - l * 0.3)})`);
                    gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }

            // Subtle floating particles
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const particleCount = 15; // Reduced count
            for (let i = 0; i < particleCount; i++) {
                const px = (Math.sin(time * 0.3 + i * 2.39) * 0.5 + 0.5) * canvas.width;
                const py = (Math.cos(time * 0.2 + i * 1.73) * 0.5 + 0.5) * canvas.height;
                const radius = 1 + Math.sin(time + i) * 0.8;
                const alpha = isDark ? 0.1 + Math.sin(time * 1.5 + i) * 0.05 : 0.05 + Math.sin(time * 1.5 + i) * 0.03;

                ctx.beginPath();
                ctx.arc(px, py, radius, 0, Math.PI * 2);
                if (isDark) {
                    ctx.fillStyle = `rgba(212, 168, 75, ${alpha})`;
                } else {
                    ctx.fillStyle = `rgba(200, 150, 62, ${alpha})`;
                }
                ctx.fill();
            }

            animationId = requestAnimationFrame(drawAurora);
        }

        drawAurora();
    }

    // =============================
    // IMPACT METRICS COUNTER
    // =============================
    const metrics = document.querySelectorAll('.metric-number');
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                if (isNaN(target)) return;
                
                let count = 0;
                const duration = 1500; // ms
                const increment = target / (duration / 16); // 60fps approx
                
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target + '+';
                    }
                };
                updateCounter();
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => metricsObserver.observe(metric));

    // =============================
    // THEME TOGGLE
    // =============================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeLabel = themeToggle.querySelector('.theme-label');

        // Load saved theme
        const savedTheme = localStorage.getItem('aw-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeLabel(savedTheme);

        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('aw-theme', next);
            updateThemeLabel(next);
            lucide.createIcons();
        });

        function updateThemeLabel(theme) {
            themeLabel.textContent = theme === 'light' ? 'Dark' : 'Light';
        }
    }

    // =============================
    // NAVBAR SCROLL EFFECT
    // =============================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // =============================
    // HAMBURGER MENU
    // =============================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // =============================
    // SCROLL REVEAL ANIMATIONS
    // =============================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-in').forEach((el) => {
        observer.observe(el);
    });

    // =============================
    // ACTIVE NAV LINK TRACKING
    // =============================
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
    });

    sections.forEach(section => sectionObserver.observe(section));

    // =============================
    // LANGUAGE BANDS (0-9)
    // =============================
    const langContainers = document.querySelectorAll('.lang-bands');
    langContainers.forEach(container => {
        const score = parseInt(container.getAttribute('data-score'), 10) || 0;
        for (let i = 1; i <= 9; i++) {
            const band = document.createElement('div');
            band.className = 'lang-band';
            if (i <= score) {
                band.classList.add('active');
            }
            container.appendChild(band);
        }
    });

    const langObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const bands = entry.target.querySelectorAll('.lang-band.active');
                bands.forEach((band, idx) => {
                    band.style.opacity = '0';
                    band.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        band.style.transition = 'all 0.3s ease';
                        band.style.opacity = '1';
                        band.style.transform = 'scale(1)';
                    }, idx * 100);
                });
                langObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    langContainers.forEach(container => langObserver.observe(container));

    // =============================
    // SMOOTH SCROLL for NAV LINKS
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =============================
    // STAGGER ANIMATION FOR GRIDS
    // =============================
    const staggerContainers = document.querySelectorAll('.projects-grid, .skills-grid, .cert-grid, .profiles-grid, .methodology-pipeline');
    
    staggerContainers.forEach(container => {
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        staggerObserver.observe(container);
    });

    // =============================
    // PROJECT DEEP-DIVE MODAL & GALLERY
    // =============================
    const projectData = {
        'flush-driven': {
            title: 'Universal Flush-Driven Aerosol Mechanism (Zero-Power Automation)',
            images: [
                'assets/images/projects/project_1/complete assembly.JPG',
                'assets/images/projects/project_1/bill_of_material_manual_mechanism.JPG',
                'assets/images/projects/project_1/rod_b-imageonline.co-merged.jpg',
                'assets/images/projects/project_1/spring.JPG'
            ],
            tags: ['Zero-Power Automation', 'Kinematic Linkage', 'Cable Drive Mechanics', 'SolidWorks Assembly'],
            problemTitle: 'The Problem to Solve',
            problemIcon: 'alert-triangle',
            problem: 'Most automatic bathroom air fresheners rely on AA batteries that frequently die, corrode from moisture, and create chemical battery waste. Manual spray cans get forgotten by guests. The challenge was to invent a completely mechanical, zero-electricity system that automatically triggers a fresh spray during every flush without altering the toilet’s porcelain or plumbing.',
            solutionTitle: 'How the Mechanism Solves It',
            solutionIcon: 'lightbulb',
            solution: [
                'Flexible Bowden Cable: Sourced a flexible stainless steel bicycle clutch wire to connect directly to the toilet flush handle, transferring pulling motion around porcelain curves without rigid linkages binding.',
                'Seesaw Rocker Linkage: Pulling the cable lifts an internal steel rod that tilts a central rocker arm inside a polypropylene box, forcing the opposite end down onto the aerosol nozzle with >9 Newtons of positive force.',
                'Anti-Slip Rubber Grip: Sized a high-friction neoprene rubber pad onto the actuator tip so the metal rod firmly grips the slick, curved plastic spray button without skidding off sideways.',
                'Automatic Spring Reset: A high-carbon steel music-wire spring instantly pushes the actuator back up the second the user lets go of the flush handle, returning the entire linkage to ready position.'
            ],
            howTitle: 'Engineering & Fabrication Details',
            howIcon: 'settings',
            how: [
                'Logical >9N Force Sizing: Sized the lever arm ratio and spring rate to exceed the 9N threshold needed to overcome stiff aerosol can valve springs reliably',
                'Design-to-Cost Cable Sourcing: Used off-the-shelf high-tensile bicycle clutch wire to keep production costs low while ensuring universal fit on any standard English commode',
                'Rust-Proof Bathroom DFM: Formed the mounting frame from galvanized sheet metal and enclosed moving parts in a two-piece polypropylene box to withstand 100% humidity without corrosion',
                'Full Production Drawing: Created a detailed SolidWorks Bill of Materials (BOM) specifying standard fasteners, linkages, spring wire, and rubber contact slips'
            ],
            benefitsTitle: 'Key Benefits',
            benefitsIcon: 'check-circle-2',
            benefits: [
                '100% Battery-Free: Runs purely on human mechanical force from the flush handle: zero electricity, zero cords, zero dead batteries',
                'Moisture & Rust Proof: Galvanized sheet metal frame and polypropylene enclosure survive humid bathroom environments permanently',
                'Universal Aerosol Fit: Open holder bracket accommodates standard commercial spray cans without expensive proprietary refills',
                'Reliable & Automatic: Neoprene grip and music-wire spring guarantee smooth, slip-free actuation and instant reset on every flush'
            ]
        },
        'mixture-machine': {
            title: '3D Model of Modular Cordless Mixture Machine',
            images: [
                'assets/images/projects/project_2/1.jpeg',
                'assets/images/projects/project_2/2.jpeg',
                'assets/images/projects/project_2/3.jpeg',
                'assets/images/projects/project_2/4.jpeg'
            ],
            tags: ['Consumer Product Design', 'SolidWorks Modeling', 'DFM / DFA', 'Interference Fit'],
            problem: 'Bulky corded blenders have large countertop footprints, require clumsy cord management, and feature complex assemblies that make single-serve cleaning inconvenient.',
            solution: 'Designed an internal-threaded borosilicate glass jar mating with the motor base and sealed by a circular food-grade silicone flat gasket to prevent liquid ingress under high-velocity vortexing. Engineered a permanent one-time interference fit between the 304 stainless steel blade hub and motor shaft to withstand 15,000 to 20,000 RPM dynamic cutting torque without loosening while isolating sharp blades from consumer handling.',
            howTitle: 'Technical Implementation',
            how: [
                'Modeling & Development: Detailed 3D part modeling, component assembly, and envelope packaging in SolidWorks',
                'Impeller Geometry: 4-fin 304 stainless steel impeller modeled via 3D lofts, sweeps, and circular patterns',
                'Drive Retention: Permanent interference-fit joint between drive shaft and blade hub for 15,000 to 20,000 RPM torque',
                'Sealing Interface: Internal-threaded borosilicate glass jar with seated food-grade circular silicone flat gasket',
                'Component Packaging: Simplified 3D bounding-box dummy volumes for 18V DC motor and 2000 mAh battery',
                'User Control: Exterior multi-state push button for sequential 4-stage cyclic control (ON/Low → Med → High → OFF)'
            ],
            benefitsTitle: 'Measurable Benefits',
            benefits: [
                'Space Efficiency: 40% smaller footprint for single-serve, travel-friendly portability',
                'Hygienic Serviceability: Tool-free, leak-free disassembly for rapid cleaning',
                'Cordless Portability: USB-C rechargeable 2000 mAh lithium battery pack',
                'Operational Safety: Permanent blade hub retention prevents loose blade contact and detachment'
            ]
        },
        'cli-toothbrush': {
            title: 'CLI Sonic Toothbrush, Modular UV-C Sterilizing Travel Case',
            images: [
                'assets/images/projects/project_3/1.PNG',
                'assets/images/projects/project_3/2.PNG',
                'assets/images/projects/project_3/3.PNG',
                'assets/images/projects/project_3/4.PNG'
            ],
            tags: ['UV-C Sealed Cavity', 'Transition Fit Tolerancing', 'Injection Molding DFM', 'Modular Architecture'],
            problemTitle: 'The Problem to Solve',
            problemIcon: 'alert-triangle',
            problem: 'When you pack a toothbrush in a damp bag, bacteria multiply fast on the wet bristles. Standard electric toothbrushes also create a lot of plastic waste: you throw away the entire motor head just to get fresh bristles. And most travel toothbrush cases offer zero sterilization, just a vented plastic cap that traps moisture.',
            solutionTitle: 'How the Design Solves It',
            solutionIcon: 'lightbulb',
            solution: [
                'Sealed UV-C Sterilization Chamber: Two UV-C LED emitters (265nm) are built into the PCB at the bottom of the base tray, powered by a USB-C port on the side. When the opaque sleeve slides fully shut, it seals the internal cavity. UV-C light bounces off the interior walls and irradiates the bristles from all angles, eliminating 99.88% of bacteria without any UV-C exposure to the user.',
                'Modular Bristle Cartridge (1° Draft + Transition Fit): Replacement brush heads attach via two alignment pins designed with a 1° injection-molding draft angle and an extended transition fit depth. This keeps the head firmly locked during brushing while remaining easy to pull off by hand: no tools, no waste from throwing away an entire motor head.',
                'Friction-Sealed Sliding Sleeve (0.8° Draft): The yellow outer sleeve uses a 0.8° taper across a large mating surface to generate controlled sliding friction. It stays reliably closed inside a backpack under gravity and jostling: no latches, no buttons, no moving clips to break.',
                'Spare Head Storage: The base tray accommodates the full handle plus two reserve bristle cartridges in dedicated molded slots, keeping everything organized in one slim travel kit.'
            ],
            howTitle: 'Engineering & DFM Decisions',
            howIcon: 'settings',
            how: [
                'Transition Fit Tolerancing: Both the bristle head pins and sleeve closure use transition fits (tighter than clearance, looser than interference), giving predictable friction without press-fit assembly forces',
                'Dual-Process DFM: Wall thicknesses on tray cavities and sleeve walls were governed by both injection molding guidelines (uniform wall, draft angles) and FDM 3D printing standards as a concept portfolio model',
                '1° vs 0.8° Draft Strategy: The bristle pin uses 1° for a slightly firmer friction hold; the sleeve uses 0.8° over a much larger surface for consistent closure force without rattling',
                'USB-C PCB Integration: The base tray was modeled with a PCB envelope and USB-C port cutout, integrating the charging and UV-C LED circuitry as a compact sub-assembly within the slim tray profile'
            ],
            benefitsTitle: 'Key Benefits',
            benefitsIcon: 'check-circle-2',
            benefits: [
                'Bacteria-Free Travel: Sealed UV-C cavity kills 99.88% of bacterial biomass on bristles, with no damp, contaminated brush in your bag',
                'Less Plastic Waste: Only the bristle cartridge is replaced (not the entire motor handle), dramatically reducing polymer waste',
                'Backpack-Safe Closure: 0.8° tapered sleeve stays reliably shut under gravity and pressure without latches or clips',
                'All-in-One Travel Kit: Handle + 2 spare bristle heads stored in a single slim, pocket-sized case with USB-C charging'
            ]
        },
        'mini-projects': {
            title: 'Industrial Systems Library',
            images: [
                'assets/images/projects/project_4/1.PNG',
                'assets/images/projects/project_4/2.PNG',
                'assets/images/projects/project_4/3.PNG',
                'assets/images/projects/project_4/4.PNG',
                'assets/images/projects/project_4/5.PNG',
                'assets/images/projects/project_4/6.PNG'
            ],
            tags: ['CAD Proficiency', 'Industrial', 'Conceptual'],
            problem: 'Mechanical design portfolios require demonstration of versatile CAD proficiency across industrial, consumer, and conceptual domains, spanning fluid power systems, thermal management, and complex geometric forms.',
            solution: 'Curated collection of seven parametric SolidWorks projects: industrial shell-and-tube heat exchanger, centrifugal pump, solar thermal parabolic trough, bottle cap, smartphone casing, sculptural table, and mathematical Mobius ring.',
            howTitle: 'Functions Developed',
            how: [
                'Fluid power generation (pump)',
                'Thermal energy transfer (exchanger)',
                'Solar radiation concentration (trough)',
                'Containment sealing (cap)',
                'Device protection (casing)',
                'Structural support (table)',
                'Kinetic mathematical demonstration (Mobius ring)'
            ],
            benefits: [
                'Versatility: Part modeling, assemblies, and structural design',
                'Manufacturing Focus: Injection molding, machining, and fabrication',
                'Technical Range: Industrial equipment to consumer goods',
                'Parametric Proficiency: Fully constrained sketches, design tables'
            ]
        },
        'project-5': {
            title: 'Medical Skin-Treatment Gas Wand (Controlled CO2 Flow System)',
            images: [],
            tags: ['Medical Device', 'High-Pressure CO2', 'ANSYS Two-Phase CFD', '316L Stainless Steel'],
            problemTitle: 'The Physics Problem to Solve',
            problemIcon: 'alert-triangle',
            problem: 'In dermatology, doctors use CO2 gas for advanced skin treatments. The gas comes stored in an 88-gram cartridge at 850 psi (about 25 times the pressure in a car tire). Two big physics challenges occur: first, safely tapping into that extreme pressure without explosive gas leaks; second, thermodynamics: when high-pressure gas expands rapidly, its temperature drops drastically (the Joule-Thomson effect), risking severe frostbite to the patient’s skin and freezing the doctor’s hand.',
            solutionTitle: 'How The Mechanism Solves It',
            solutionIcon: 'lightbulb',
            solution: [
                'Threaded Piercing Mechanism: Screwing the cartridge holder down fine threads provides the mechanical advantage needed to drive a hollow piercing needle through the metal cap, while a cold-resistant Viton O-ring seals all 850 psi without leaking.',
                'Pressure Step-Down & Expansion Chamber: Gas passes through a one-way check valve into an expansion chamber that drops the pressure safely and allows the expanding gas to stabilize and warm up before spraying.',
                'Spring-Loaded Trigger Lever: Doctors regulate the exact dosage using an ergonomic polymer trigger lever that automatically snaps shut via spring return the second it is released.',
                'Thermal-Barrier Grip: The high-pressure manifold is machined from surgical 316L stainless steel for burst protection, surrounded by an insulating rubber grip so freezing internal temperatures never conduct to the doctor’s fingers.'
            ],
            howTitle: 'Computer Testing & Engineering',
            howIcon: 'settings',
            how: [
                'Two-Phase ANSYS CFD Simulation: Modeled the liquid-to-vapor phase change and choked flow (gas reaching sonic speed / Mach 1) at the micro-orifice to predict temperature drops and prevent dry-ice crystal formation',
                'Burst-Proof 316L Stainless Steel: Engineered the internal pressure chamber walls to comfortably exceed medical safety factors against deformation or rupturing at 850+ psi',
                'Frostbite Prevention: Designed expansion geometry to maintain safe therapeutic delivery temperatures at the skin contact nozzle',
                'Thermal Isolation DFM: Kept freezing metal surfaces isolated from the outer grip using low-conductivity polymers and silicone rubber pads'
            ],
            benefitsTitle: 'Key Engineering Benefits',
            benefitsIcon: 'check-circle-2',
            benefits: [
                'Safe Skin Treatment: Converts an explosive 850 psi cartridge into a gentle, temperature-regulated therapeutic gas stream',
                'Zero-Leak Containment: Viton fluoropolymer seals remain resilient under cold temperatures and high pressures',
                'Ergonomic Hand Protection: Thermal barrier grip prevents hand numbness during long clinic sessions',
                'Hospital-Grade Reliability: 316L stainless steel structure meets strict medical durability and hygiene standards'
            ]
        },
        'project-6': {
            title: 'Mechanical Powder Dispenser (15g Single-Scoop Dispenser)',
            images: [],
            tags: ['Fitness & Consumer Goods', 'Gear Kinematics', 'Anti-Clog Design', 'SolidWorks'],
            problemTitle: 'The Problem to Solve',
            problemIcon: 'alert-triangle',
            problem: 'Protein powder is very fine and sticky. When you try to pour it from a small bottle, it clumps together like wet sand and blocks the hole. Even worse, tiny powder dust creeps into moving parts and causes buttons or sliders to get stuck and jam.',
            solutionTitle: 'How The Machine Solves It',
            solutionIcon: 'lightbulb',
            solution: [
                'Smart Gear Amplifier: Your thumb only needs to push the button 7 millimeters. Inside, clever gears multiply your push to slide a door 40 millimeters wide so a full 15-gram scoop drops out.',
                'Spring Return: As soon as you take your thumb off the button, a return spring instantly snaps the door closed so extra powder cannot spill out.',
                'Steep 55-Degree Cone Slide: The powder bowl inside is shaped with steep 55-degree walls so gravity pulls the powder straight down without getting stuck in corners.',
                'Mini Rubber Wiper: Mounted a tiny rubber wiper onto the sliding door, just like a car windshield wiper, to sweep stray powder dust off the tracks every time it moves.'
            ],
            howTitle: 'Testing & Materials',
            howIcon: 'settings',
            how: [
                'Computer Particle Testing: Used Altair EDEM software to simulate millions of tiny 0.01 mm powder grains pouring through the hole to ensure the scoop delivers in seconds',
                'Quiet Plastic Gears: Made the internal gears and sliders out of smooth plastic so the button glides easily and does not make noisy grinding sounds',
                'Tough Metal Body: Designed the outer shell from bent stainless steel sheet metal to keep it strong and durable when carried in a gym bag',
                'One-Handed Use: Everything works purely with mechanical springs and gears, with no batteries or charging cords needed'
            ],
            benefitsTitle: 'Cool Benefits',
            benefitsIcon: 'check-circle-2',
            benefits: [
                'Perfect Dose: Gives you an exact 15-gram scoop of powder every single time you push the button',
                'Zero Jams: The 55° cone and rubber wiper keep sticky powder moving freely without clogging',
                'Super Easy Push: A short, gentle 7 mm thumb push opens a large 40 mm door with no hard effort',
                '100% Battery-Free: Works anywhere, anytime using simple, reliable mechanical engineering'
            ]
        },
        'project-7': {
            title: 'Medical Fluid Delivery System',
            images: [],
            tags: ['Medical Technology', 'DFM/DFA', 'Subsystem Integration'],
            problemTitle: 'Industry',
            problemIcon: 'briefcase',
            problem: 'Medical Technology\n\nCurrently involved in the development of an integrated medical delivery system combining mechanical, fluidic, and electronic subsystems.',
            solutionTitle: 'Key Contributions',
            solutionIcon: 'award',
            solution: [
                'Designed multi-component mechanical assemblies integrating structural, fluidic, and electronic elements.',
                'Developed interfaces between mechanical components and electronic subsystems.',
                'Applied DFM/DFA principles to improve manufacturability and assembly efficiency.',
                'Optimized product aesthetics, mechanical functionality, and tolerance requirements through iterative design.',
                'Supported integration of pumps, sensors, connectors, and fluid delivery components.'
            ],
            howTitle: 'Challenges Managed',
            howIcon: 'alert-circle',
            how: [
                'Balancing product aesthetics, mechanical performance, tolerance requirements, and subsystem integration.',
                'Improved product design through iterative CAD development and engineering evaluation.'
            ],
            benefitsTitle: 'Tools Used',
            benefitsIcon: 'wrench',
            benefits: [
                'SolidWorks (3D Modeling, Assembly Design, Motion Analysis)'
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    if (modal) {
        const modalGallery = document.getElementById('modal-gallery');
        const modalTitle = document.getElementById('modal-title');
        const modalTags = document.getElementById('modal-tags');
        const modalProblemTitle = document.getElementById('modal-problem-title');
        const modalProblem = document.getElementById('modal-problem');
        const modalSolutionTitle = document.getElementById('modal-solution-title');
        const modalSolution = document.getElementById('modal-solution');
        const modalHowSection = document.getElementById('modal-how-section');
        const modalHowTitle = modalHowSection.querySelector('h3');
        const modalHow = document.getElementById('modal-how');
        const modalBenefitsTitle = document.getElementById('modal-benefits-title');
        const modalBenefits = document.getElementById('modal-benefits');
        const modalClose = document.getElementById('modal-close');

        // Lightbox Elements
        const lightbox = document.getElementById('lightbox-overlay');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        function openModal(projectId) {
            const data = projectData[projectId];
            if (!data) return;

            modalTitle.textContent = data.title;
            
            // Populate Gallery
            modalGallery.innerHTML = '';
            if (data.images && data.images.length > 0) {
                modalGallery.style.display = 'flex';
                data.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = data.title;
                    img.className = 'modal-gallery-img';
                    img.addEventListener('click', () => openLightbox(imgSrc));
                    modalGallery.appendChild(img);
                });
            } else {
                modalGallery.style.display = 'none';
            }

            // Populate Tags
            modalTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });

            // Populate Titles and Icons
            const problemIcon = data.problemIcon || 'alert-triangle';
            modalProblemTitle.innerHTML = `<i data-lucide="${problemIcon}"></i> ${data.problemTitle || 'Problem Statement'}`;

            const solutionIcon = data.solutionIcon || 'lightbulb';
            modalSolutionTitle.innerHTML = `<i data-lucide="${solutionIcon}"></i> ${data.solutionTitle || 'Engineering Solution'}`;

            const howIcon = data.howIcon || (projectId === 'flush-driven' ? 'settings' : 'cpu');
            modalHowTitle.innerHTML = `<i data-lucide="${howIcon}"></i> ${data.howTitle || 'Technical Implementation'}`;

            const benefitsIcon = data.benefitsIcon || 'check-circle-2';
            modalBenefitsTitle.innerHTML = `<i data-lucide="${benefitsIcon}"></i> ${data.benefitsTitle || 'Measurable Benefits'}`;

            // Populate Content
            modalProblem.style.whiteSpace = 'pre-line';
            modalProblem.textContent = data.problem;

            if (Array.isArray(data.solution)) {
                modalSolution.innerHTML = `<ul style="list-style-type: disc; padding-left: 1.5rem; font-size: 0.95rem; line-height: 1.8;">${data.solution.map(item => `<li style="margin-bottom: 0.5rem;">${item}</li>`).join('')}</ul>`;
            } else {
                modalSolution.style.whiteSpace = 'pre-line';
                modalSolution.textContent = data.solution;
            }
            
            // How It Works / Technical Details / Challenges Managed
            modalHow.innerHTML = '';
            data.how.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalHow.appendChild(li);
            });

            // Benefits / Tools Used
            modalBenefits.innerHTML = '';
            data.benefits.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalBenefits.appendChild(li);
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => modalGallery.scrollTo(0, 0), 10);
            lucide.createIcons();
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function openLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
        }

        // Event Listeners for Output Actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-go-deep')) {
                const projectId = e.target.getAttribute('data-project');
                openModal(projectId);
            }
        });

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightbox.classList.contains('active')) closeLightbox();
                else if (modal.classList.contains('active')) closeModal();
            }
        });
    }

    // =============================
    // BEFORE / AFTER SLIDER
    // =============================
    const baSlider = document.querySelector('.ba-slider');
    if (baSlider) {
        const baOverlay = document.querySelector('.ba-overlay');
        const baHandle = document.querySelector('.ba-handle');
        const baWrapper = document.querySelector('.ba-wrapper');
        const baOverlayImage = baOverlay.querySelector('img');
        
        function updateBAslider() {
            if (!baWrapper || !baOverlayImage) return;
            // Keep the overlay image width same as wrapper so it doesn't squish
            baOverlayImage.style.width = baWrapper.offsetWidth + 'px';
            
            const val = baSlider.value;
            baOverlay.style.width = val + '%';
            baHandle.style.left = val + '%';
        }
        
        baSlider.addEventListener('input', updateBAslider);
        window.addEventListener('resize', updateBAslider);
        // Initial call after images might have loaded
        setTimeout(updateBAslider, 100);
    }

    // =============================
    // PARALLAX BACKGROUNDS
    // =============================
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    if (parallaxContainers.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                parallaxContainers.forEach(container => {
                    const rect = container.getBoundingClientRect();
                    // Check if in viewport
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        // Calculate percentage of scroll through the element
                        const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        const bg = container.querySelector('.parallax-bg');
                        if (bg) {
                            // Move from -20% to 0% (or similar)
                            const yOffset = -20 + (scrolled * 20);
                            bg.style.transform = `translateY(${yOffset}%)`;
                        }
                    }
                });
            });
        });
    }
});
