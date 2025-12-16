import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { getUserRole } from "../utils/auth";

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const Sweets = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin form state
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const role = getUserRole(); // "admin" | "user"

  /* ================= FETCH ================= */
  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
      setFilteredSweets(res.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch sweets";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  /* ================= SEARCH ================= */
  const handleSearch = (value: string) => {
    const v = value.toLowerCase();
    setFilteredSweets(
      sweets.filter(
        (s) =>
          s.name.toLowerCase().includes(v) ||
          s.category.toLowerCase().includes(v)
      )
    );
  };

  /* ================= USER ACTION ================= */
  const purchaseSweet = async (id: string) => {
    try {
      await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
      fetchSweets();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to purchase sweet";
      alert(errorMessage);
    }
  };

  /* ================= ADMIN ACTIONS ================= */
  const addSweet = async () => {
    if (!form.name || !form.category) {
      alert("All fields are required");
      return;
    }

    if (!form.price || !form.quantity || Number(form.price) <= 0 || Number(form.quantity) < 0) {
      alert("Price must be greater than 0 and quantity must be 0 or greater");
      return;
    }

    try {
      await api.post("/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      setForm({ name: "", category: "", price: "", quantity: "" });
      fetchSweets();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to add sweet";
      alert(errorMessage);
    }
  };

  const updateSweet = async (id: string) => {
    const price = prompt("Enter new price:");
    const quantity = prompt("Enter new quantity:");
    if (!price || !quantity) return;

    if (Number(price) <= 0 || Number(quantity) < 0) {
      alert("Price must be greater than 0 and quantity must be 0 or greater");
      return;
    }

    try {
      await api.put(`/sweets/${id}`, {
        price: Number(price),
        quantity: Number(quantity),
      });

      fetchSweets();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update sweet";
      alert(errorMessage);
    }
  };

  const restockSweet = async (id: string) => {
    const qty = prompt("Restock quantity:");
    if (!qty) return;

    if (Number(qty) <= 0) {
      alert("Restock quantity must be greater than 0");
      return;
    }

    try {
      await api.post(`/sweets/${id}/restock`, {
        quantity: Number(qty),
      });

      fetchSweets();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to restock sweet";
      alert(errorMessage);
    }
  };

  const deleteSweet = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    
    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete sweet";
      alert(errorMessage);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <Navbar onSearch={handleSearch} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Sweet Shop Inventory 🍬</h1>
          <p>Manage and purchase delicious sweets</p>
        </div>
      </section>

      <div className="container">
        <h2 className="page-title">Sweets Dashboard</h2>

        {/* ================= ADD SWEET (ADMIN) ================= */}
        {role === "admin" && (
          <div className="add-sweet-card">
            <h3>➕ Add New Sweet</h3>

            <div className="add-sweet-form">
              <div>
                <label>Name</label>
                <input
                  placeholder="Sweet name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Category</label>
                <input
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Price (₹)</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />
              </div>

              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  placeholder="Stock"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                />
              </div>
            </div>

            <button className="add-btn" onClick={addSweet}>
              Add Sweet
            </button>
          </div>
        )}

        {/* ================= LIST ================= */}
        <div className="sweets-grid">
          {filteredSweets.map((sweet) => (
            <div key={sweet._id} className="sweet-card">
              <div className="sweet-header">
                <h3>{sweet.name}</h3>
                <span
                  className={`stock ${
                    sweet.quantity === 0 ? "out" : "in"
                  }`}
                >
                  {sweet.quantity === 0
                    ? "Out of stock"
                    : `Stock: ${sweet.quantity}`}
                </span>
              </div>

              <p className="category">{sweet.category}</p>
              <p className="price">₹ {sweet.price}</p>

              {/* USER */}
              <button
                disabled={sweet.quantity === 0}
                onClick={() => purchaseSweet(sweet._id)}
              >
                {sweet.quantity === 0 ? "Unavailable" : "Purchase"}
              </button>

              {/* ADMIN */}
              {role === "admin" && (
                <div className="admin-actions">
                  <button
                    className="success"
                    onClick={() => updateSweet(sweet._id)}
                  >
                    Update
                  </button>

                  <button
                    className="success"
                    onClick={() => restockSweet(sweet._id)}
                  >
                    Restock
                  </button>

                  <button
                    className="danger"
                    onClick={() => deleteSweet(sweet._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sweets;
