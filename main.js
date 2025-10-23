let cart = [];
let cartCount = 0;
let subtotal = 0;
const taxRate = 0.08;

const cartCountElement = document.querySelector('.cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.querySelector('.checkout-btn');


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    });
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    });});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) { e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
 if (target) {
target.scrollIntoView({
    behavior: 'smooth',
    block: 'start' }); } }); });

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');});});


document.querySelectorAll('.add-to-cart').forEach(button => {
button.addEventListener('click', function() {
    const name = this.getAttribute('data-name');
    const price = parseFloat(this.getAttribute('data-price'));
    addToCart(name, price);
    this.style.background = '#28a745';
    this.textContent = 'Added!';
    setTimeout(() => {this.style.background = '';this.textContent = 'Add to Cart';}, 1000); }); });

   
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('contactName') || document.getElementById('contactName').value;
    const email = formData.get('contactEmail') || document.getElementById('contactEmail').value;
    const subject = formData.get('contactSubject') || document.getElementById('contactSubject').value;
    const message = formData.get('contactMessage') || document.getElementById('contactMessage').value;
    
if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return; }
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);this.reset(); });


const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.');
        return;}

const customerName = document.getElementById('customerName').value;
const customerPhone = document.getElementById('customerPhone').value;
const customerEmail = document.getElementById('customerEmail').value;
const deliveryAddress = document.getElementById('deliveryAddress').value;
const orderType = document.getElementById('orderType').value;

if (!customerName || !customerPhone || !customerEmail || !orderType) {
alert('Please fill in all required fields.');
    return;}
 if (orderType === 'delivery' && !deliveryAddress) {
 alert('Please provide a delivery address.');
return;}

const total = calculateTotal();
alert(`Thank you, ${customerName}! Your order of Rs ${total.toFixed(2)} has been placed. You will receive a confirmation email shortly.`);

this.reset();
clearCart();});
window.addEventListener('scroll', function() {
 const navbar = document.querySelector('.navbar');
 if (window.scrollY > 100) {
navbar.style.background = 'rgba(0, 0, 0, 0.98)';
} else {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)'; } });
 loadCartFromStorage();});


function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
    saveCartToStorage();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    saveCartToStorage();
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

function updateCartDisplay() {
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = cartCount;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="item-details">
                    <h5>${item.name}</h5>
                    <span class="item-price">Rs ${item.price.toFixed(2)} each</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    subtotalElement.textContent = `Rs ${subtotal.toFixed(2)}`;
    taxElement.textContent = `Rs ${tax.toFixed(2)}`;
    totalElement.textContent = `Rs ${total.toFixed(2)}`;
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * taxRate;
    return subtotal + tax;
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
}

checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }
    document.getElementById('order').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    setTimeout(() => {
        document.getElementById('customerName').focus();
    }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="close-lightbox">&times;</button>
                </div>
            `;
document.body.appendChild(lightbox);
lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
                    document.body.removeChild(lightbox);}});
}); });});
    document.addEventListener("DOMContentLoaded", function () {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                  
                    if (filter === 'all' || filter === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    } });});});});

const lightboxCSS = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}
.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}
.lightbox-content img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}
.close-lightbox {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
}`;

const style = document.createElement('style');
style.textContent = lightboxCSS;
document.head.appendChild(style);


function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .special-item, .gallery-item, .info-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function validatePhone(phone) {
    const re = /^[\d\s\-\(\)\+]{10,}$/;
    return re.test(phone);
}
function searchMenu(query) {
    const menuItems = document.querySelectorAll('.menu-item');
    const lowercaseQuery = query.toLowerCase();
    menuItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent.toLowerCase();
        const itemDescription = item.querySelector('p').textContent.toLowerCase();
        item.style.display = (itemName.includes(lowercaseQuery) || itemDescription.includes(lowercaseQuery)) ? 'block' : 'none';
    });
}
function saveCartToStorage() {
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
}
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('bakeryCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}
