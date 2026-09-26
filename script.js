document.addEventListener('DOMContentLoaded', () => {
    // =================================================
    // 1. MENÚ MÓVIL (TOGGLE)
    // =================================================
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar.style.display === 'flex') {
                sidebar.style.display = 'none';
            } else {
                sidebar.style.display = 'flex';
                sidebar.style.position = 'fixed';
                sidebar.style.zIndex = '999';
                sidebar.style.width = '80%';
                sidebar.style.maxWidth = '300px';
                sidebar.style.height = '100vh';
                sidebar.style.top = '0';
                sidebar.style.left = '0';
                sidebar.style.boxShadow = '10px 0 30px rgba(0,0,0,0.15)';
            }
        });
    }

    // =================================================
    // 2. DATOS DE LOS PROYECTOS (Para el Modal)
    // =================================================
    const proyectosData = {
        "1": {
            title: "Identidad visual",
            category: "Proyecto académico",
            description: "Desarrollo completo de identidad visual corporativa. Este proyecto aborda desde la investigación conceptual, el diseño de logotipo, la paleta cromática hasta la bajada en papelería y soportes digitales. Enfocado en la coherencia comunicacional y la expresión de la marca.",
            tags: ["Identidad Visual", "Branding", "Tipografía", "Conceptualización"],
            pdfUrl: "#",
            images: [
                "images/proyecto-1.jpg",
                "images/proyecto-1.jpg", 
                "images/proyecto-1.jpg"
            ]
        },
        "2": {
            title: "Diseño editorial",
            category: "Proyecto personal",
            description: "Proyecto de maquetación y diseño editorial experimental. Se exploraron retículas complejas, jerarquías tipográficas y ritmo visual a lo largo de las páginas para crear una experiencia de lectura dinámica y estética.",
            tags: ["Diseño Editorial", "Retícula", "Tipografía", "Maquetación"],
            pdfUrl: "#",
            images: [
                "images/proyecto-2.jpg",
                "images/proyecto-2.jpg"
            ]
        },
        "3": {
            title: "Material gráfico",
            category: "Evento / Institucional",
            description: "Creación de piezas gráficas para difusión y ambientación de evento cultural. El sistema gráfico combina elementos tipográficos contundentes con una paleta de colores equilibrada que destaca en entornos físicos y digitales.",
            tags: ["Cartelería", "Gráfica Aplicada", "Cultura", "Sistemas Visuales"],
            pdfUrl: "#",
            images: [
                "images/proyecto-3.jpg",
                "images/proyecto-3.jpg"
            ]
        }
    };

    // =================================================
    // 3. LÓGICA DEL MODAL INTERACTIVO
    // =================================================
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const projectCards = document.querySelectorAll('.project-card[data-project]');
    
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalPdfLink = document.getElementById('modal-pdf-link');
    const modalImg = document.getElementById('modal-img');
    const modalThumbs = document.getElementById('modal-thumbs');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageCounter = document.getElementById('image-counter');

    let currentProjectImages = [];
    let currentImageIndex = 0;

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if(card.getAttribute('href')) return;
            
            e.preventDefault();
            const projectId = card.getAttribute('data-project');
            const data = proyectosData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalDesc.textContent = data.description;
                modalPdfLink.href = data.pdfUrl;

                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'modal-tag-chip';
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });

                currentProjectImages = data.images;
                currentImageIndex = 0;
                updateModalImage();

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    function updateModalImage() {
        if (currentProjectImages.length > 0) {
            modalImg.src = currentProjectImages[currentImageIndex];
            imageCounter.textContent = `0${currentImageIndex + 1} / 0${currentProjectImages.length}`;

            modalThumbs.innerHTML = '';
            currentProjectImages.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.className = `thumb-img ${index === currentImageIndex ? 'active' : ''}`;
                thumb.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateModalImage();
                });
                modalThumbs.appendChild(thumb);
            });
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
            updateModalImage();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
            updateModalImage();
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
