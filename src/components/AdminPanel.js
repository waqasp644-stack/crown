import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc 
} from 'firebase/firestore';

export default function AdminPanel({ onBack, initialProducts = [], primaryOwner = 'jkbrostrading@gmail.com' }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'access'
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [adminsList, setAdminsList] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Modal & Edit States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // Edit tracking ke liye
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Burgers',
    price: '',
    image: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Real-time Firestore Listeners
  useEffect(() => {
    // 1. Fetch Orders
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 2. Fetch Products
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const firebaseProducts = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProducts(firebaseProducts.length > 0 ? firebaseProducts : initialProducts);
    });

    // 3. Fetch Allowed Admins
    const unsubAdmins = onSnapshot(collection(db, "admins"), (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setAdminsList(list);
    });

    return () => {
      unsubOrders();
      unsubProducts();
      unsubAdmins();
    };
  }, [initialProducts]);

  // Grant New Admin Access
  const handleGrantAccess = async (e) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminEmail.includes('@')) return;

    try {
      await addDoc(collection(db, "admins"), {
        email: newAdminEmail.trim().toLowerCase(),
        createdAt: new Date()
      });
      setNewAdminEmail('');
      alert("Admin access granted successfully!");
    } catch (err) {
      alert("Error adding admin: " + err.message);
    }
  };

  // Revoke Admin Access
  const handleRemoveAdmin = async (id) => {
    if (window.confirm("Are you sure you want to remove this admin?")) {
      try {
        await deleteDoc(doc(db, "admins", id));
      } catch (err) {
        alert("Error removing admin: " + err.message);
      }
    }
  };

  // Add or Update Product in Firestore
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;
    
    setSubmitting(true);
    try {
      const productData = {
        title: newProduct.title,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        image: newProduct.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        description: newProduct.description || 'Gourmet item prepared with fresh ingredients.'
      };

      if (editingProductId) {
        // Update existing product
        await updateDoc(doc(db, "products", editingProductId), productData);
      } else {
        // Add new product
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: new Date()
        });
      }
      
      closeModal();
    } catch (err) {
      alert("Error saving product: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Open Modal for Editing
  const handleEditClick = (prod) => {
    setEditingProductId(prod.id);
    setNewProduct({
      title: prod.title || '',
      category: prod.category || 'Burgers',
      price: prod.price || '',
      image: prod.image || '',
      description: prod.description || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProductId(null);
    setNewProduct({ title: '', category: 'Burgers', price: '', image: '', description: '' });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Delete this order?")) {
      await deleteDoc(doc(db, "orders", id));
    }
  };

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || p.id?.includes(searchTerm);
    const matchesCat = selectedCategory === 'All Categories' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-white/10 flex flex-col justify-between p-6 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-red-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">C</div>
            <h2 className="font-extrabold text-lg tracking-wider uppercase font-display">Crown <span className="text-orange-500">Burger</span></h2>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === 'products' ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              🍔 Products & Inventory
            </button>

            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === 'orders' ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span>📦 Customer Orders</span>
              <span className="bg-white/10 text-orange-400 text-xs px-2 py-0.5 rounded-full font-bold">{orders.length}</span>
            </button>

            <button 
              onClick={() => setActiveTab('access')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === 'access' ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              🛡️ Admin Access Controls
            </button>
          </nav>
        </div>

        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs font-semibold py-2 transition-colors">
          ← Back to Main Store
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex items-center gap-5">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 text-xl font-bold">🍔</div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Menu Items</p>
              <h3 className="text-2xl font-bold text-white mt-1">{products.length}</h3>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex items-center gap-5">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 text-xl font-bold">📦</div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Orders</p>
              <h3 className="text-2xl font-bold text-white mt-1">{orders.length}</h3>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 text-xl font-bold">🛡️</div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Allowed Admins</p>
              <h3 className="text-2xl font-bold text-white mt-1">{adminsList.length + 1}</h3>
            </div>
          </div>
        </div>

        {/* Tab 1: Products */}
        {activeTab === 'products' && (
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#1A1A1A] border border-white/10 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 w-full sm:w-64"
                />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#1A1A1A] border border-white/10 px-3 py-2.5 rounded-xl text-sm font-medium text-white focus:outline-none"
                >
                  <option>All Categories</option>
                  <option>Burgers</option>
                  <option>Sides</option>
                  <option>Drinks</option>
                </select>
              </div>

              <button 
                onClick={() => { setEditingProductId(null); setIsModalOpen(true); }}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
              >
                <span>+</span> Add New Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-xs uppercase font-semibold">
                    <th className="pb-4 px-4">Item</th>
                    <th className="pb-4 px-4">Category</th>
                    <th className="pb-4 px-4">Price</th>
                    <th className="pb-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/[0.02]">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                        <img src={prod.image} alt={prod.title} className="w-10 h-10 object-cover rounded-lg bg-black" />
                        {prod.title}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{prod.category || 'Burgers'}</td>
                      <td className="py-4 px-4 font-bold text-orange-400">AED {parseFloat(prod.price).toFixed(2)}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEditClick(prod)}
                          className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Customer Orders */}
        {activeTab === 'orders' && (
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Customer Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-xs uppercase font-semibold">
                    <th className="pb-4 px-4">Customer</th>
                    <th className="pb-4 px-4">Address</th>
                    <th className="pb-4 px-4">Items</th>
                    <th className="pb-4 px-4">Total</th>
                    <th className="pb-4 px-4">Status</th>
                    <th className="pb-4 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="py-4 px-4 font-bold text-white">{ord.customer?.fullName || 'Guest'}</td>
                      <td className="py-4 px-4 text-xs text-gray-400">{ord.customer?.phone}<br/>{ord.customer?.address}</td>
                      <td className="py-4 px-4 text-xs">
                        {ord.items?.map((it, i) => (
                          <div key={i}>{it.quantity}x {it.title}</div>
                        ))}
                      </td>
                      <td className="py-4 px-4 font-bold text-white">AED {ord.totalAmount?.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <select 
                          value={ord.status || 'Pending'} 
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          className="bg-[#1A1A1A] text-xs font-semibold px-2 py-1 rounded border border-white/10 text-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => handleDeleteOrder(ord.id)} className="text-xs text-red-400 font-semibold cursor-pointer">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Admin Access Controls */}
        {activeTab === 'access' && (
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 max-w-3xl space-y-8 shadow-xl">
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Grant Admin Access</h3>
              <p className="text-xs text-gray-400">
                Add Gmail accounts here that should have complete permission to open this Admin Panel.
              </p>
            </div>

            <form onSubmit={handleGrantAccess} className="flex gap-3">
              <input 
                type="email" 
                required
                placeholder="Enter user gmail (e.g., helper@gmail.com)"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-orange-600/20 cursor-pointer"
              >
                Grant Access
              </button>
            </form>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <h4 className="text-sm font-semibold text-gray-300">Current Allowed Admins:</h4>
              
              <div className="space-y-2">
                {/* Fixed Primary Owner Gmail */}
                <div className="flex justify-between items-center bg-[#1A1A1A] border border-orange-500/30 px-4 py-3 rounded-xl text-sm">
                  <span className="font-mono text-white font-semibold">{primaryOwner}</span>
                  <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-orange-500/30">Primary Owner</span>
                </div>

                {/* Additional Admins from Firestore */}
                {adminsList.map((adm) => (
                  <div 
                    key={adm.id} 
                    className="flex justify-between items-center bg-[#1A1A1A] border border-white/5 px-4 py-3 rounded-xl text-sm"
                  >
                    <span className="font-mono text-gray-200">{adm.email}</span>
                    <button 
                      onClick={() => handleRemoveAdmin(adm.id)}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#141414] border border-white/10 text-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-xl font-bold text-white">{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Double Smash Cheese Burger"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Category</label>
                <select 
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Burgers">Burgers</option>
                  <option value="Sides">Sides</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Price (AED)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  placeholder="29.99"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Description</label>
                <textarea 
                  rows="3"
                  placeholder="Describe the item ingredients..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="w-1/2 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-1/2 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-orange-600/20 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Saving...' : (editingProductId ? 'Update Product' : 'Save Product')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}