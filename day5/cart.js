const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

function toNumber(value) {
	const num = Number(value);
	return Number.isFinite(num) ? num : 0;
}

function formatCurrency(value) {
	return `$${value.toFixed(2)}`;
}

function getCartItems() {
	const rawCart = localStorage.getItem("cartItems");

	if (rawCart) {
		try {
			const parsed = JSON.parse(rawCart);
			if (Array.isArray(parsed)) {
				return parsed;
			}
		} catch (error) {
			console.error("Invalid cartItems in localStorage", error);
		}
	}

	// Backward compatibility with the old single-item storage keys.
	const image = localStorage.getItem("image");
	const title = localStorage.getItem("title");
	const price = localStorage.getItem("price");

	if (image && title && price) {
		return [{
			id: "legacy-item",
			image,
			title,
			price: toNumber(price),
			quantity: 1,
		}];
	}

	return [];
}

function renderCart() {
	const items = getCartItems();
	cartContainer.innerHTML = "";

	if (items.length === 0) {
		const emptyState = document.createElement("p");
		emptyState.textContent = "Your cart is empty.";
		cartContainer.appendChild(emptyState);
		cartTotal.textContent = formatCurrency(0);
		return;
	}

	let total = 0;

	items.forEach((item) => {
		const quantity = toNumber(item.quantity) || 1;
		const price = toNumber(item.price);
		const lineTotal = price * quantity;
		total += lineTotal;

		const row = document.createElement("div");
		row.className = "cart-item";

		const image = document.createElement("img");
		image.src = item.image;
		image.alt = item.title;
		image.width = 100;
		image.height = 100;

		const details = document.createElement("div");
		details.className = "cart-details";

		const title = document.createElement("h3");
		title.textContent = item.title;

		const qty = document.createElement("p");
		qty.textContent = `Quantity: ${quantity}`;

		const unitPrice = document.createElement("p");
		unitPrice.textContent = `Price: ${formatCurrency(price)}`;

		const subtotal = document.createElement("p");
		subtotal.textContent = `Subtotal: ${formatCurrency(lineTotal)}`;

		details.appendChild(title);
		details.appendChild(qty);
		details.appendChild(unitPrice);
		details.appendChild(subtotal);

		row.appendChild(image);
		row.appendChild(details);
		cartContainer.appendChild(row);
	});

	cartTotal.textContent = formatCurrency(total);
}

renderCart();