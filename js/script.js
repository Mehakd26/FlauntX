document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    updateCounts();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            addToCart(product);
        });
    });

    document.querySelectorAll(".wishlist-btn").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            toggleWishlist(product);
        });
    });

    function addToCart(product) {
        const id = product.getAttribute("data-id");
        const name = product.getAttribute("data-name");
        const price = product.getAttribute("data-price");
        const img = product.querySelector("img").src;

        if (!cart.some(item => item.id === id)) {
            cart.push({ id, name, price, img, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
            updateCounts();
        } else {
            alert(`${name} is already in the cart!`);
        }
    }

    function toggleWishlist(product) {
        const id = product.getAttribute("data-id");
        const name = product.getAttribute("data-name");
        const price = product.getAttribute("data-price");
        const img = product.querySelector("img").src;

        const index = wishlist.findIndex(item => item.id === id);
        if (index === -1) {
            wishlist.push({ id, name, price, img });
            alert(`${name} added to wishlist!`);
        } else {
            wishlist.splice(index, 1);
            alert(`${name} removed from wishlist.`);
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        updateCounts();
    }

    function updateCounts() {
        document.getElementById("cart-count").textContent = cart.length;
        document.getElementById("wishlist-count").textContent = wishlist.length;
    }
});

// Banner Slider Logic
let banners = document.querySelectorAll(".banner");
let currentBanner = 0;
let totalBanners = banners.length;

// Function to Display a Specific Banner
function showBanner(index) {
    banners.forEach((banner, i) => {
        banner.style.opacity = i === index ? "1" : "0";
    });
}

// Function to Show Next Banner
function nextBanner() {
    currentBanner = (currentBanner + 1) % totalBanners;
    showBanner(currentBanner);
}

// Function to Show Previous Banner
function prevBanner() {
    currentBanner = (currentBanner - 1 + totalBanners) % totalBanners;
    showBanner(currentBanner);
}

// Auto-slide every 3 seconds
setInterval(nextBanner, 3000);

// Ensure the first banner is active on page load
if (banners.length > 0) {
    showBanner(currentBanner);
}

// Manual navigation (check if buttons exist before adding event listeners)
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");

if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevBanner);
    nextBtn.addEventListener("click", nextBanner);
}

document.addEventListener("DOMContentLoaded", function () {
    const wishlistContainer = document.getElementById("wishlist-items");
    const clearWishlistBtn = document.getElementById("clear-wishlist");

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    function updateWishlistUI() {
        wishlistContainer.innerHTML = "";

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = '<p class="empty-msg">Your wishlist is empty.</p>';
        } else {
            wishlist.forEach((item) => {
                const listItem = document.createElement("div");
                listItem.classList.add("wishlist-item");
                listItem.innerHTML = `
                    <img src="${item.img}" alt="${item.name}" class="wishlist-img">
                    <span class="wishlist-name">${item.name} - ₹${item.price}</span>
                `;
                wishlistContainer.appendChild(listItem);
            });
        }
    }

    clearWishlistBtn.addEventListener("click", function () {
        localStorage.removeItem("wishlist");
        wishlist = [];
        updateWishlistUI();
    });

    updateWishlistUI();
});


document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const clearCartBtn = document.getElementById("clear-cart-btn");

    // Fetch cart items from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render cart items
    function renderCart() {
        cartContainer.innerHTML = ""; // Clear existing content

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-img">
                <div class="cart-details">
                    <p class="cart-name">${item.name} - ₹${item.price}</p>
                </div>
                <button class="remove-item-btn" data-index="${index}">✖</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        // Attach event listeners for "Remove Item" buttons
        document.querySelectorAll(".remove-item-btn").forEach(button => {
            button.addEventListener("click", removeItem);
        });
    }

    // Function to remove an item from cart
    function removeItem(event) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Re-render cart
    }

    // Function to clear the cart
    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
    });

    // Initial render
    renderCart();
});

function updateQuantity(button, change) {
    let quantityElement = button.parentElement.querySelector('.quantity');
    let priceElement = button.closest('.cart-item').querySelector('.item-price');
    let totalElement = button.closest('.cart-item').querySelector('.total-price');

    let quantity = parseInt(quantityElement.innerText);
    let price = parseFloat(priceElement.innerText);

    // Ensure quantity doesn't go below 1
    if (quantity + change >= 1) {
        quantity += change;
        quantityElement.innerText = quantity;
        totalElement.innerText = (quantity * price).toFixed(2);
    }

    updateCartTotal(); // Update final total price
}

function updateCartTotal() {
    let totalElements = document.querySelectorAll('.total-price');
    let grandTotal = 0;

    totalElements.forEach((element) => {
        grandTotal += parseFloat(element.innerText);
    });

    document.querySelector('.grand-total').innerText = grandTotal.toFixed(2);
}

