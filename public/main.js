// implement ecommerce backend that allow user to
// to get all products
// create a new product
// update a product
// delete a product
// search a product
// also implement ui for it 


const API = "/api/products";

async function fetchProducts() {
  const res = await fetch(API);
  const products = await res.json();
  renderProducts(products);
}

function renderProducts(products) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <strong>${product.name}</strong> - ₹${product.price}<br>
      ${product.description}<br>
      Category: ${product.category}<br><br>
      <button onclick="deleteProduct('${product._id}')">Delete</button>
      <button onclick="editProduct('${product._id}', '${product.name}', ${product.price}, '${product.description}', '${product.category}')">Edit</button>
    `;
    container.appendChild(div);
  });
}

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, description, category })
  });

  e.target.reset();
  fetchProducts();
});

async function deleteProduct(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchProducts();
}

async function editProduct(id, name, price, description, category) {
  const newName = prompt("New name:", name);
  const newPrice = prompt("New price:", price);
  const newDescription = prompt("New description:", description);
  const newCategory = prompt("New category:", category);

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newName,
      price: newPrice,
      description: newDescription,
      category: newCategory
    })
  });

  fetchProducts();
}

async function searchProducts() {
  const keyword = document.getElementById("searchInput").value;
  const res = await fetch(`${API}/search?keyword=${keyword}`);
  const data = await res.json();
  renderProducts(data);
}

fetchProducts();
