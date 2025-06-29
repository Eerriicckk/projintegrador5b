// src/components/LoginPage.jsx

import { useState } from 'react';
import './LoginPage.css';
import { useNavigate, useSearchParams } from 'react-router';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function LoginPage() {
	const [searchParams] = useSearchParams();
	// --- Estados do Componente ---
	const [isLoginView, setIsLoginView] = useState(true);

	const navigate = useNavigate();

	// Campos do formulário
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	// Estados para feedback ao usuário
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	// --- Função para lidar com o envio do formulário ---
	const handleSubmit = async (event) => {
		event.preventDefault(); // Impede o recarregamento da página
		setLoading(true);
		setError('');
		setSuccessMessage('');

		const url = isLoginView
			? 'http://localhost:8080/auth/login'
			: 'http://localhost:8080/auth/cadastro';

		const body = isLoginView
			? { email, password }
			: { nome, email, password, tipo: 'CLIENTE' };

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (!response.ok) {
				// Se a resposta do servidor não for OK
				// O backend retorna um objeto como { "error": "mensagem..." } ou { "erros": [...] }
				const errorMessage = data.error || data.erros?.[0]?.mensagem || 'Ocorreu um erro.';
				throw new Error(errorMessage);
			}

			// --- Lógica de Sucesso ---
			if (isLoginView) {
				// No login, o backend retorna um objeto UserResponse com o token
				console.log('Login bem-sucedido!', data);
				setSuccessMessage('Login realizado com sucesso!');
				// Ação importante: Salvar o token para usar em outras requisições
				localStorage.setItem('authToken', data.token);
				localStorage.setItem('userNome', data.nome);
				await new Promise(r => setTimeout(r, 2000));
				if (searchParams.get('redirect'))
					navigate(-1);
				else
					navigate('/');
			} else {
				// No cadastro, o backend retorna uma mensagem de sucesso
				console.log('Cadastro bem-sucedido!');
				setSuccessMessage('Usuário cadastrado com sucesso! Faça o login.');
				setIsLoginView(true); // Muda para a tela de login após o cadastro
			}

		} catch (err) {
			setError(err.message);
			console.error('Falha na operação:', err.message);
		} finally {
			setLoading(false); // Garante que o loading para, mesmo com erro
		}
	};

	// --- Funções para alternar a visão e limpar os estados ---
	const toggleView = () => {
		setIsLoginView(!isLoginView);
		setError('');
		setSuccessMessage('');
		setNome('');
		setEmail('');
		setPassword('');
	};

	return (
		<div className="login-container">
			<div className="form-box">
				<img src="/Images/Logoloja.png" alt="Logo EletrolUCS" className="form-logo" />
				<h2 className="form-title">{isLoginView ? 'Login' : 'Criar Conta'}</h2>

				<form onSubmit={handleSubmit}>
					{!isLoginView && (
						<input
							type="text"
							placeholder="Nome completo"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							className="form-control input-field"
							required
							disabled={loading}
						/>
					)}

					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-control input-field"
						required
						disabled={loading}
					/>
					<div className="input-group feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-control"
							required
							disabled={loading}
						/>
						<button className="btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />} </button>
					</div>

					{/* Exibição de Mensagens de Erro e Sucesso */}
					{error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
					{successMessage && <p style={{ color: 'green', fontSize: '14px' }}>{successMessage}</p>}

					<button type="submit" className="submit-button" disabled={loading}>
						{loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Cadastrar')}
					</button>
				</form>

				<p className="toggle-text">
					{isLoginView ? 'Não tem uma conta?' : 'Já tem uma conta?'}
					<span onClick={toggleView} className="toggle-link">
						{isLoginView ? ' Cadastre-se' : ' Faça Login'}
					</span>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;