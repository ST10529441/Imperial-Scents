const sections = document.querySelectorAll("section[data-category]");
const searchBox = document.getElementById("search-box");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const sortBy = document.getElementById("sort-by");
const clearButton = document.getElementById("clear-filters");
const resultCount = document.getElementById("result-count");
const noResults = document.getElementById("no-results");
 
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
 
//Things the page remembers
let visibleProducts = [];   // the products on screen right now (the lightbox uses this list)
let lightboxIndex = 0;       // which product the lightbox is showing
let lastClicked = null;      // the image button that opened the lightbox
 
 
// BUILD THE PRODUCT CARDS

// Makes user/data text safe to put inside HTML
function safe(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
 
// "Wild Elixir 40ml" (the size is left out when there is none)
function fullName(p) {
    return p.name + (p.size ? " " + p.size : "");
}
 
// "Images/" + the file name (encodeURIComponent makes names like "Satin Oud.jpg" safe)
function imagePath(p) {
    return "Images/" + encodeURIComponent(p.image);
}
 
// Returns the HTML for one product card
function makeCard(p) {
    const title = p.name + (p.size ? " - " + p.size : "") + " - R" + p.price;
 
    return '<article class="product-card">' +
        "<h4>" + safe(title) + "</h4>" +
        '<button type="button" class="zoom-btn" data-id="' + p.id + '" aria-label="View a larger image of ' + safe(fullName(p)) + '">' +
            '<img src="' + imagePath(p) + '" alt="' + safe(fullName(p)) + '" width="200" height="200" loading="lazy">' +
        "</button>" +
        "<p>" + safe(p.description) + "</p>" +
        '<div class="cart-toggle">' +
            (p.stock > 0
                ? '<button type="button" class="cart-btn add-to-cart" data-id="' + p.id + '">ADD TO CART</button>'
                : '<button type="button" class="cart-btn" disabled>OUT OF STOCK</button>') +
        "</div>" +
    "</article>";
}
 
 
// SEARCH, FILTER AND SORT
  
 
// Returns the products that match the search/filters, in the chosen order
function getMatchingProducts() {
    const text = searchBox.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const price = priceFilter.value;
 
    const list = PRODUCTS.filter(function (p) {
        // Search the name, size and description (so "vanilla" or "oud" works)
        const matchesText = (p.name + " " + p.size + " " + p.description).toLowerCase().includes(text);
 
        const matchesCategory = category === "all" || p.category === category;
 
        let matchesPrice = true;
        if (price !== "all") {
            const range = price.split("-");          // "0-200" becomes ["0", "200"]
            matchesPrice = p.price >= Number(range[0]) && p.price <= Number(range[1]);
        }
 
        return matchesText && matchesCategory && matchesPrice;
    });
 
    // Sort
    if (sortBy.value === "name") {
        list.sort(function (a, b) { return a.name.localeCompare(b.name) || a.price - b.price; });
    } else if (sortBy.value === "price-low") {
        list.sort(function (a, b) { return a.price - b.price; });
    } else if (sortBy.value === "price-high") {
        list.sort(function (a, b) { return b.price - a.price; });
    }
 
    return list;
}
 
// Draws the cards into the Men's / Women's / Unisex sections
function showProducts() {
    const list = getMatchingProducts();
    visibleProducts = [];
 
    sections.forEach(function (section) {
        const inThisSection = list.filter(function (p) {
            return p.category === section.dataset.category;
        });
 
        section.querySelector(".grid").innerHTML = inThisSection.map(makeCard).join("");
        section.hidden = inThisSection.length === 0;      // hide a section with nothing in it
        visibleProducts = visibleProducts.concat(inThisSection);
    });
 
    resultCount.textContent = "Showing " + list.length + " of " + PRODUCTS.length + " fragrances";
    noResults.hidden = list.length > 0;
}
 
// Update the page whenever the visitor types or changes a filter
searchBox.addEventListener("input", showProducts);
categoryFilter.addEventListener("change", showProducts);
priceFilter.addEventListener("change", showProducts);
sortBy.addEventListener("change", showProducts);
 
clearButton.addEventListener("click", function () {
    searchBox.value = "";
    categoryFilter.value = "all";
    priceFilter.value = "all";
    sortBy.value = "default";
    showProducts();
});
 
// LIGHTBOX
function openLightbox(index) {
    const p = visibleProducts[index];
    lightboxIndex = index;
    lightboxImage.src = imagePath(p);
    lightboxImage.alt = fullName(p);
    lightboxCaption.textContent = p.name + (p.size ? " - " + p.size : "") + " - R" + p.price;
    lightbox.hidden = false;
    document.getElementById("lightbox-close").focus();
}
 
function closeLightbox() {
    lightbox.hidden = true;
    if (lastClicked) lastClicked.focus();     // put the keyboard focus back where it was
}
 
// Move to the next or previous fragrance, looping round at the ends
function stepLightbox(step) {
    openLightbox((lightboxIndex + step + visibleProducts.length) % visibleProducts.length);
}
 
// Open the lightbox when a product image is clicked
document.addEventListener("click", function (event) {
    // "Add to Cart" button (addToCart is in main.js)
    const addButton = event.target.closest(".add-to-cart");
    if (addButton) {
        addToCart(PRODUCTS.find(function (p) { return p.id === addButton.dataset.id; }));
    }
 
    const zoomButton = event.target.closest(".zoom-btn");
    if (zoomButton) {
        lastClicked = zoomButton;
        const index = visibleProducts.findIndex(function (p) { return p.id === zoomButton.dataset.id; });
        openLightbox(index);
    }
 
    // Close when the X or the dark background is clicked
    if (event.target.id === "lightbox-close" || event.target === lightbox) closeLightbox();
});
 
document.getElementById("lightbox-prev").addEventListener("click", function () { stepLightbox(-1); });
document.getElementById("lightbox-next").addEventListener("click", function () { stepLightbox(1); });
 
// Keyboard: Esc closes, left/right arrows change image
document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") stepLightbox(1);
    if (event.key === "ArrowLeft") stepLightbox(-1);
});
 
 
// Show the products when the page loads
showProducts();
 