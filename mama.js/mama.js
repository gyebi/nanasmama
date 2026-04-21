const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const basketToggle = document.querySelector(".basket-toggle");
const basketPanel = document.querySelector(".basket-panel");
const basketClose = document.querySelector(".basket-close");
const basketItems = document.querySelector("[data-basket-items]");
const basketCount = document.querySelector("[data-basket-count]");
const basketSubtotal = document.querySelector("[data-basket-subtotal]");
const basketShipping = document.querySelector("[data-basket-shipping]");
const basketTotal = document.querySelector("[data-basket-total]");
const checkoutItems = document.querySelector("[data-checkout-items]");
const checkoutSubtotal = document.querySelector("[data-checkout-subtotal]");
const checkoutShipping = document.querySelector("[data-checkout-shipping]");
const checkoutTotal = document.querySelector("[data-checkout-total]");
const checkoutForm = document.querySelector("[data-checkout-form]");
const checkoutMessage = document.querySelector("[data-checkout-message]");
const SHIPPING_COST = 7;
const basket = new Map();

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const formatMoney = (value) => `$${value.toFixed(2)}`;

const setBasketOpen = (isOpen) => {
  if (!basketPanel || !basketToggle) {
    return;
  }

  basketPanel.classList.toggle("is-open", isOpen);
  basketToggle.setAttribute("aria-expanded", String(isOpen));
};

if (basketToggle) {
  basketToggle.addEventListener("click", () => {
    const isOpen = basketPanel?.classList.contains("is-open");
    setBasketOpen(!isOpen);
  });
}

if (basketClose) {
  basketClose.addEventListener("click", () => {
    setBasketOpen(false);
  });
}

const getBasketTotals = () => {
  let itemCount = 0;
  let subtotal = 0;

  basket.forEach((item) => {
    itemCount += item.quantity;
    subtotal += item.price * item.quantity;
  });

  const shipping = itemCount > 0 ? SHIPPING_COST : 0;
  return {
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping
  };
};

const renderBasket = () => {
  if (!basketItems) {
    return;
  }

  basketItems.innerHTML = "";

  if (basket.size === 0) {
    basketItems.innerHTML = '<p class="basket-empty">Your basket is empty.</p>';
  } else {
    basket.forEach((item) => {
      const basketItem = document.createElement("article");
      basketItem.className = "basket-item";
      basketItem.innerHTML = `
        <div>
          <div class="basket-item-name">${item.name}</div>
          <div class="basket-item-price">${formatMoney(item.price)} each</div>
        </div>
        <div class="basket-item-controls">
          <button class="qty-button" type="button" data-action="decrease" data-product-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-button" type="button" data-action="increase" data-product-id="${item.id}">+</button>
          <button class="remove-item" type="button" data-action="remove" data-product-id="${item.id}">Remove</button>
        </div>
      `;
      basketItems.appendChild(basketItem);
    });
  }

  const totals = getBasketTotals();
  if (basketCount) {
    basketCount.textContent = String(totals.itemCount);
  }
  if (basketSubtotal) {
    basketSubtotal.textContent = formatMoney(totals.subtotal);
  }
  if (basketShipping) {
    basketShipping.textContent = formatMoney(totals.shipping);
  }
  if (basketTotal) {
    basketTotal.textContent = formatMoney(totals.total);
  }
  if (checkoutItems) {
    checkoutItems.textContent = String(totals.itemCount);
  }
  if (checkoutSubtotal) {
    checkoutSubtotal.textContent = formatMoney(totals.subtotal);
  }
  if (checkoutShipping) {
    checkoutShipping.textContent = formatMoney(totals.shipping);
  }
  if (checkoutTotal) {
    checkoutTotal.textContent = formatMoney(totals.total);
  }
};

document.querySelectorAll(".add-to-basket").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    if (!card) {
      return;
    }

    const id = card.dataset.productId;
    const name = card.dataset.productName;
    const price = Number(card.dataset.productPrice);

    if (!id || !name || Number.isNaN(price)) {
      return;
    }

    const existingItem = basket.get(id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      basket.set(id, { id, name, price, quantity: 1 });
    }

    renderBasket();
    setBasketOpen(true);
  });
});

if (basketItems) {
  basketItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const productId = target.dataset.productId;
    const action = target.dataset.action;
    if (!productId || !action || !basket.has(productId)) {
      return;
    }

    const item = basket.get(productId);
    if (!item) {
      return;
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        basket.delete(productId);
      }
    }

    if (action === "remove") {
      basket.delete(productId);
    }

    renderBasket();
  });
}

if (checkoutForm && checkoutMessage) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const totals = getBasketTotals();
    if (totals.itemCount === 0) {
      checkoutMessage.hidden = false;
      checkoutMessage.textContent = "Add at least one product to the basket before checking out.";
      return;
    }

    const formData = new FormData(checkoutForm);
    const customerName = formData.get("name");
    checkoutMessage.hidden = false;
    checkoutMessage.textContent = `Thanks${customerName ? `, ${customerName}` : ""}. Your demo order for ${totals.itemCount} item(s) has been placed for ${formatMoney(totals.total)}.`;
    checkoutForm.reset();
    basket.clear();
    renderBasket();
    setBasketOpen(false);
  });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const answer = item?.querySelector(".faq-answer");
    const expanded = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-question").forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
    });

    document.querySelectorAll(".faq-answer").forEach((otherAnswer) => {
      otherAnswer.hidden = true;
    });

    button.setAttribute("aria-expanded", String(!expanded));
    if (answer) {
      answer.hidden = expanded;
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".value-card, .product-card, .category-card, .story-media, .story-copy, .faq-item").forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});

renderBasket();
