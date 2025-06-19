let likedCats = [];
let currentIndex = 0;
let catUrls = [];

async function fetchCats() {
  const imageStack = document.getElementById('image-stack');
  const summary = document.getElementById('summary');
  const retry = document.getElementById('retry');

  imageStack.innerHTML = '';
  summary.style.display = 'none';
  retry.style.display = 'none';
  likedCats = [];
  currentIndex = 0;
  catUrls = [];

  // Fetch 20 cat images
  for (let i = 0; i < 20; i++) {
    const res = await fetch('https://cataas.com/cat?json=true');
    const data = await res.json();
    catUrls.push('https://cataas.com/cat/' + data.id);
  }

  showNextCat();
}

function showNextCat() {
  const imageStack = document.getElementById('image-stack');
  imageStack.innerHTML = '';

  if (currentIndex >= catUrls.length) {
    showSummary();
    return;
  }

  const img = document.createElement('img');
  img.src = catUrls[currentIndex];
  img.className = 'swipe-cat';
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
    } else if (diff < -50) {
      img.style.transform = 'translateX(-150%)';
    } else {
      return;
    }

    setTimeout(() => {
      currentIndex++;
      showNextCat();
    }, 300);
  });
}

function showSummary() {
  const summary = document.getElementById('summary');
  const likedCount = document.getElementById('liked-count');
  const likedCatsDiv = document.getElementById('liked-cats');

  likedCount.textContent = `${likedCats.length} Cats Liked!`;
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

// Start on load
fetchCats();
