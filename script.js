document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    let cart = []; // Array to store cart items

    // Function to update the cart display and total
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear current cart display
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item-display');
                cartItemDiv.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)} $COL</span>
                    <button class="remove-item" data-index="${index}">X</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price;
            });
        }
        totalPriceSpan.textContent = `$${total.toFixed(2)} $COL`;
    }

    // Function to add a product to the cart
    function addProductToCart(productName, productPrice, productImage) {
        cart.push({ name: productName, price: productPrice });
        updateCartDisplay();

        // Optional: Fly to cart animation
        const cartSummaryRect = document.querySelector('.cart-summary').getBoundingClientRect();
        const imgRect = productImage.getBoundingClientRect();

        // Create a cloned image for the animation
        const flyingImg = productImage.cloneNode(true);
        flyingImg.style.position = 'fixed';
        flyingImg.style.zIndex = '1000';
        flyingImg.style.left = `${imgRect.left}px`;
        flyingImg.style.top = `${imgRect.top}px`;
        flyingImg.style.width = `${imgRect.width}px`;
        flyingImg.style.height = `${imgRect.height}px`;
        flyingImg.style.transition = 'all 0.8s ease-in-out'; // Animation duration
        flyingImg.style.opacity = '1';
        document.body.appendChild(flyingImg);

        // Animate the image
        setTimeout(() => {
            flyingImg.style.left = `${cartSummaryRect.left + (cartSummaryRect.width / 2) - (imgRect.width / 4)}px`;
            flyingImg.style.top = `${cartSummaryRect.top + 20}px`; // Adjust target position
            flyingImg.style.width = `${imgRect.width * 0.2}px`; // Shrink
            flyingImg.style.height = `${imgRect.height * 0.2}px`; // Shrink
            flyingImg.style.opacity = '0';
        }, 10); // Small delay to ensure initial position is set

        // Remove the flying image after animation
        setTimeout(() => {
            flyingImg.remove();
        }, 850); // Slightly longer than the animation duration
    }

    // Event listener for "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productItem = event.target.closest('.product-item');
            const productName = productItem.dataset.name;
            const productPrice = parseFloat(productItem.dataset.price);
            const productImage = productItem.querySelector('img'); // Get the image element

            addProductToCart(productName, productPrice, productImage);
        });
    });

    // Event listener for removing items from the cart (event delegation)
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const indexToRemove = parseInt(event.target.dataset.index);
            cart.splice(indexToRemove, 1); // Remove item from array
            updateCartDisplay(); // Update display
        }
    });

    // Initial cart display update
    updateCartDisplay();

    // Optional: Add hover animation for product images
    const productImages = document.querySelectorAll('.product-item img');
    productImages.forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });
});