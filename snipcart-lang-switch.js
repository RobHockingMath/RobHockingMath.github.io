document.addEventListener("DOMContentLoaded", function () {
    // Helper: determine current language using <html lang="...">
    function getCurrentLang() {
      return document.documentElement.lang === "zh" ? "zh" : "en";
    }
  
    // Define your product translations.
    const translations = {
      "seahorse-fractal-etching": {
        en: {
          name: "Seahorse Fractal Etching",
          description: "A Kleinian limit set fractal etched in glass."
        },
        zh: {
          name: "海馬玻璃蝕刻",
          description: "一個玻璃蝕刻的克萊尼極限集合分形。"
        }
      },
      "crab-fractal-orb": {
        en: {
          name: "Crab Fractal Orb",
          description: "A stunning fractal-inspired crab orb."
        },
        zh: {
          name: "螃蟹分形球",
          description: "美麗的螃蟹分形球，獨特的數學藝術品。"
        }
      }
      // Add more products as needed.
    };
  
    // We'll store the last language we used for the cart.
    let currentCartLang = getCurrentLang();
  
    // Function: rebuild the cart using updated translations.
    function rebuildCart(newLang) {
      if (!window.Snipcart || !window.Snipcart.store) return;
      const state = window.Snipcart.store.getState();
      if (!state.cart || !state.cart.items || !state.cart.items.items) return;
      
      const cartItems = state.cart.items.items;
      // Create an array to hold the new item data.
      const itemsData = cartItems.map(item => {
        const productId = item.id;
        const trans = translations[productId] && translations[productId][newLang];
        return {
          id: productId,
          name: trans ? trans.name : item.name,
          description: trans ? trans.description : item.description,
          price: item.price,
          quantity: item.quantity,
          // Use the original product URL if available
          url: item.url || window.location.href
        };
      });
  
      // Clear the cart, then re-add each item.
      window.Snipcart.api.cart.clear().then(() => {
        // Re-add items sequentially.
        const addPromises = itemsData.map(data => {
          return window.Snipcart.api.items.add({
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            url: data.url
          });
        });
        return Promise.all(addPromises);
      }).then(() => {
        console.log("Cart rebuilt with language:", newLang);
        currentCartLang = newLang;
        // Force a refresh of the checkout UI.
        if (window.Snipcart.api.cart.refresh) {
          window.Snipcart.api.cart.refresh();
        }
      }).catch(err => {
        console.error("Error rebuilding cart:", err);
      });
    }
  
    // Listen for the checkout open event.
    window.Snipcart.events.on("checkout.open", function () {
      const lang = getCurrentLang();
      // If the current cart language differs from the page language,
      // rebuild the cart.
      if (lang !== currentCartLang) {
        rebuildCart(lang);
      }
    });
  
    // Also, update when the cart is updated (optional).
    window.Snipcart.events.on("cart.updated", function () {
      const lang = getCurrentLang();
      if (lang !== currentCartLang) {
        rebuildCart(lang);
      }
    });
  
    // Listen for language switch clicks.
    const langSwitch = document.querySelector(".lang-toggle");
    if (langSwitch) {
      langSwitch.addEventListener("click", function () {
        // Allow some delay for the new page to load and for <html lang="..."> to update.
        setTimeout(() => {
          const newLang = getCurrentLang();
          if (newLang !== currentCartLang) {
            rebuildCart(newLang);
          }
        }, 500);
      });
    }
  });
  
  
