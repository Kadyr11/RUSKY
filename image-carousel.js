в/**
 * ImageCarousel - Advanced Image Carousel Component
 * Features: Infinite scroll, touch support, smooth animations, preview bubble with pointer
 */
class ImageCarousel {
    constructor(config = {}) {
        this.config = {
            container: config.container || '.carousel-container',
            slides: config.slides || [],
            autoplay: config.autoplay || false,
            autoplayDelay: config.autoplayDelay || 5000,
            infinite: config.infinite !== false, // true by default
            showPreview: config.showPreview !== false, // true by default
            showIndicators: config.showIndicators !== false, // true by default
            animationDuration: config.animationDuration || 400,
            ...config
        };

        this.currentIndex = 1; // Start with middle slide for smooth infinite scroll
        this.isTransitioning = false;
        this.autoplayTimer = null;

        this.init();
    }

    init() {
        this.createHTML();
        this.initElements();
        this.setupSlides();
        this.setupEventListeners();
        this.updateCarousel();
        
        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }

    createHTML() {
        const container = document.querySelector(this.config.container);
        if (!container) {
            console.error('Carousel container not found');
            return;
        }

        container.innerHTML = `
            <div class="carousel-main">
                <div class="carousel-track" data-carousel-track>
                    <!-- Slides will be dynamically generated -->
                </div>
                <div class="carousel-overlay"></div>
            </div>

            <!-- Navigation Buttons -->
            <div class="carousel-nav">
                <button class="nav-button" data-carousel-prev aria-label="Previous image">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="nav-button" data-carousel-next aria-label="Next image">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>

            ${this.config.showPreview ? `
            <!-- Preview Container -->
            <div class="preview-container">
                <div class="preview-bubble">
                    <img class="preview-image" data-preview-image src="" alt="Preview">
                </div>
                <div class="preview-pointer" data-preview-pointer></div>
                ${this.config.showIndicators ? `
                <div class="progress-indicators" data-progress-indicators>
                    <!-- Progress bars will be dynamically generated -->
                </div>
                ` : ''}
            </div>
            ` : ''}
        `;

        this.addStyles();
    }

