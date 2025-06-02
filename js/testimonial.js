const testimonials = [
    {
      name: "Anita P., Chicago",
      image: "images/fashion1.jpg",
      rating: 5,
      title: "Great styles and fast delivery!",
      review: "I’ve been shopping here for a few months now. Trendy options, affordable prices, and super quick shipping!"
    },
    {
      name: "Mark D., Los Angeles",
      image: "images/fashion2.jpg",
      rating: 5,
      title: "Absolutely love the quality!",
      review: "I ordered a linen shirt and it exceeded my expectations. The fabric feels premium and fits perfectly."
    },
    {
      name: "Sarah K., Miami",
      image: "images/fashion1.jpg",
      rating: 5,
      title: "Top-notch experience!",
      review: "Everything was seamless and enjoyable."
    },
    {
      name: "James T., Seattle",
      image: "images/fashion2.jpg",
      rating: 5,
      title: "Fast and stylish!",
      review: "Loved the collection and quick delivery."
    }
  ];

  function createTestimonialCard(testimonial) {
    return `
      <div class="col-md-6 mb-4">
        <div class="testimonial d-flex gap-3 align-items-center">
          <img src="${testimonial.image}" alt="${testimonial.name}">
          <div>
            <h5>"${testimonial.title}"</h5>
            <p class="text-warning">${'★'.repeat(testimonial.rating)}</p>
            <p>${testimonial.review}</p>
            <strong>— ${testimonial.name}</strong>
          </div>
        </div>
      </div>`;
  }

  function generateCarouselItems() {
    const container = document.getElementById('carousel-content');
    const indicators = document.getElementById('carousel-indicators');
    container.innerHTML = '';
    indicators.innerHTML = '';

    const isMobile = window.innerWidth < 768;
    const itemsPerSlide = isMobile ? 1 : 2;
    const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
      const start = i * itemsPerSlide;
      const currentTestimonials = testimonials.slice(start, start + itemsPerSlide);

      const activeClass = i === 0 ? 'active' : '';
      container.innerHTML += `
        <div class="carousel-item ${activeClass}">
          <div class="row justify-content-center">
            ${currentTestimonials.map(createTestimonialCard).join('')}
          </div>
        </div>`;

      indicators.innerHTML += `
        <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="${i}" class="${activeClass}" aria-current="${i === 0}" aria-label="Slide ${i + 1}"></button>`;
    }
  }

  // Generate on load
  window.addEventListener('load', generateCarouselItems);
  // Rebuild on resize
  window.addEventListener('resize', () => {
    generateCarouselItems();
  });