export const site = {
  name: "Nana's Mama",
  origin: "https://nanasmama.com",
  defaultImage: "/assets/custom-gifting/hero/pink-wedding-gift-hamper.jpg"
};

export const pages = [
  {
    key: "main",
    file: "index.html",
    path: "/",
    title: "Nana's Mama | Custom Gifts, Packaging & Beauty",
    description: "Custom packaging, curated gifts, personalized gift boxes, wedding gifts, and beauty products from Nana's Mama.",
    changefreq: "weekly",
    priority: "1.0",
    sitemap: true
  },
  {
    key: "products",
    file: "products.html",
    path: "/products.html",
    title: "Nana's Mama Products",
    description: "Shop Nana's Mama shea butter, African black soap, hair care, body care, and natural beauty products.",
    changefreq: "weekly",
    priority: "0.9",
    sitemap: true
  },
  {
    key: "gifts",
    file: "gifts.html",
    path: "/gifts.html",
    title: "Nana's Mama Gifts",
    description: "Shop curated Nana's Mama gift sets, wedding gifts, wellness bundles, and personalized gift ideas.",
    changefreq: "monthly",
    priority: "0.8",
    sitemap: true
  },
  {
    key: "custom-packaging",
    file: "custom-packaging.html",
    path: "/custom-packaging.html",
    title: "Custom Packaging | Nana's Mama",
    description: "Plan custom packaging with Nana's Mama for branded gifts, wedding boxes, client gifts, team appreciation, events, and personalized gift presentations.",
    changefreq: "monthly",
    priority: "0.8",
    sitemap: true
  },
  {
    key: "about",
    file: "AboutUs.html",
    path: "/AboutUs.html",
    title: "About Us | Nana's Mama",
    description: "Learn about Nana's Mama, our values, African roots, handcrafted gifting, and natural beauty care.",
    changefreq: "monthly",
    priority: "0.7",
    sitemap: true
  },
  {
    key: "faq",
    file: "faq.html",
    path: "/faq.html",
    title: "Nana's Mama FAQ",
    description: "Find answers about Nana's Mama orders, custom gifts, packaging, shipping, returns, and beauty products.",
    changefreq: "monthly",
    priority: "0.6",
    sitemap: true
  },
  {
    key: "refund-policy",
    file: "refund-policy.html",
    path: "/refund-policy.html",
    title: "Return & Refund Policy | Nana's Mama",
    description: "Review Nana's Mama return and refund policy for unopened products, damaged orders, incorrect items, and custom gift packaging.",
    changefreq: "monthly",
    priority: "0.5",
    sitemap: true
  },
  {
    key: "contact",
    file: "contact.html",
    path: "/contact.html",
    title: "Contact | Nana's Mama",
    description: "Contact Nana's Mama to plan custom packaging, curated gifts, wedding gifts, and product orders.",
    changefreq: "monthly",
    priority: "0.8",
    sitemap: true
  },
  {
    key: "work",
    file: "our-work.html",
    path: "/our-work.html",
    title: "Our Work | Nana's Mama",
    description: "Browse Nana's Mama custom gifting, packaging, wedding gift, baby gift, and natural beauty project gallery.",
    changefreq: "monthly",
    priority: "0.8",
    sitemap: true
  },
  {
    key: "cart",
    file: "cart.html",
    path: "/cart.html",
    title: "Nana's Mama Cart",
    description: "Review your Nana's Mama basket, shipping details, and checkout summary.",
    noindex: true,
    sitemap: false
  },
  {
    key: "payment-success",
    file: "payment-success.html",
    path: "/payment-success.html",
    title: "Payment Received | Nana's Mama",
    description: "Nana's Mama payment confirmation page for custom package deposits.",
    noindex: true,
    sitemap: false
  },
  {
    key: "favorites",
    file: "favorites.html",
    path: "/favorites.html",
    title: "Nana's Mama Favorites",
    description: "View your saved Nana's Mama favorite products and add them to your basket.",
    noindex: true,
    sitemap: false
  }
];

export const pageByFile = new Map(pages.map((page) => [page.file, page]));
