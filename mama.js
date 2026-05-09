const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const basketToggle = document.querySelector(".basket-toggle");
const basketPanel = document.querySelector(".basket-panel");
const basketClose = document.querySelector(".basket-close");
const basketItems = document.querySelector("[data-basket-items]");
const cartPageItems = document.querySelector("[data-cart-page-items]");
const cartPageSummary = document.querySelector("[data-cart-page-summary]");
const basketCount = document.querySelector("[data-basket-count]");
const favoritesCount = document.querySelector("[data-favorites-count]");
const basketSubtotal = document.querySelector("[data-basket-subtotal]");
const basketShipping = document.querySelector("[data-basket-shipping]");
const basketTotal = document.querySelector("[data-basket-total]");
const freeShippingMessage = document.querySelector("[data-free-shipping-message]");
const checkoutStartButton = document.querySelector("[data-checkout-start]");
const checkoutPanel = document.querySelector("[data-checkout-close]")?.closest(".checkout-panel");
const checkoutPanelClose = document.querySelector("[data-checkout-close]");
const shippingForm = document.querySelector("[data-shipping-form]");
const shippingMessage = document.querySelector("[data-shipping-message]");
const reviewPanel = document.querySelector("[data-review-items]")?.closest(".checkout-panel");
const reviewPanelClose = document.querySelector("[data-review-close]");
const reviewItems = document.querySelector("[data-review-items]");
const reviewShipping = document.querySelector("[data-review-shipping]");
const reviewSubtotal = document.querySelector("[data-review-subtotal]");
const reviewShippingCost = document.querySelector("[data-review-shipping-cost]");
const reviewTotal = document.querySelector("[data-review-total]");
const paymentStartButton = document.querySelector("[data-payment-start]");
const paymentMessage = document.querySelector("[data-payment-message]");
const contactBriefForm = document.querySelector("[data-contact-brief-form]");
const contactBriefMessage = document.querySelector("[data-contact-brief-message]");
const contactOrderSuccess = document.querySelector("[data-contact-order-success]");
const contactOrderReference = document.querySelector("[data-contact-order-reference]");
const contactDepositLink = document.querySelector("[data-contact-deposit-link]");
const previousPageLinks = document.querySelectorAll("[data-return-previous]");
const checkoutItems = document.querySelector("[data-checkout-items]");
const checkoutSubtotal = document.querySelector("[data-checkout-subtotal]");
const checkoutShipping = document.querySelector("[data-checkout-shipping]");
const checkoutTotal = document.querySelector("[data-checkout-total]");
const checkoutForm = document.querySelector("[data-checkout-form]");
const checkoutMessage = document.querySelector("[data-checkout-message]");
const favoritesAuthCard = document.querySelector("[data-favorites-auth-card]");
const favoritesBoard = document.querySelector("[data-favorites-board]");
const favoritesGrid = document.querySelector("[data-favorites-grid]");
const favoritesEmpty = document.querySelector("[data-favorites-empty]");
const favoritesGreeting = document.querySelector("[data-favorites-greeting]");
const workGalleryCards = document.querySelectorAll("[data-work-category]");
const workLightbox = document.querySelector("[data-work-lightbox]");
const workLightboxImage = document.querySelector("[data-work-lightbox-image]");
const workLightboxTitle = document.querySelector("[data-work-lightbox-title]");
const workLightboxCategory = document.querySelector("[data-work-lightbox-category]");
const workLightboxCount = document.querySelector("[data-work-lightbox-count]");
const collectionCarousel = document.querySelector("[data-collection-carousel]");
const collectionCarouselImage = document.querySelector("[data-collection-carousel-image]");
const collectionCarouselTitle = document.querySelector("[data-collection-carousel-title]");
const collectionCarouselCategory = document.querySelector("[data-collection-carousel-category]");
const collectionCarouselCaption = document.querySelector("[data-collection-carousel-caption]");
const collectionCarouselCount = document.querySelector("[data-collection-carousel-count]");
const collectionCarouselStrip = document.querySelector("[data-collection-carousel-strip]");
const upcomingEventCards = document.querySelectorAll("[data-upcoming-event]");
const upcomingEmpty = document.querySelector("[data-upcoming-empty]");
const cartOrderReferenceCard = document.querySelector("[data-cart-order-reference-card]");
const cartOrderReference = document.querySelector("[data-cart-order-reference]");
const SHIPPING_COST = 7;
const FREE_SHIPPING_THRESHOLD = 75;
const CONTACT_FUNCTION_URL = "/api/send-email";
const CUSTOM_PACKAGE_DEPOSIT_URL = "https://square.link/u/cHWh3RVb";
const GIFT_BRIEF_DEPOSIT_URL = "https://square.link/u/vBOFopQD";
const CONTACT_ERROR_MESSAGE = "Unable to send your message right now. Please email Nanasmamashea@gmail.com directly or try again in a moment.";
const CART_STORAGE_KEY = "nanasmama-cart";
const FAVORITES_STORAGE_KEY = "nanasmama-favorites";
const PREVIOUS_PAGE_STORAGE_KEY = "nanasmama-previous-page";
const basket = new Map();
let checkoutDetails = null;
let cartOrderReferenceValue = "";
let activeWorkGalleryIndex = 0;
let activeCollectionKey = "";
let activeCollectionImageIndex = 0;

