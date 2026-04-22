const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const basketToggle = document.querySelector(".basket-toggle");
const basketPanel = document.querySelector(".basket-panel");
const basketClose = document.querySelector(".basket-close");
const basketItems = document.querySelector("[data-basket-items]");
const basketCount = document.querySelector("[data-basket-count]");
const favoritesCount = document.querySelector("[data-favorites-count]");
const basketSubtotal = document.querySelector("[data-basket-subtotal]");
const basketShipping = document.querySelector("[data-basket-shipping]");
const basketTotal = document.querySelector("[data-basket-total]");
const checkoutItems = document.querySelector("[data-checkout-items]");
const checkoutSubtotal = document.querySelector("[data-checkout-subtotal]");
const checkoutShipping = document.querySelector("[data-checkout-shipping]");
const checkoutTotal = document.querySelector("[data-checkout-total]");
const checkoutForm = document.querySelector("[data-checkout-form]");
const checkoutMessage = document.querySelector("[data-checkout-message]");
const favoriteModal = document.querySelector("[data-favorite-modal]");
const favoriteProductName = document.querySelector("[data-favorite-product-name]");
const favoriteLoginForm = document.querySelector("[data-favorite-login-form]");
const favoritesLoginForm = document.querySelector("[data-favorites-login-form]");
const favoritesAuthCard = document.querySelector("[data-favorites-auth-card]");
const favoritesBoard = document.querySelector("[data-favorites-board]");
const favoritesGrid = document.querySelector("[data-favorites-grid]");
const favoritesEmpty = document.querySelector("[data-favorites-empty]");
const favoritesGreeting = document.querySelector("[data-favorites-greeting]");
const favoritesAccountNote = document.querySelector("[data-favorites-account-note]");
const favoritesSignoutButton = document.querySelector("[data-favorites-signout]");
const SHIPPING_COST = 7;
const FAVORITES_STORAGE_KEY = "nanasmama-favorites";
const FAVORITES_USER_STORAGE_KEY = "nanasmama-favorites-user";
const basket = new Map();
let pendingFavorite = null;

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

const readStoredList = (key) => {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
  }
};

