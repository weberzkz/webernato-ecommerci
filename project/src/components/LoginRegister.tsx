import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, ArrowLeft } from 'lucide-react';

interface LoginRegisterProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ onBack, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { email: formData.email, password: formData.password });
      // Simular login bem-sucedido
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      console.log('Cadastro:', formData);
      // Simular cadastro bem-sucedido
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header com botão voltar */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar à loja
          </button>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {isLogin ? <LogIn className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Webernato</h1>
            <p className="text-gray-600">
              {isLogin ? 'Entre em sua conta' : 'Crie sua conta'}
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nome (apenas no cadastro) */}
            {!isLogin && (
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Digite seu nome completo"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Campo Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Campo Confirmar Senha (apenas no cadastro) */}
            {!isLogin && (
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Confirme sua senha"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Link "Esqueceu a senha?" (apenas no login) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-lg shadow-lg hover:shadow-xl"
            >
              {isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          {/* Divisor */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Toggle entre Login/Cadastro */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
            </p>
            <button
              onClick={toggleForm}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 underline decoration-2 underline-offset-4 hover:underline-offset-2"
            >
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Ao continuar, você concorda com nossos</p>
          <div className="space-x-4 mt-1">
            <button className="hover:text-gray-700 transition-colors">
              Termos de Uso
            </button>
            <span>•</span>
            <button className="hover:text-gray-700 transition-colors">
              Política de Privacidade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;