const featuredCollections = {
  "self-care": {
    category: "Self-care",
    title: "Wellness Gift Sets",
    images: [
      {
        src: "./assets/gifts-home-page/gift-home-1-relaxing-shea.jpg",
        alt: "Relaxing Shea self-care gift product",
        caption: "Relaxing Shea for calm evening rituals and thoughtful care packages."
      },
      {
        src: "./assets/gifts-home-page/gift-home-2-shea-butter.jpg",
        alt: "Shea Butter self-care product",
        caption: "Organic Shea Butter as a simple, useful anchor for everyday wellness gifts."
      },
      {
        src: "./assets/gifts-home-page/gift-home-3-hair-shea.jpg",
        alt: "Hair Shea self-care product",
        caption: "Hair Shea for textured hair care, protective styles, and scalp comfort."
      },
      {
        src: "./assets/gifts-home-page/gift-home-4-clearing-lifestyle.jpg",
        alt: "Clearing Shea lifestyle product",
        caption: "Clearing Shea brings a focused skin-care option into the gift mix."
      },
      {
        src: "./assets/gifts-home-page/gift-home-5-black-soap.webp",
        alt: "African Black Soap self-care product",
        caption: "African Black Soap rounds out cleansing and moisture routines."
      },
      {
        src: "./assets/gifts-home-page/gift-home-6-hair-lifestyle.jpg",
        alt: "Hair care lifestyle self-care product",
        caption: "Lifestyle product shots help recipients imagine the full self-care routine."
      }
    ]
  },
  wedding: {
    category: "Wedding",
    title: "Wedding & Bridal Gifts",
    images: [
      {
        src: "./assets/custom-gifting/hero/pink-wedding-gift-hamper.jpg",
        alt: "Pink floral wedding gift hamper",
        caption: "A soft floral hamper direction for bridal parties and wedding thank-you gifts."
      },
      {
        src: "./assets/custom-gifting/collections/pink-floral-wedding-hamper.jpg",
        alt: "Pink floral wedding hamper collection",
        caption: "Curated wedding packaging with romantic colors and layered finishing."
      },
      {
        src: "./assets/custom-gifting/gallery/outdoor-pink-tulle-wide.jpg",
        alt: "Outdoor pink tulle wedding gift basket",
        caption: "Outdoor styling gives wedding gifts a bright, keepsake-ready look."
      },
      {
        src: "./assets/custom-gifting/gallery/pink-tulle-outdoor-detail.jpg",
        alt: "Pink tulle wedding gift detail",
        caption: "Close-up ribbon and tulle details make the presentation feel personal."
      },
      {
        src: "./assets/custom-gifting/hero/outdoor-butterfly-gift-box.jpg",
        alt: "Outdoor butterfly gift box",
        caption: "Butterfly accents add a graceful finish for special-occasion gifting."
      }
    ]
  },
  business: {
    category: "Business",
    title: "Client & Team Gifts",
    images: [
      {
        src: "./assets/custom-gifting/packaging/gold-butterfly-package-detail.jpg",
        alt: "Gold butterfly custom packaging detail",
        caption: "Brand-forward packaging details for events, clients, and campaign gifts."
      },
      {
        src: "./assets/custom-gifting/packaging/green-bow-butterfly-detail.jpg",
        alt: "Green bow custom packaging detail",
        caption: "Green ribbon and butterfly styling creates a refined client gift direction."
      },
      {
        src: "./assets/custom-gifting/packaging/wrapped-basket-tulle-detail.jpg",
        alt: "Wrapped custom gift basket with tulle",
        caption: "Wrapped baskets can support welcome boxes, event gifts, and team surprises."
      },
      {
        src: "./assets/custom-gifting/collections/yellow-bee-floral-basket.jpg",
        alt: "Yellow custom gifting basket",
        caption: "Bright custom baskets help business gifting feel warm rather than generic."
      },
      {
        src: "./assets/custom-gifting/source-sheets/batch-aa.jpg",
        alt: "Custom packaging batch reference sheet",
        caption: "Batch views show how larger custom orders can still feel consistent."
      },
      {
        src: "./assets/custom-gifting/source-sheets/batch-ad.jpg",
        alt: "Custom packaging source sheet",
        caption: "Reference sheets help plan a polished series of client or team gifts."
      }
    ]
  }
};

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

