let likedCats = [];
let currentIndex = 0;
let catUrls = [];

function fetchCats() {
  const loader = document.getElementById('loader');
  const imageStack = document.getElementById('image-stack');
  const summary = document.getElementById('summary');
  const retry = document.getElementById('retry');
  const feedback = document.getElementById('feedback');

  imageStack.innerHTML = '';
  summary.style.display = 'none';
  retry.style.display = 'none';
  feedback.textContent = '';
  loader.style.display = 'block';

  likedCats = [];
  currentIndex = 0;
  catUrls = [];

  // Simulate a loading delay and populate images
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      catUrls.push(`https://cataas.com/cat?timestamp=${Date.now()}-${i}`);
    }
    loader.style.display = 'none';
    showNextCat();
  }, 1000);
}

function showNextCat() {
  const imageStack = document.getElementById('image-stack');
  const feedback = document.getElementById('feedback');
  imageStack.innerHTML = '';
  feedback.textContent = '';

  if (currentIndex >= catUrls.length) {
    showSummary();
    return;
  }

  const img = document.createElement('img');
  img.src = catUrls[currentIndex];
  img.className = 'swipe-cat fade-in';
  imageStack.appendChild(img);

  let startX = 0;

  img.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  img.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50) {
      likedCats.push(catUrls[currentIndex]);
      img.style.transform = 'translateX(150%)';
      feedback.textContent = '❤️ Liked!';
    } else if (diff < -50) {
      img.style.transform = 'translateX(-150%)';
      feedback.textContent = '👋 Skipped!';
    } else {
      return;
    }

    setTimeout(() => {
      currentIndex++;
      showNextCat();
    }, 400);
  });
}

function showSummary() {
  const summary = document.getElementById('summary');
  const likedCount = document.getElementById('liked-count');
  const likedCatsDiv = document.getElementById('liked-cats');

  likedCount.textContent = `You liked ${likedCats.length} out of 20 cats!`;
  likedCatsDiv.innerHTML = '';

  likedCats.forEach(cat => {
    const img = document.createElement('img');
    img.src = cat;
    likedCatsDiv.appendChild(img);
  });

  summary.style.display = 'block';
  document.getElementById('retry').style.display = 'inline-block';
}

document.getElementById('retry').addEventListener('click', fetchCats);
fetchCats();
