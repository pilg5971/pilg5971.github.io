/* ------------------------- */
/*         Functions         */
/* ------------------------- */

// Move to Selected Slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

// Update Dot Colors
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

// Hide Invalid Buttons
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if(targetIndex === 0){
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if(targetIndex === slides.length - 1){
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}
/* ------------------------- */
/*         Variables         */
/* ------------------------- */

//Parents
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

//Buttons
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

//Slide Width
const slideWidth = slides[0].getBoundingClientRect().width;

/* ------------------------- */
/*       Format Slides       */
/* ------------------------- */
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

/* ------------------------- */
/*        Slide Moving       */
/* ------------------------- */

// Move Left
$(prevButton).on('click', (event) => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// Move Right
$(nextButton).on('click', (event) => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

/* ------------------------- */
/*        Dot Updating       */
/* ------------------------- */

// Move to Dot
$(dotsNav).on('click', (event) => {
  const targetDot = event.target.closest('button');

  // Stop if not selecting a Dot
  if(!targetDot) return;

  // Execute Code
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');

  // Return the index of the currenttly selected dot 
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  // Move Slides, Update Dot colors & Hide invalid arrows
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
