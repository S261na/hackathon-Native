
function playMusic(audioId) {
    let audio = document.getElementById(audioId);
    audio.play();
}
function stopMusic(audioId) {
    let audio = document.getElementById(audioId);
    audio.pause();
    audio.currentTime = 0;
}
// pagination
async function getPagesCount() {
    let res = await fetch(PRODUCTS_API);
    let products = await res.json();
    let pagesCount = Math.ceil(products.length / 2);
    return pagesCount;
};

async function checkPages() {
    let maxPagesNum = await getPagesCount();
    if(currentPage === 1) {
        prevPageBtn.setAttribute('style', 'display: none;');
        nextPageBtn.setAttribute('style', 'display: block;');
    } else if(currentPage === maxPagesNum) {
        prevPageBtn.setAttribute('style', 'display: block;');
        nextPageBtn.setAttribute('style', 'display: none;');
    } else {
        prevPageBtn.setAttribute('style', 'display: block;');
        nextPageBtn.setAttribute('style', 'display: block;');
    };
};
checkPages();

prevPageBtn.addEventListener('click', () => {
    currentPage--;
    checkPages();
    render();
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    checkPages();
    render();
});

// search

let searchForm = document.querySelector('form');
let searchInp = document.querySelector('#search-inp');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    search = searchInp.value;
    render();
});
