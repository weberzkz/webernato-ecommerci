import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Filter, Search, Star, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'moletom' | 'polo';
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface ProductCatalogProps {
  onBack: () => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'moletom' | 'polo'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating'>('name');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Moletom Premium Classic',
      price: 149.90,
      originalPrice: 199.90,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      category: 'moletom',
      colors: ['#000000', '#808080', '#FFFFFF', '#000080'],
      sizes: ['P', 'M', 'G', 'GG'],
      rating: 4.8,
      reviews: 124,
      isOnSale: true
    },
    {
      id: 2,
      name: 'Polo Clássica Elegante',
      price: 89.90,
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      category: 'polo',
      colors: ['#FFFFFF', '#000080', '#800000', '#008000'],
      sizes: ['P', 'M', 'G', 'GG', 'XG'],
      rating: 4.6,
      reviews: 89,
      isNew: true
    },
    {
      id: 3,
      name: 'Moletom Comfort Fit',
      price: 129.90,
      image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
      category: 'moletom',
      colors: ['#808080', '#000000', '#FFFFFF'],
      sizes: ['P', 'M', 'G', 'GG'],
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: 'Polo Sport Performance',
      price: 99.90,
      originalPrice: 119.90,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      category: 'polo',
      colors: ['#000080', '#FFFFFF', '#FF0000', '#000000'],
      sizes: ['P', 'M', 'G', 'GG'],
      rating: 4.5,
      reviews: 73,
      isOnSale: true
    },
    {
      id: 5,
      name: 'Moletom Urban Style',
      price: 169.90,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      category: 'moletom',
      colors: ['#000000', '#808080', '#000080'],
      sizes: ['M', 'G', 'GG', 'XG'],
      rating: 4.9,
      reviews: 201,
      isNew: true
    },
    {
      id: 6,
      name: 'Polo Business Premium',
      price: 119.90,
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      category: 'polo',
      colors: ['#FFFFFF', '#000080', '#800000'],
      sizes: ['P', 'M', 'G', 'GG'],
      rating: 4.8,
      reviews: 92
    }
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const addToCart = (product: Product, color: string, size: string) => {
    const existingItem = cart.find(
      item => item.id === product.id && item.selectedColor === color && item.selectedSize === size
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedColor: color, selectedSize: size }]);
    }
  };

  const removeFromCart = (id: number, color: string, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedColor === color && item.selectedSize === size)));
  };

  const updateQuantity = (id: number, color: string, size: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id, color, size);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Webernato</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Buscar produtos..."
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Todos os produtos' },
                    { value: 'moletom', label: 'Moletons' },
                    { value: 'polo', label: 'Camisas Polo' }
                  ].map(category => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value as any)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Nome</option>
                  <option value="price-low">Menor preço</option>
                  <option value="price-high">Maior preço</option>
                  <option value="rating">Melhor avaliação</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Carrinho ({getTotalItems()})</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Seu carrinho está vazio</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          Cor: <span style={{ backgroundColor: item.selectedColor }} className="inline-block w-3 h-3 rounded-full ml-1"></span>
                          {' '} Tamanho: {item.selectedSize}
                        </p>
                        <p className="font-semibold text-blue-600">R$ {item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setShowQuickAdd(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Novo
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Oferta
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-blue-600">R$ {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          Adicionar ao Carrinho
        </button>

        {/* Quick Add Options */}
        {showQuickAdd && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            {/* Color Selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cor:</label>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tamanho:</label>
              <div className="flex space-x-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-sm border rounded ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;