    addStyles() {
        if (document.getElementById('carousel-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'carousel-styles';
        styles.textContent = `
            .carousel-container {
                position: relative;
                width: 100%;
                height: 65vh;
                min-height: 400px;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                background: #0a0a0a;
            }

            .carousel-main {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .carousel-track {
                display: flex;
                height: 100%;
                transition: transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .carousel-slide {
                flex-shrink: 0;
                width: 100%;
                height: 100%;
                position: relative;
            }

            .carousel-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: brightness(0.8) contrast(1.1);
            }

            .carousel-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to bottom, 
                    rgba(0,0,0,0.2) 0%, 
                    rgba(0,0,0,0.4) 70%, 
                    rgba(0,0,0,0.9) 100%
                );
                pointer-events: none;
            }

            /* Navigation Buttons */
            .carousel-nav {
                position: absolute;
                bottom: 30px;
                left: 80px;
                display: flex;
                gap: 16px;
                z-index: 10;
            }

            .nav-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(255, 255, 255, 0.3);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all ${this.config.animationDuration}ms ease;
                backdrop-filter: blur(10px);
            }

            .nav-button:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.5);
                transform: scale(1.05);
            }

            .nav-button:active {
                transform: scale(0.95);
            }

            .nav-button svg {
                width: 24px;
                height: 24px;
            }

            /* Preview Container */
            .preview-container {
                position: absolute;
                bottom: 30px;
                right: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                z-index: 10;
            }

            .preview-bubble {
                position: relative;
                width: 80px;
                height: 60px;
                border: 3px solid rgba(255, 255, 255, 0.95);
                border-radius: 12px;
                overflow: hidden;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(8px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                transition: all ${this.config.animationDuration}ms ease;
            }

            .preview-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: brightness(0.9);
                transition: opacity ${this.config.animationDuration}ms ease;
            }

            .preview-pointer {
                position: absolute;
                top: 80px;
                left: 50%;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid rgba(255, 255, 255, 0.95);
                transform: translateX(-50%);
                transition: transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                z-index: 12;
            }

            /* Progress Indicators */
            .progress-indicators {
                display: flex;
                gap: 8px;
            }

            .progress-bar {
                width: 40px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                cursor: pointer;
                transition: all ${this.config.animationDuration}ms ease;
            }

            .progress-bar.active {
                background: rgba(255, 255, 255, 0.95);
                box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
            }

            .progress-bar:hover:not(.active) {
                background: rgba(255, 255, 255, 0.5);
            }

            /* Mobile Responsive */
            @media (max-width: 768px) {
                .carousel-container {
                    height: 50vh;
                    border-radius: 12px;
                }

                .carousel-nav {
                    bottom: 20px;
                    left: 20px;
                    gap: 12px;
                }

                .nav-button {
                    width: 44px;
                    height: 44px;
                }

                .nav-button svg {
                    width: 20px;
                    height: 20px;
                }

                .preview-container {
                    bottom: 20px;
                    right: 20px;
                    gap: 15px;
                }

                .preview-bubble {
                    width: 60px;
                    height: 45px;
                    border: 2px solid rgba(255, 255, 255, 0.95);
                    border-radius: 8px;
                }

                .preview-pointer {
                    top: 60px;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid rgba(255, 255, 255, 0.95);
                }

                .progress-bar {
                    width: 30px;
                    height: 3px;
                }

                .progress-indicators {
                    gap: 6px;
                }
            }

            /* Animation Classes */
            .fade-in {
                animation: carouselFadeIn ${this.config.animationDuration}ms ease-in-out;
            }

            @keyframes carouselFadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(styles);
    }

    initElements() {
        this.track = document.querySelector('[data-carousel-track]');
        this.previewImage = document.querySelector('[data-preview-image]');
        this.previewPointer = document.querySelector('[data-preview-pointer]');
        this.progressContainer = document.querySelector('[data-progress-indicators]');
        this.prevBtn = document.querySelector('[data-carousel-prev]');
        this.nextBtn = document.querySelector('[data-carousel-next]');
    }

    setupSlides() {
        if (!this.config.slides.length) {
            console.warn('No slides provided to carousel');
            return;
        }

        let slidesToRender = [...this.config.slides];

        // For infinite scroll, create loop: [last, ...slides, first]
        if (this.config.infinite && this.config.slides.length > 1) {
            slidesToRender = [
                this.config.slides[this.config.slides.length - 1],
                ...this.config.slides,
                this.config.slides[0]
            ];
            this.track.style.width = `${slidesToRender.length * 100}%`;
        } else {
            this.currentIndex = 0;
            this.track.style.width = `${slidesToRender.length * 100}%`;
        }

        // Generate slide HTML
        this.track.innerHTML = slidesToRender.map(slide => `
            <div class="carousel-slide">
                <img class="carousel-image" src="${slide.src}" alt="${slide.alt}">
            </div>
        `).join('');

        // Generate progress indicators
        if (this.progressContainer) {
            this.progressContainer.innerHTML = this.config.slides.map((_, index) => `
                <div class="progress-bar" data-index="${index}"></div>
            `).join('');
            this.progressBars = this.progressContainer.querySelectorAll('.progress-bar');
        }
    }

    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.goToPrevious());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goToNext());

        // Progress bar clicks
        if (this.progressBars) {
            this.progressBars.forEach((bar, index) => {
                bar.addEventListener('click', () => this.goToSlide(index));
            });
        }

        // Handle transition end for infinite scroll
        if (this.config.infinite) {
            this.track.addEventListener('transitionend', () => {
                this.handleInfiniteScroll();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.goToPrevious();
            if (e.key === 'ArrowRight') this.goToNext();
        });

        // Touch/swipe support
        this.setupTouchEvents();

        // Pause autoplay on hover
        if (this.config.autoplay) {
            const container = document.querySelector(this.config.container);
            container.addEventListener('mouseenter', () => this.pauseAutoplay());
            container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            if (this.config.autoplay) this.pauseAutoplay();
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
        });

        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diffX = startX - currentX;
            const threshold = 50;

            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.goToNext();
                } else {
                    this.goToPrevious();
                }
            }

            if (this.config.autoplay) this.startAutoplay();
        });
    }

    goToNext() {
        if (this.isTransitioning) return;
        
        if (this.config.infinite) {
            this.currentIndex++;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.config.slides.length;
        }
        
        this.updateCarousel();
    }

    goToPrevious() {
        if (this.isTransitioning) return;
        
        if (this.config.infinite) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.currentIndex === 0 ? this.config.slides.length - 1 : this.currentIndex - 1;
        }
        
        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isTransitioning) return;
        
        if (this.config.infinite) {
            this.currentIndex = index + 1; // +1 because of the prepended slide
        } else {
            this.currentIndex = index;
        }
        
        this.updateCarousel();
    }

    updateCarousel() {
        this.isTransitioning = true;

        // Update main carousel position
        const slideWidth = 100 / (this.config.infinite ? this.config.slides.length + 2 : this.config.slides.length);
        const translateX = -this.currentIndex * slideWidth;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update preview image and indicators
        if (this.config.showPreview) {
            this.updatePreview();
        }
        
        if (this.config.showIndicators) {
            this.updateProgressIndicators();
            this.updatePreviewPointer();
        }

        // Trigger custom event
        this.triggerEvent('slide-change', { index: this.getRealIndex() });
    }

    updatePreview() {
        if (!this.previewImage) return;
        
        const realIndex = this.getRealIndex();
        const nextIndex = (realIndex + 1) % this.config.slides.length;
        
        this.previewImage.style.opacity = '0';
        
        setTimeout(() => {
            this.previewImage.src = this.config.slides[nextIndex].src;
            this.previewImage.alt = this.config.slides[nextIndex].alt;
            this.previewImage.style.opacity = '1';
        }, this.config.animationDuration / 2);
    }

    updateProgressIndicators() {
        if (!this.progressBars) return;
        
        const realIndex = this.getRealIndex();
        this.progressBars.forEach((bar, index) => {
            bar.classList.toggle('active', index === realIndex);
        });
    }

    updatePreviewPointer() {
        if (!this.previewPointer) return;
        
        const realIndex = this.getRealIndex();
        const isMobile = window.innerWidth <= 768;
        const barWidth = isMobile ? 30 : 40;
        const gap = isMobile ? 6 : 8;
        
        const totalWidth = this.config.slides.length * barWidth + (this.config.slides.length - 1) * gap;
        const centerOffset = -totalWidth / 2 + barWidth / 2;
        const activeOffset = centerOffset + realIndex * (barWidth + gap);
        
        this.previewPointer.style.transform = `translateX(calc(-50% + ${activeOffset}px))`;
    }

    handleInfiniteScroll() {
        if (!this.config.infinite) {
            this.isTransitioning = false;
            return;
        }

        this.isTransitioning = false;

        // Reset position for infinite scroll
        if (this.currentIndex === 0) {
            this.currentIndex = this.config.slides.length;
            this.track.style.transition = 'none';
            const slideWidth = 100 / (this.config.slides.length + 2);
            this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}%)`;
            setTimeout(() => {
                this.track.style.transition = `transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            }, 50);
        } else if (this.currentIndex === this.config.slides.length + 1) {
            this.currentIndex = 1;
            this.track.style.transition = 'none';
            const slideWidth = 100 / (this.config.slides.length + 2);
            this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}%)`;
            setTimeout(() => {
                this.track.style.transition = `transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            }, 50);
        }
    }

    getRealIndex() {
        if (!this.config.infinite) return this.currentIndex;
        
        if (this.currentIndex === 0) return this.config.slides.length - 1;
        if (this.currentIndex === this.config.slides.length + 1) return 0;
        return this.currentIndex - 1;
    }

    startAutoplay() {
        if (!this.config.autoplay || this.autoplayTimer) return;
        
        this.autoplayTimer = setInterval(() => {
            this.goToNext();
        }, this.config.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    triggerEvent(eventName, detail) {
        const container = document.querySelector(this.config.container);
        if (container) {
            container.dispatchEvent(new CustomEvent(eventName, { detail }));
        }
    }

    // Public API methods
    next() { this.goToNext(); }
    previous() { this.goToPrevious(); }
    goto(index) { this.goToSlide(index); }
    getCurrentIndex() { return this.getRealIndex(); }
    play() { this.startAutoplay(); }
    pause() { this.pauseAutoplay(); }
    
    destroy() {
        this.pauseAutoplay();
        const container = document.querySelector(this.config.container);
        if (container) {
            container.innerHTML = '';
        }
        const styles = document.getElementById('carousel-styles');
        if (styles) {
            styles.remove();
        }
    }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageCarousel;
}

// AMD support
if (typeof define === 'function' && define.amd) {
    define([], function() {
        return ImageCarousel;
    });
}

// Global export
if (typeof window !== 'undefined') {
    window.ImageCarousel = ImageCarousel;
}