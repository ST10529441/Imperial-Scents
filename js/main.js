const revealItems = document.querySelectorAll("main > section");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
// Only animate if the browser supports it and the visitor has not asked for less motion
if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");     // the CSS fades it in
                revealObserver.unobserve(entry.target);    // only animate once
            }
        });
    }, { rootMargin: "0px 0px -10% 0px" });
 
    revealItems.forEach(function (item) {
        item.classList.add("reveal");                     
        revealObserver.observe(item);
    });
}
 
 
// FAQ ACCORDION, This code turns each question into a button that opens and closes its answer.
   
 
const faqSection = document.getElementById("faq");
 
// Closes one answer
function closeAnswer(button) {
    button.setAttribute("aria-expanded", "false");
    document.getElementById(button.getAttribute("aria-controls")).hidden = true;
}
 
if (faqSection) {
    faqSection.querySelectorAll("article").forEach(function (item, index) {
        const heading = item.querySelector("h3");
        const answer = item.querySelector("p");
 
        // Build a button from the question text
        const button = document.createElement("button");
        button.type = "button";
        button.className = "faq-question";
        button.textContent = heading.textContent;
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "faq-answer-" + index);
 
        // Put the button inside the heading and hide the answer
        heading.textContent = "";
        heading.appendChild(button);
        answer.id = "faq-answer-" + index;
        answer.className = "faq-answer";
        answer.hidden = true;
 
        button.addEventListener("click", function () {
            const wasOpen = button.getAttribute("aria-expanded") === "true";
 
            // Close every answer, then open this one (unless it was already open)
            faqSection.querySelectorAll(".faq-question").forEach(closeAnswer);
            if (!wasOpen) {
                button.setAttribute("aria-expanded", "true");
                answer.hidden = false;
            }
        });
    });
}
 
 
//BACK TO TOP BUTTON
const topButton = document.createElement("button");
topButton.type = "button";
topButton.id = "back-to-top";
topButton.textContent = "\u2191 Top";
topButton.setAttribute("aria-label", "Back to top");
topButton.hidden = true;
document.body.appendChild(topButton);
 
// Show the button once the visitor has scrolled down a bit
window.addEventListener("scroll", function () {
    topButton.hidden = window.scrollY < 400;
});
 
topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
 
 
// SHOPPING CART
const CART_KEY = "imperialScentsCart";
const ORDER_EMAIL = "dhlaminijunior88@gmail.com";   // use the same address as BUSINESS_EMAIL in forms.js
const ORDER_WHATSAPP = "27691155174";              // country code + number, without the 0 or the 
const FREE_DELIVERY_LIMIT = 500;                   // free delivery over R500 (home page promotion)
 
let cartItems = loadCart();
 
 
// Reads the saved cart. If nothing valid is saved, the cart is empty.
function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        if (!Array.isArray(saved)) return [];
        return saved.filter(function (item) {
            return item && typeof item.id === "string" && Number.isFinite(item.price) &&
                Number.isInteger(item.qty) && item.qty > 0;
        });
    } catch (error) {
        return [];
    }
}
 
function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch (error) {
        // Storage is blocked: the cart still works until the page is closed
    }
}
 
// Small helpers 
 
function cartName(item) {
    return item.name + (item.size ? " " + item.size : "");
}
 
// Makes text safe to put inside HTML
function cartSafe(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
 
function cartCount() {
    return cartItems.reduce(function (total, item) { return total + item.qty; }, 0);
}
 
function cartSubtotal() {
    return cartItems.reduce(function (total, item) { return total + item.price * item.qty; }, 0);
}
 
// The text of the order that is sent by WhatsApp or email
function orderMessage(subtotal) {
    const lines = cartItems.map(function (item) {
        return item.qty + " x " + cartName(item) + " (R" + item.price + " each) = R" + (item.price * item.qty);
    });
    return "Hello Imperial Scents, I would like to order:\n\n" + lines.join("\n") +
        "\n\nSubtotal: R" + subtotal +
        "\n\nPlease confirm availability, delivery and payment. Thank you!";
}
 
 
// The "Cart (0)" button goes into the menu on every page
const cartButton = document.createElement("button");
cartButton.type = "button";
cartButton.className = "cart-link";
cartButton.setAttribute("aria-haspopup", "dialog");
(document.querySelector("nav") || document.body).appendChild(cartButton);
 
// The slide-out cart
const cartPanel = document.createElement("div");
cartPanel.id = "cart-panel";
cartPanel.setAttribute("role", "dialog");
cartPanel.setAttribute("aria-modal", "true");
cartPanel.setAttribute("aria-label", "Shopping cart");
cartPanel.hidden = true;
cartPanel.innerHTML =
    '<div class="cart-backdrop"></div>' +
    '<div class="cart-drawer">' +
        '<div class="cart-header">' +
            "<h2>Your Cart</h2>" +
            '<button type="button" id="cart-close" aria-label="Close cart">&times;</button>' +
        "</div>" +
        '<div id="cart-items"></div>' +
        '<div id="cart-footer" class="cart-footer">' +
            '<div class="cart-subtotal"><span>Subtotal</span><span id="cart-subtotal"></span></div>' +
            '<p id="cart-note" class="cart-note"></p>' +
            '<div class="cart-actions">' +
                '<a id="cart-whatsapp" class="btn" href="#" target="_blank" rel="noopener">Order on WhatsApp</a>' +
                '<a id="cart-email" class="btn btn-outline" href="#">Order by email</a>' +
                '<button type="button" id="cart-clear" class="btn btn-outline">Clear cart</button>' +
            "</div>" +
        "</div>" +
    "</div>";
document.body.appendChild(cartPanel);
 
const cartItemsBox = document.getElementById("cart-items");
const cartFooter = document.getElementById("cart-footer");
const cartNote = document.getElementById("cart-note");
const cartWhatsApp = document.getElementById("cart-whatsapp");
const cartEmail = document.getElementById("cart-email");
 
// A small message that appears at the bottom of the screen for a moment(Toast)
const cartToast = document.createElement("div");
cartToast.id = "cart-toast";
cartToast.setAttribute("role", "status");
cartToast.hidden = true;
document.body.appendChild(cartToast);
let toastTimer = null;
 
function showCartMessage(text) {
    cartToast.textContent = text;
    cartToast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { cartToast.hidden = true; }, 2500);
}
 
 
// Draw the cart
 
