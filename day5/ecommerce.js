let products = [];

const getStoredCartItems = () => {
    const raw = localStorage.getItem("cartItems");
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Invalid cartItems in localStorage", error);
        return [];
    }
};

const updateCartItem = (product, delta) => {
    const cartItems = getStoredCartItems();
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex >= 0) {
        cartItems[itemIndex].quantity += delta;
        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }
    } else if (delta > 0) {
        cartItems.push({
            id: product.id,
            image: product.thumbnail,
            title: product.title,
            price: product.price,
            quantity: delta,
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const getProductData = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        products = data.products;
        console.log(products);
    }catch (error) {
        console.error('Error fetching product data:', error);
    }
    products.map((product) => {
         const productContainer = document.getElementById('product-container');
const div = document.createElement('div');
div.className = 'product-card';

const image = document.createElement('img');
image.src = product.thumbnail;
image.alt = product.title;
image.style.width = product.dimensions.width+100 + 'px';

const title = document.createElement('h1');
title.textContent = product.title;

const price = document.createElement('h2');
price.textContent = product.price;

const decrementbtn = document.createElement('button');
decrementbtn.textContent = "-";

const incrementbtn = document.createElement('button');
incrementbtn.textContent = "+";

const span = document.createElement('span');
span.textContent = "Add to Cart";

div.appendChild(image);
div.appendChild(title);
div.appendChild(price);
div.appendChild(decrementbtn);
div.appendChild(span);
div.appendChild(incrementbtn);

productContainer.appendChild(div);
const existingItem = getStoredCartItems().find((item) => item.id === product.id);
let count = existingItem ? existingItem.quantity : 0;
if (count > 0) {
    span.textContent = count;
}

incrementbtn.addEventListener('click', () => {
    count++;
    span.textContent = count;
    updateCartItem(product, 1);

});

decrementbtn.addEventListener('click', () => {
    if (count > 0) {
        count--;
        updateCartItem(product, -1);
    }
    span.textContent =count;
});
    });
}
getProductData();