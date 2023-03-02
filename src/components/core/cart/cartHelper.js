export const addItem = (item) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item, count: 1 });

    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) =>
      cart.find((p) => p._id === id)
    );

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const totalItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    } else {
      return 0;
    }
  }
};

export const cartItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [];
    }
  }
};

export const updateItem = (id, value) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((product, i) => {
        if (product._id === id) {
          cart[i].count = value;
        }
      });
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeItem = (id) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((product, i) => {
        if (product._id === id) {
          cart.splice(i, 1);
        }
      });
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const emptyCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    window.location = "/cart";
  }
};