function renderCart() {
    cartButton.textContent = "Cart (" + cartCount() + ")";
 
    if (cartItems.length === 0) {
        cartItemsBox.innerHTML = '<p class="cart-empty">Your cart is empty. Add a fragrance to get started.</p>';
        cartFooter.hidden = true;
        return;
    }
 
    cartItemsBox.innerHTML = cartItems.map(function (item, index) {
        const name = cartSafe(cartName(item));
        return '<div class="cart-row">' +
            '<div class="cart-row-name">' + name + "</div>" +
            '<div class="cart-row-price">R' + item.price + " each</div>" +
            '<div class="cart-row-controls">' +
                '<button type="button" class="qty-btn" data-action="minus" data-index="' + index + '" aria-label="Decrease quantity of ' + name + '">&minus;</button>' +
                '<span class="qty-number">' + item.qty + "</span>" +
                '<button type="button" class="qty-btn" data-action="plus" data-index="' + index + '" aria-label="Increase quantity of ' + name + '">+</button>' +
                '<span class="cart-line-total">R' + (item.price * item.qty) + "</span>" +
                '<button type="button" class="remove-btn" data-action="remove" data-index="' + index + '" aria-label="Remove ' + name + ' from the cart">Remove</button>' +
            "</div>" +
        "</div>";
    }).join("");
 
    const subtotal = cartSubtotal();
    document.getElementById("cart-subtotal").textContent = "R" + subtotal;
    cartNote.textContent = subtotal >= FREE_DELIVERY_LIMIT
        ? "You qualify for free delivery."
        : "Add R" + (FREE_DELIVERY_LIMIT - subtotal) + " more to get free delivery.";
 
    // Put the order into the WhatsApp and email buttons
    const message = orderMessage(subtotal);
    cartWhatsApp.href = "https://wa.me/" + ORDER_WHATSAPP + "?text=" + encodeURIComponent(message);
    cartEmail.href = "mailto:" + ORDER_EMAIL + "?subject=" + encodeURIComponent("Order request") +
        "&body=" + encodeURIComponent(message);
    cartFooter.hidden = false;
}
 
 
// Adds one of a product (called by products.js)
function addToCart(product) {
    const label = cartName(product);
 
    if (product.stock < 1) {
        showCartMessage(label + " is out of stock.");
        return;
    }
 
    const existing = cartItems.find(function (item) { return item.id === product.id; });
 
    if (existing && existing.qty >= product.stock) {
        showCartMessage("Sorry, only " + product.stock + " of " + label + " in stock.");
        return;
    }
 
    if (existing) {
        existing.qty += 1;
        existing.stock = product.stock;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            size: product.size,
            price: product.price,
            stock: product.stock,
            qty: 1
        });
    }
 
    saveCart();
    renderCart();
    showCartMessage(label + " added to your cart.");
}
 
// Adds or removes one of an item that is already in the cart
function changeQuantity(index, change) {
    const item = cartItems[index];
    const newQty = item.qty + change;
 
    if (newQty > item.stock) {
        showCartMessage("Sorry, only " + item.stock + " of " + cartName(item) + " in stock.");
        return;
    }
 
    if (newQty < 1) {
        cartItems.splice(index, 1);
    } else {
        item.qty = newQty;
    }
    saveCart();
    renderCart();
}
 
// The + ; - and Remove buttons inside the cart
cartItemsBox.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
 
    const index = Number(button.dataset.index);
    const action = button.dataset.action;
 
    if (action === "plus") changeQuantity(index, 1);
    if (action === "minus") changeQuantity(index, -1);
    if (action === "remove") {
        cartItems.splice(index, 1);
        saveCart();
        renderCart();
    }
 
    // Keep the keyboard focus on the same kind of button after the cart is redrawn
    const sameButton = cartItemsBox.querySelector('button[data-action="' + action + '"][data-index="' + index + '"]');
    if (sameButton) sameButton.focus();
});
 
document.getElementById("cart-clear").addEventListener("click", function () {
    if (confirm("Remove everything from your cart?")) {
        cartItems = [];
        saveCart();
        renderCart();
    }
});
 
 
//  Open and close the cart
 
function openCart() {
    cartPanel.hidden = false;
    document.getElementById("cart-close").focus();
}
 
function closeCart() {
    cartPanel.hidden = true;
    cartButton.focus();
}
 
cartButton.addEventListener("click", openCart);
 
cartPanel.addEventListener("click", function (event) {
    if (event.target.id === "cart-close" || event.target.classList.contains("cart-backdrop")) closeCart();
});
 
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !cartPanel.hidden) closeCart();
});
 
// If the cart is changed in another tab, update this one too
window.addEventListener("storage", function (event) {
    if (event.key === CART_KEY) {
        cartItems = loadCart();
        renderCart();
    }
});
 
renderCart();