const readStoredObject = (key) => {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

const writeStoredValue = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getFavorites = () => readStoredList(FAVORITES_STORAGE_KEY);

const renderFavoritesCount = () => {
  if (!favoritesCount) {
    return;
  }

  favoritesCount.textContent = String(getFavorites().length);
};

const getFavoriteUser = () => readStoredObject(FAVORITES_USER_STORAGE_KEY);

const saveFavoriteUser = (user) => {
  writeStoredValue(FAVORITES_USER_STORAGE_KEY, user);
};

const saveFavorites = (favorites) => {
  writeStoredValue(FAVORITES_STORAGE_KEY, favorites);
};

const getProductData = (card) => {
  const id = card.dataset.productId;
  const name = card.dataset.productName;
  const price = Number(card.dataset.productPrice);
  const image = card.querySelector("img")?.getAttribute("src") ?? "";
  const imageAlt = card.querySelector("img")?.getAttribute("alt") ?? name ?? "";
  const summary = card.querySelector(".product-summary")?.textContent?.trim() ?? "";

  if (!id || !name || Number.isNaN(price)) {
    return null;
  }

  return {
    id,
    name,
    price,
    image,
    imageAlt,
    summary
  };
};

const isFavorite = (productId) => getFavorites().some((item) => item.id === productId);

const syncFavoriteButtons = () => {
  document.querySelectorAll(".favorite-button").forEach((button) => {
    const card = button.closest(".product-card");
    const productId = card?.dataset.productId;
    const active = Boolean(productId) && isFavorite(productId);
    button.classList.toggle("is-active", active);
    button.textContent = active ? "♥" : "♡";
    if (productId && card?.dataset.productName) {
      const action = active ? "Saved in" : "Add";
      button.setAttribute("aria-label", `${action} ${card.dataset.productName} ${active ? "favorites" : "to favorites"}`);
    }
  });
};

const storeFavorite = (product) => {
  const favorites = getFavorites();
  if (!favorites.some((item) => item.id === product.id)) {
    favorites.unshift(product);
    saveFavorites(favorites);
  }
  renderFavoritesCount();
  syncFavoriteButtons();
};

const removeFavorite = (productId) => {
  const nextFavorites = getFavorites().filter((item) => item.id !== productId);
  saveFavorites(nextFavorites);
  renderFavoritesCount();
  syncFavoriteButtons();
  renderFavoritesPage();
};

const setFavoriteModalOpen = (isOpen) => {
  if (!favoriteModal) {
    return;
  }

  favoriteModal.hidden = !isOpen;
  document.body.classList.toggle("modal-open", isOpen);
};

const handleFavoriteIntent = (product) => {
  const currentUser = getFavoriteUser();
  if (currentUser) {
    storeFavorite(product);
    window.location.href = "./favorites.html";
    return;
  }

  pendingFavorite = product;
  if (favoriteProductName) {
    favoriteProductName.textContent = product.name;
  }
  setFavoriteModalOpen(true);
};

const renderFavoritesPage = () => {
  if (!favoritesGrid || !favoritesBoard || !favoritesAuthCard || !favoritesEmpty) {
    return;
  }

  const currentUser = getFavoriteUser();
  const favorites = getFavorites();
  const isSignedIn = Boolean(currentUser);

  favoritesAuthCard.hidden = isSignedIn;
  favoritesBoard.hidden = !isSignedIn;
  favoritesSignoutButton?.toggleAttribute("hidden", !isSignedIn);

  if (favoritesAccountNote) {
    favoritesAccountNote.innerHTML = isSignedIn
      ? `<p>Signed in as <strong>${currentUser.name}</strong> (${currentUser.email}). Your saved favorites stay available on this browser for easy return visits.</p>`
      : `<p>Your favorites list is saved to this browser after sign-in, making it easy to bring interested visitors back to the products they were considering.</p>`;
  }

  if (!isSignedIn) {
    return;
  }

  if (favoritesGreeting) {
    favoritesGreeting.textContent = currentUser?.name ? `${currentUser.name}'s favorites` : "Your favorites";
  }

  favoritesGrid.innerHTML = "";
  favoritesEmpty.hidden = favorites.length > 0;

  favorites.forEach((item) => {
    const card = document.createElement("article");
    card.className = "product-card saved-favorite-card";
    card.dataset.productId = item.id;
    card.dataset.productName = item.name;
    card.dataset.productPrice = String(item.price);
    card.innerHTML = `
      <button class="favorite-button is-active" type="button" aria-label="Saved in favorites">♥</button>
      <img src="${item.image}" alt="${item.imageAlt}">
      <div class="product-copy">
        <p class="product-brand">Nana's Mama</p>
        <h3>${item.name}</h3>
        <p class="product-summary">${item.summary || "Saved for later from the Nana's Mama product collection."}</p>
        <strong class="product-price">${formatMoney(item.price)}</strong>
        <div class="favorites-card-actions">
          <button class="button add-to-basket add-to-bag" type="button">Add to basket</button>
          <button class="favorite-remove" type="button" data-remove-favorite="${item.id}">Remove from favorites</button>
        </div>
      </div>
    `;
    favoritesGrid.appendChild(card);
  });

  syncFavoriteButtons();
};

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

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const addToBasketButton = target.closest(".add-to-basket");
  if (addToBasketButton instanceof HTMLElement) {
    const card = addToBasketButton.closest(".product-card");
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
    return;
  }

  const favoriteButton = target.closest(".favorite-button");
  if (favoriteButton instanceof HTMLElement) {
    const card = favoriteButton.closest(".product-card");
    if (!card) {
      return;
    }

    const product = getProductData(card);
    if (!product) {
      return;
    }

    if (window.location.pathname.endsWith("/favorites.html") || window.location.pathname.endsWith("favorites.html")) {
      removeFavorite(product.id);
      return;
    }

    handleFavoriteIntent(product);
    return;
  }

  const removeFavoriteButton = target.closest("[data-remove-favorite]");
  if (removeFavoriteButton instanceof HTMLElement) {
    const productId = removeFavoriteButton.getAttribute("data-remove-favorite");
    if (productId) {
      removeFavorite(productId);
    }
    return;
  }

  if (target.hasAttribute("data-favorite-close")) {
    setFavoriteModalOpen(false);
    pendingFavorite = null;
  }
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

if (favoriteLoginForm) {
  favoriteLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!pendingFavorite) {
      setFavoriteModalOpen(false);
      return;
    }

    const formData = new FormData(favoriteLoginForm);
    const user = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim()
    };

    if (!user.name || !user.email) {
      return;
    }

    saveFavoriteUser(user);
    storeFavorite(pendingFavorite);
    pendingFavorite = null;
    favoriteLoginForm.reset();
    setFavoriteModalOpen(false);
    window.location.href = "./favorites.html";
  });
}

if (favoritesLoginForm) {
  favoritesLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(favoritesLoginForm);
    const user = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim()
    };

    if (!user.name || !user.email) {
      return;
    }

    saveFavoriteUser(user);
    favoritesLoginForm.reset();
    renderFavoritesPage();
  });
}

if (favoritesSignoutButton) {
  favoritesSignoutButton.addEventListener("click", () => {
    window.localStorage.removeItem(FAVORITES_USER_STORAGE_KEY);
    renderFavoritesPage();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && favoriteModal && !favoriteModal.hidden) {
    setFavoriteModalOpen(false);
    pendingFavorite = null;
  }
});

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

document.querySelectorAll(".value-card, .product-card, .category-card, .story-media, .story-copy, .faq-item, .page-intro-panel, .section-note, .section-intro").forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});

renderBasket();
renderFavoritesCount();
syncFavoriteButtons();
renderFavoritesPage();