const setActiveNavigationLink = () => {
  if (!siteNav) {
    return;
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const currentHash = window.location.hash;

  siteNav.querySelectorAll("a[aria-current='page']").forEach((link) => {
    link.removeAttribute("aria-current");
  });

  let activeLink = null;
  siteNav.querySelectorAll("a[href]").forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) {
      return;
    }

    const linkPath = link.pathname.split("/").pop() || "index.html";
    const linkHash = link.hash;
    const isExactHashMatch = currentHash && linkHash && currentHash === linkHash && currentPath === linkPath;
    const isPageMatch = !activeLink && currentPath === linkPath && !linkHash;
    if (isExactHashMatch || isPageMatch) {
      activeLink = link;
    }
  });

  activeLink?.setAttribute("aria-current", "page");
};

setActiveNavigationLink();

const formatMoney = (value) => `$${value.toFixed(2)}`;

let cartToastTimeoutId = 0;

const showCartToast = (message) => {
  let toast = document.querySelector("[data-cart-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.setAttribute("data-cart-toast", "");
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(cartToastTimeoutId);
  cartToastTimeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
};

const generateOrderReference = () => {
  const now = new Date();
  const dateStamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("");
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NM-${dateStamp}-${randomPart}`;
};

const rememberCurrentPage = () => {
  try {
    const currentPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.localStorage.setItem(PREVIOUS_PAGE_STORAGE_KEY, currentPage || "/");
  } catch (error) {
    // Storage may be unavailable in private browsing; the fallback links still work.
  }
};

const setCartOrderReference = (reference) => {
  cartOrderReferenceValue = reference;
  if (cartOrderReference) {
    cartOrderReference.textContent = reference;
  }
  if (cartOrderReferenceCard) {
    cartOrderReferenceCard.hidden = false;
  }
};

const hidePastUpcomingEvents = () => {
  if (!upcomingEventCards.length) {
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let visibleCount = 0;

  upcomingEventCards.forEach((card) => {
    const eventDateValue = card.getAttribute("data-event-date");
    const eventDate = eventDateValue ? new Date(`${eventDateValue}T00:00:00`) : null;
    const isPast = eventDate instanceof Date && !Number.isNaN(eventDate.getTime()) && eventDate < today;

    card.toggleAttribute("hidden", isPast);
    if (!isPast) {
      visibleCount += 1;
    }
  });

  upcomingEmpty?.toggleAttribute("hidden", visibleCount > 0);
};

const readStoredList = (key) => {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
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

const saveFavorites = (favorites) => {
  writeStoredValue(FAVORITES_STORAGE_KEY, favorites);
};

const loadCart = () => {
  readStoredList(CART_STORAGE_KEY).forEach((item) => {
    if (item?.id && item?.name && Number.isFinite(Number(item.price)) && Number.isFinite(Number(item.quantity))) {
      basket.set(item.id, {
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Math.max(1, Number(item.quantity)),
        image: item.image ?? "",
        imageAlt: item.imageAlt ?? item.name
      });
    }
  });
};

const saveCart = () => {
  writeStoredValue(CART_STORAGE_KEY, Array.from(basket.values()));
};

const updateSquarePaymentButton = (card) => {
  const buyNowButton = card.querySelector("[data-buy-now]");
  if (!(buyNowButton instanceof HTMLElement)) {
    return;
  }

  const selectedVariant = card.querySelector("[data-product-variant].is-selected");
  if (!selectedVariant) {
    return;
  }

  const paymentLink = selectedVariant?.getAttribute("data-square-payment-link");
  if (paymentLink) {
    buyNowButton.textContent = "Buy Now";
    buyNowButton.setAttribute("data-square-payment-link", paymentLink);
  } else {
    buyNowButton.textContent = "Buy Now";
    buyNowButton.removeAttribute("data-square-payment-link");
  }
};

const getProductData = (card) => {
  const selectedVariant = card.querySelector("[data-product-variant].is-selected");
  const variantId = selectedVariant?.getAttribute("data-variant-id");
  const variantLabel = selectedVariant?.getAttribute("data-variant-label");
  const variantPrice = Number(selectedVariant?.getAttribute("data-variant-price"));
  const baseId = card.dataset.productId;
  const baseName = card.dataset.productName;
  const id = variantId ?? baseId;
  const name = variantLabel && baseName ? `${baseName} ${variantLabel}` : baseName;
  const price = Number.isNaN(variantPrice) ? Number(card.dataset.productPrice) : variantPrice;
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

const getProductQuantity = (card) => {
  const quantityValue = Number(card.querySelector("[data-quantity-value]")?.textContent);
  if (!Number.isFinite(quantityValue) || quantityValue < 1) {
    return 1;
  }
  return Math.min(quantityValue, 99);
};

const isFavorite = (productId) => getFavorites().some((item) => item.id === productId);

const syncFavoriteButtons = () => {
  document.querySelectorAll(".favorite-button").forEach((button) => {
    const card = button.closest(".product-card");
    const product = card ? getProductData(card) : null;
    const productId = product?.id;
    const active = Boolean(productId) && isFavorite(productId);
    button.classList.toggle("is-active", active);
    button.textContent = active ? "♥" : "♡";
    if (productId && product?.name) {
      const action = active ? "Saved in" : "Add";
      button.setAttribute("aria-label", `${action} ${product.name} ${active ? "favorites" : "to favorites"}`);
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

const setWorkLightboxOpen = (isOpen) => {
  if (!workLightbox) {
    return;
  }

  workLightbox.hidden = !isOpen;
  document.body.classList.toggle("modal-open", isOpen);
};

const setCollectionCarouselOpen = (isOpen) => {
  if (!collectionCarousel) {
    return;
  }

  collectionCarousel.hidden = !isOpen;
  document.body.classList.toggle("modal-open", isOpen);
};

const getVisibleWorkGalleryCards = () => Array.from(workGalleryCards).filter((card) => !card.hidden);

const getWorkGalleryCardDetails = (card) => {
  const image = card.querySelector("img");
  const title = card.querySelector("h3")?.textContent?.trim() || "Project detail";
  const category = card.querySelector("span")?.textContent?.trim() || "Project image";

  if (!image) {
    return null;
  }

  return {
    src: image.getAttribute("src") ?? "",
    alt: image.getAttribute("alt") ?? title,
    title,
    category
  };
};

const renderWorkLightboxImage = (index) => {
  const visibleCards = getVisibleWorkGalleryCards();

  if (!visibleCards.length || !workLightboxImage) {
    return;
  }

  activeWorkGalleryIndex = (index + visibleCards.length) % visibleCards.length;
  const details = getWorkGalleryCardDetails(visibleCards[activeWorkGalleryIndex]);

  if (!details) {
    return;
  }

  workLightboxImage.setAttribute("src", details.src);
  workLightboxImage.setAttribute("alt", details.alt);
  if (workLightboxTitle) {
    workLightboxTitle.textContent = details.title;
  }
  if (workLightboxCategory) {
    workLightboxCategory.textContent = details.category;
  }
  if (workLightboxCount) {
    workLightboxCount.textContent = `${activeWorkGalleryIndex + 1} of ${visibleCards.length}`;
  }
};

const showAdjacentWorkImage = (direction) => {
  if (!workLightbox || workLightbox.hidden) {
    return;
  }

  renderWorkLightboxImage(activeWorkGalleryIndex + direction);
};

const openWorkLightbox = (card) => {
  const visibleCards = getVisibleWorkGalleryCards();
  const cardIndex = visibleCards.indexOf(card);

  renderWorkLightboxImage(cardIndex >= 0 ? cardIndex : 0);
  setWorkLightboxOpen(true);
};

const renderCollectionCarousel = (index) => {
  const collection = featuredCollections[activeCollectionKey];

  if (!collection || !collection.images.length || !collectionCarouselImage) {
    return;
  }

  activeCollectionImageIndex = (index + collection.images.length) % collection.images.length;
  const image = collection.images[activeCollectionImageIndex];

  collectionCarouselImage.setAttribute("src", image.src);
  collectionCarouselImage.setAttribute("alt", image.alt);
  if (collectionCarouselTitle) {
    collectionCarouselTitle.textContent = collection.title;
  }
  if (collectionCarouselCategory) {
    collectionCarouselCategory.textContent = collection.category;
  }
  if (collectionCarouselCaption) {
    collectionCarouselCaption.textContent = image.caption;
  }
  if (collectionCarouselCount) {
    collectionCarouselCount.textContent = `${activeCollectionImageIndex + 1} of ${collection.images.length}`;
  }
  if (collectionCarouselStrip) {
    collectionCarouselStrip.innerHTML = collection.images.map((item, thumbIndex) => `
      <button class="collection-carousel-thumb${thumbIndex === activeCollectionImageIndex ? " is-active" : ""}" type="button" data-collection-carousel-thumb="${thumbIndex}" aria-label="Show ${item.alt}">
        <img src="${item.src}" alt="">
      </button>
    `).join("");
  }
};

const showAdjacentCollectionImage = (direction) => {
  if (!collectionCarousel || collectionCarousel.hidden) {
    return;
  }

  renderCollectionCarousel(activeCollectionImageIndex + direction);
};

const openCollectionCarousel = (collectionKey) => {
  if (!featuredCollections[collectionKey]) {
    return;
  }

  activeCollectionKey = collectionKey;
  renderCollectionCarousel(0);
  setCollectionCarouselOpen(true);
};

const handleFavoriteIntent = (product) => {
  if (isFavorite(product.id)) {
    removeFavorite(product.id);
    return;
  }

  storeFavorite(product);
};

const renderFavoritesPage = () => {
  if (!favoritesGrid || !favoritesBoard || !favoritesEmpty) {
    return;
  }

  const favorites = getFavorites();

  if (favoritesAuthCard) {
    favoritesAuthCard.hidden = true;
  }
  favoritesBoard.hidden = false;

  if (favoritesGreeting) {
    favoritesGreeting.textContent = "Your favorites";
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

  basketPanel.hidden = false;
  basketPanel.classList.toggle("is-open", isOpen);
  basketToggle.setAttribute("aria-expanded", String(isOpen));
  if (!isOpen) {
    window.setTimeout(() => {
      basketPanel.hidden = true;
    }, 200);
  }
};

const setCheckoutPanelOpen = (isOpen) => {
  if (!checkoutPanel) {
    return;
  }

  checkoutPanel.hidden = false;
  checkoutPanel.classList.toggle("is-open", isOpen);
  if (!isOpen) {
    window.setTimeout(() => {
      checkoutPanel.hidden = true;
    }, 250);
  }
};

const setReviewPanelOpen = (isOpen) => {
  if (!reviewPanel) {
    return;
  }

  reviewPanel.hidden = false;
  reviewPanel.classList.toggle("is-open", isOpen);
  if (!isOpen) {
    window.setTimeout(() => {
      reviewPanel.hidden = true;
    }, 250);
  }
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

  const shipping = itemCount > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  return {
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping
  };
};

const getBasketLineItems = () => Array.from(basket.values()).map((item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  quantity: item.quantity
}));

const getShippingDetailsFromForm = (form) => {
  const formData = new FormData(form);
  return {
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    street: String(formData.get("street") ?? "").trim(),
    apartment: String(formData.get("apartment") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    state: String(formData.get("state") ?? "").trim(),
    zip: String(formData.get("zip") ?? "").trim(),
    country: String(formData.get("country") ?? "United States").trim() || "United States",
    shippingMethod: String(formData.get("shippingMethod") ?? "standard"),
    paymentMethod: String(formData.get("paymentMethod") ?? "secure-card")
  };
};

const renderReviewPanel = () => {
  const totals = getBasketTotals();
  const lineItems = getBasketLineItems();

  if (reviewItems) {
    reviewItems.innerHTML = lineItems.map((item) => `
      <div class="review-line-item">
        <span>${item.quantity} x ${item.name}</span>
        <strong>${formatMoney(item.price * item.quantity)}</strong>
      </div>
    `).join("");
  }

  if (reviewShipping && checkoutDetails) {
    const apartment = checkoutDetails.apartment ? `${checkoutDetails.apartment}<br>` : "";
    const phone = checkoutDetails.phone ? `<br>${checkoutDetails.phone}` : "";
    reviewShipping.innerHTML = `
      <p><strong>${checkoutDetails.firstName} ${checkoutDetails.lastName}</strong><br>
      ${checkoutDetails.email}${phone}</p>
      <p>${checkoutDetails.street}<br>
      ${apartment}${checkoutDetails.city}, ${checkoutDetails.state} ${checkoutDetails.zip}<br>
      ${checkoutDetails.country}</p>
      <p>Standard Shipping</p>
    `;
  }

  if (reviewSubtotal) {
    reviewSubtotal.textContent = formatMoney(totals.subtotal);
  }
  if (reviewShippingCost) {
    reviewShippingCost.textContent = totals.itemCount > 0 && totals.shipping === 0 ? "Free" : formatMoney(totals.shipping);
  }
  if (reviewTotal) {
    reviewTotal.textContent = formatMoney(totals.total);
  }
};

const renderBasket = () => {
  if (basketItems) {
    basketItems.innerHTML = "";

    if (basket.size === 0) {
      const emptyLabel = basketPanel?.getAttribute("aria-label") === "Shopping cart"
        ? "Your cart is empty."
        : "Your basket is empty.";
      basketItems.innerHTML = `<p class="basket-empty">${emptyLabel}</p>`;
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
  }

  const totals = getBasketTotals();
  if (basketCount) {
    basketCount.textContent = String(totals.itemCount);
  }
  if (basketSubtotal) {
    basketSubtotal.textContent = formatMoney(totals.subtotal);
  }
  if (basketShipping) {
    basketShipping.textContent = totals.itemCount > 0 && totals.shipping === 0 ? "Free" : formatMoney(totals.shipping);
  }
  if (basketTotal) {
    basketTotal.textContent = formatMoney(totals.total);
  }
  if (freeShippingMessage) {
    if (totals.itemCount === 0) {
      freeShippingMessage.textContent = `Add ${formatMoney(FREE_SHIPPING_THRESHOLD)} for free shipping.`;
    } else if (totals.subtotal >= FREE_SHIPPING_THRESHOLD) {
      freeShippingMessage.textContent = "You unlocked free shipping.";
    } else {
      freeShippingMessage.textContent = `Add ${formatMoney(FREE_SHIPPING_THRESHOLD - totals.subtotal)} more for free shipping.`;
    }
  }
  if (checkoutStartButton instanceof HTMLButtonElement) {
    const isEmpty = totals.itemCount === 0;
    checkoutStartButton.disabled = isEmpty;
    checkoutStartButton.setAttribute("aria-disabled", String(isEmpty));
  } else if (checkoutStartButton instanceof HTMLAnchorElement) {
    const isEmpty = totals.itemCount === 0;
    checkoutStartButton.setAttribute("aria-disabled", String(isEmpty));
    checkoutStartButton.classList.toggle("is-disabled", isEmpty);
  }
  if (checkoutItems) {
    checkoutItems.textContent = String(totals.itemCount);
  }
  if (checkoutSubtotal) {
    checkoutSubtotal.textContent = formatMoney(totals.subtotal);
  }
  if (checkoutShipping) {
    checkoutShipping.textContent = totals.itemCount > 0 && totals.shipping === 0 ? "Free" : formatMoney(totals.shipping);
  }
  if (checkoutTotal) {
    checkoutTotal.textContent = formatMoney(totals.total);
  }
};

const renderCartPage = () => {
  if (!cartPageItems) {
    return;
  }

  cartPageItems.innerHTML = "";
  if (basket.size === 0) {
    cartPageItems.innerHTML = `
      <div class="cart-empty-state">
        <h2>Your cart is empty</h2>
        <a class="button button-primary" href="./products.html">Continue Shopping</a>
      </div>
    `;
    cartPageSummary?.setAttribute("hidden", "");
    return;
  }

  cartPageSummary?.removeAttribute("hidden");

  basket.forEach((item) => {
    const cartItem = document.createElement("article");
    cartItem.className = "cart-page-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.imageAlt}">
      <div>
        <h2>${item.name}</h2>
        <p>${formatMoney(item.price)} each</p>
      </div>
      <div class="basket-item-controls">
        <button class="qty-button" type="button" data-action="decrease" data-product-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="qty-button" type="button" data-action="increase" data-product-id="${item.id}">+</button>
        <button class="remove-item" type="button" data-action="remove" data-product-id="${item.id}">Remove</button>
      </div>
    `;
    cartPageItems.appendChild(cartItem);
  });
};

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const variantButton = target.closest("[data-product-variant]");
  if (variantButton instanceof HTMLElement) {
    const card = variantButton.closest(".product-card");
    if (!card) {
      return;
    }

    card.querySelectorAll("[data-product-variant]").forEach((button) => {
      const isSelected = button === variantButton;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });

    const price = Number(variantButton.getAttribute("data-variant-price"));
    const priceDisplay = card.querySelector("[data-product-price-display]");
    if (priceDisplay && !Number.isNaN(price)) {
      priceDisplay.textContent = formatMoney(price);
      card.dataset.productPrice = String(price);
    }

    const productName = card.dataset.productName;
    const variantLabel = variantButton.getAttribute("data-variant-label");
    const favoriteButton = card.querySelector(".favorite-button");
    if (favoriteButton && productName && variantLabel) {
      favoriteButton.setAttribute("aria-label", `Add ${productName} ${variantLabel} to favorites`);
    }
    updateSquarePaymentButton(card);
    syncFavoriteButtons();
    return;
  }

  const quantityButton = target.closest("[data-quantity-action]");
  if (quantityButton instanceof HTMLElement) {
    const card = quantityButton.closest(".product-card");
    const quantityValue = card?.querySelector("[data-quantity-value]");
    if (!card || !quantityValue) {
      return;
    }

    const currentQuantity = getProductQuantity(card);
    const action = quantityButton.getAttribute("data-quantity-action");
    const nextQuantity = action === "decrease"
      ? Math.max(1, currentQuantity - 1)
      : Math.min(99, currentQuantity + 1);

    quantityValue.textContent = String(nextQuantity);
    return;
  }

  const purchaseButton = target.closest(".add-to-basket, [data-buy-now]");
  if (purchaseButton instanceof HTMLElement) {
    const card = purchaseButton.closest(".product-card");
    if (!card) {
      return;
    }

    const product = getProductData(card);
    const quantity = getProductQuantity(card);

    if (!product) {
      return;
    }

    const squarePaymentLink = purchaseButton.getAttribute("data-square-payment-link");
    if (squarePaymentLink) {
      window.open(squarePaymentLink, "_blank", "noopener,noreferrer");
      return;
    }

    const existingItem = basket.get(product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      basket.set(product.id, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        imageAlt: product.imageAlt
      });
    }

    saveCart();
    renderBasket();
    showCartToast(`${product.name} added to cart.`);
    if (purchaseButton.hasAttribute("data-buy-now")) {
      window.location.href = "./cart.html";
    }
    return;
  }

  const checkoutStart = target.closest("[data-checkout-start]");
  if (checkoutStart instanceof HTMLElement) {
    const totals = getBasketTotals();
    if (totals.itemCount === 0) {
      return;
    }

    setBasketOpen(false);
    setCheckoutPanelOpen(true);
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

  if (target.closest("[data-collection-carousel-close]")) {
    setCollectionCarouselOpen(false);
    return;
  }

  if (target.closest("[data-collection-carousel-prev]")) {
    showAdjacentCollectionImage(-1);
    return;
  }

  if (target.closest("[data-collection-carousel-next]")) {
    showAdjacentCollectionImage(1);
    return;
  }

  const collectionThumb = target.closest("[data-collection-carousel-thumb]");
  if (collectionThumb instanceof HTMLElement) {
    const thumbIndex = Number(collectionThumb.getAttribute("data-collection-carousel-thumb"));
    if (!Number.isNaN(thumbIndex)) {
      renderCollectionCarousel(thumbIndex);
    }
    return;
  }

  const featuredCollectionCard = target.closest("[data-featured-collection]");
  if (featuredCollectionCard instanceof HTMLElement) {
    const collectionKey = featuredCollectionCard.getAttribute("data-featured-collection");
    if (collectionKey) {
      openCollectionCarousel(collectionKey);
    }
    return;
  }

  if (target.closest("[data-work-lightbox-close]")) {
    setWorkLightboxOpen(false);
    return;
  }

  if (target.closest("[data-work-lightbox-prev]")) {
    showAdjacentWorkImage(-1);
    return;
  }

  if (target.closest("[data-work-lightbox-next]")) {
    showAdjacentWorkImage(1);
    return;
  }

  const workGalleryCard = target.closest(".work-gallery-card");
  if (workGalleryCard instanceof HTMLElement && !workGalleryCard.hidden) {
    openWorkLightbox(workGalleryCard);
    return;
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

    saveCart();
    renderBasket();
  });
}

