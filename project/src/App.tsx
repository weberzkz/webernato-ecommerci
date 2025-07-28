import React, { useState } from 'react';
import LoginRegister from './components/LoginRegister';
import ProductCatalog from './components/ProductCatalog';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simular login bem-sucedido
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowCatalog(true);
  };

  if (showCatalog) {
    return <ProductCatalog onBack={() => setShowCatalog(false)} />;
  }

  if (showLogin) {
    return <LoginRegister onBack={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-4">
      {/* Header da loja */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Webernato</h1>
        <p className="text-xl text-gray-600 mb-8">Moletons e Camisas Polo de qualidade premium</p>
        
        {/* Produtos em destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl">
          {[
            { name: 'Moletom Premium', price: 'R$ 149,90', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' },
            { name: 'Polo Clássica', price: 'R$ 89,90', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg' },
            { name: 'Moletom Comfort', price: 'R$ 129,90', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg' },
            { name: 'Polo Sport', price: 'R$ 99,90', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' }
          ].map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-blue-600 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botão para acessar login */}
        <div className="space-y-4">
          <button
            onClick={() => setShowLogin(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Entrar na sua conta
          </button>
          <p className="text-gray-600">Faça login para acessar sua conta e fazer pedidos</p>
        </div>
      </div>
    </div>
  );
}

export default App;