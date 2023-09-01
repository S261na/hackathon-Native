document.addEventListener('mousemove', e => {
	Object.assign(document.documentElement, {
		style: `
		--move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
		--move-y: ${(e.clientY - window.innerHeight / 2) * .01}deg;
		`
	})
})
function playMusic() {
    let audio = document.getElementById('background-music');
    audio.play();
}
function stopMusic() {
    let audio = document.getElementById('background-music');
    audio.pause();          // Останавливаем музыку
    audio.currentTime = 0;  // Сброс времени воспроизведения в начало
}
// ! filtering
let categoriesList = document.querySelector(".dropdown-menu");

async function addCategoryToDropdownMenu() {
  let res = await fetch(API);
  let data = await res.json();
  let categoriesSet = new Set();
  data.forEach((product) => {
    product.category.split(",").forEach((category) => {
      categoriesSet.add(category.trim());
    });
  });

  categoriesList.innerHTML =
    '<li><a class="dropdown-item" href="#">all</a></li>';
  let uniqueCategories = Array.from(categoriesSet).sort();
  uniqueCategories.forEach((category) => {
    categoriesList.innerHTML += `
      <li><a class="dropdown-item" href="#">${category}</a></li>
    `;
  });

  addClickEventOnDropdownItem();
}

function filterOnCategory(e) {
  let categoryText = e.target.innerText;
  if (categoryText === "all") {
    category = "";
  } else {
    category = categoryText;
  }
  render();
}

function addClickEventOnDropdownItem() {
  let categoryItems = document.querySelectorAll(".dropdown-item");
  categoryItems.forEach((item) =>
    item.addEventListener("click", filterOnCategory)
  );
}

addCategoryToDropdownMenu();

//! search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  search = searchInp.value;
  render();
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  search = searchInp.value.trim();
  render();
});
   
