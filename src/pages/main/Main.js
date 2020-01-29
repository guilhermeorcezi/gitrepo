import React, { useState } from 'react';
import './main.css';
import api from '../../services/api';
import Container from '../../Components/Container/Container';
import logo from '../../assets/logo.png';
import { FaPlus } from 'react-icons/fa';
//FaSpinner
export default function Main() {
	const [newRepo, setNewRepo] = useState('');
	const [repo, setRepo] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await api.get(`/repos/${newRepo}`);
		const {
			name,
			description,
			owner: { avatar_url },
			html_url
		} = response.data;

		await setRepo([
			...repo,
			{ name, description, avatar_url, html_url, _id: repo.length }
		]);

		setNewRepo('');
	}

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<img src={logo} alt="Github" />
				<input
					type="text"
					placeholder="Adicionar repositório"
					value={newRepo}
					onChange={(e) => setNewRepo(...newRepo, e.target.value)}
				/>
				<button>
					<FaPlus color="#FFF" size={14} />
				</button>
			</form>

			<ul>
				{repo.map((repo) => (
					<li key={repo._id}>
						<img src={repo.avatar_url} alt={repo.name} />
						<strong>{repo.name}</strong>
						<p>{repo.description}</p>
						<a href={repo.html_url}>Link do Projeto</a>
					</li>
				))}
			</ul>
		</Container>
	);
}