if (cartPageItems) {
  cartPageItems.addEventListener("click", (event) => {
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

    saveCart();
    renderBasket();
    renderCartPage();
  });
}

if (checkoutPanelClose) {
  checkoutPanelClose.addEventListener("click", () => {
    setCheckoutPanelOpen(false);
  });
}

if (reviewPanelClose) {
  reviewPanelClose.addEventListener("click", () => {
    setReviewPanelOpen(false);
  });
}

if (shippingForm) {
  shippingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const totals = getBasketTotals();
    if (totals.itemCount === 0) {
      if (shippingMessage) {
        shippingMessage.hidden = false;
        shippingMessage.textContent = "Add at least one product to the cart before reviewing your order.";
      }
      return;
    }

    checkoutDetails = getShippingDetailsFromForm(shippingForm);
    setCartOrderReference(generateOrderReference());
    if (shippingMessage) {
      shippingMessage.hidden = false;
      shippingMessage.textContent = `Shipping details saved. Your order reference is ${cartOrderReferenceValue}. Continue to payment.`;
    }
    document.querySelector("#payment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (paymentStartButton) {
  paymentStartButton.addEventListener("click", (event) => {
    const totals = getBasketTotals();
    if (!checkoutDetails || totals.itemCount === 0) {
      event.preventDefault();
      if (paymentMessage) {
        paymentMessage.hidden = false;
        paymentMessage.textContent = "Review your cart and shipping details before payment.";
      }
      return;
    }

    if (!cartOrderReferenceValue) {
      setCartOrderReference(generateOrderReference());
    }
    rememberCurrentPage();
    paymentStartButton.setAttribute("aria-busy", "true");
    paymentStartButton.textContent = "Opening Square checkout...";
    if (paymentMessage) {
      paymentMessage.hidden = false;
      paymentMessage.textContent = "Square checkout is opening in a new tab.";
    }

    if (paymentStartButton instanceof HTMLAnchorElement) {
      paymentStartButton.href = CUSTOM_PACKAGE_DEPOSIT_URL;
      window.setTimeout(() => {
        paymentStartButton.textContent = "Pay Custom Package Deposit";
        paymentStartButton.removeAttribute("aria-busy");
      }, 1200);
    } else {
      window.open(CUSTOM_PACKAGE_DEPOSIT_URL, "_blank", "noopener,noreferrer");
      paymentStartButton.textContent = "Pay Custom Package Deposit";
      paymentStartButton.removeAttribute("aria-busy");
    }
  });
}

if (contactDepositLink) {
  contactDepositLink.addEventListener("click", () => {
    rememberCurrentPage();
  });
}

if (previousPageLinks.length) {
  let previousPage = "";
  try {
    previousPage = window.localStorage.getItem(PREVIOUS_PAGE_STORAGE_KEY) || "";
  } catch (error) {
    previousPage = "";
  }

  previousPageLinks.forEach((link) => {
    if (link instanceof HTMLAnchorElement && previousPage) {
      link.href = previousPage;
    }
  });
}

if (contactBriefForm) {
  contactBriefForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactBriefForm.querySelector("[type='submit']");
    const formData = new FormData(contactBriefForm);
    const orderReference = generateOrderReference();
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      requestType: String(formData.get("requestType") ?? "").trim(),
      occasion: String(formData.get("occasion") ?? "").trim(),
      budget: String(formData.get("budget") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      orderReference
    };

    if (!payload.name || !payload.email || !payload.message) {
      if (contactBriefMessage) {
        contactBriefMessage.hidden = false;
        contactBriefMessage.textContent = "Please add your name, email, and message before sending.";
      }
      return;
    }

    if (submitButton) {
      submitButton.setAttribute("aria-busy", "true");
      submitButton.textContent = "Sending...";
    }
    if (contactBriefMessage) {
      contactBriefMessage.hidden = true;
      contactBriefMessage.textContent = "";
    }
    if (contactOrderSuccess) {
      contactOrderSuccess.hidden = true;
    }

    try {
      const response = await fetch(CONTACT_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...payload,
          subject: `Nana's Mama ${payload.requestType || "Website"} Inquiry`
        })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.error || CONTACT_ERROR_MESSAGE);
      }

      contactBriefForm.reset();
      if (contactBriefMessage) {
        contactBriefMessage.hidden = false;
        contactBriefMessage.textContent = `Thanks. Your gift brief has been sent. Order Reference: ${orderReference}.`;
      }
      if (contactOrderReference) {
        contactOrderReference.textContent = orderReference;
      }
      if (contactDepositLink instanceof HTMLAnchorElement) {
        contactDepositLink.href = GIFT_BRIEF_DEPOSIT_URL;
      }
      if (contactOrderSuccess) {
        contactOrderSuccess.hidden = false;
      }
    } catch (error) {
      if (contactBriefMessage) {
        contactBriefMessage.hidden = false;
        const message = error.message || CONTACT_ERROR_MESSAGE;
        contactBriefMessage.textContent = message.includes("testing emails")
          ? CONTACT_ERROR_MESSAGE
          : message;
      }
    } finally {
      if (submitButton) {
        submitButton.removeAttribute("aria-busy");
        submitButton.textContent = "Send Gift Brief";
      }
    }
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && checkoutPanel && !checkoutPanel.hidden) {
    setCheckoutPanelOpen(false);
  }
  if (event.key === "Escape" && reviewPanel && !reviewPanel.hidden) {
    setReviewPanelOpen(false);
  }
  if (event.key === "Escape" && workLightbox && !workLightbox.hidden) {
    setWorkLightboxOpen(false);
  }
  if (event.key === "Escape" && collectionCarousel && !collectionCarousel.hidden) {
    setCollectionCarouselOpen(false);
  }
  if (event.key === "ArrowLeft" && workLightbox && !workLightbox.hidden) {
    event.preventDefault();
    showAdjacentWorkImage(-1);
  }
  if (event.key === "ArrowRight" && workLightbox && !workLightbox.hidden) {
    event.preventDefault();
    showAdjacentWorkImage(1);
  }
  if (event.key === "ArrowLeft" && collectionCarousel && !collectionCarousel.hidden) {
    event.preventDefault();
    showAdjacentCollectionImage(-1);
  }
  if (event.key === "ArrowRight" && collectionCarousel && !collectionCarousel.hidden) {
    event.preventDefault();
    showAdjacentCollectionImage(1);
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

workGalleryCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  const title = card.querySelector("h3")?.textContent?.trim() || "project image";
  card.setAttribute("aria-label", `Enlarge ${title}`);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openWorkLightbox(card);
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

document.querySelectorAll(".value-card, .product-card, .category-card, .story-media, .story-copy, .faq-item, .page-intro-panel, .section-note, .section-intro, .work-gallery-card").forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});

loadCart();
hidePastUpcomingEvents();
document.querySelectorAll(".product-card").forEach(updateSquarePaymentButton);
renderBasket();
renderCartPage();
renderFavoritesCount();
syncFavoriteButtons();
renderFavoritesPage();
