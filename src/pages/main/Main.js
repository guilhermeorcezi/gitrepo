import React, { useState } from 'react';
import api from '../../services/api';

import Container from '../../Components/Container/Container';

import './main.css';
import logo from '../../assets/logo.png';

//Icon
import { FaPlus } from 'react-icons/fa';

//Notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { css } from 'glamor';

export default function Main() {
	const [newRepo, setNewRepo] = useState('');
	const [repo, setRepo] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
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
		} catch (er) {
			handleError();
		}
	}

	function handleError() {
		toast.error('Repositório não encontrado!', {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			className: css({
				background: '#5e3eca',
				color: '#FFF'
			})
		});
	}

	function handleRemove(indice) {
		repo.splice(indice, 1);
		if (repo.length > 0) {
			setRepo([...repo]);
		} else setRepo('');
	}

	return (
		<main>
			<ToastContainer />
			<Container className={`${repo.length > 0 ? 'pb-30' : ''}`}>
				<form onSubmit={handleSubmit}>
					<img src={logo} alt="Github" />
					<input
						type="text"
						placeholder="Adicionar repositório"
						value={newRepo}
						required
						onChange={(e) => setNewRepo(e.target.value)}
					/>
					<button>
						<FaPlus color="#FFF" size={14} />
					</button>
				</form>
				<ul>
					{repo.length > 0
						&& repo.map((rep) => (
								<li key={rep._id}>
									<img src={rep.avatar_url} alt={rep.name} />
									<strong>{rep.name}</strong>
									<p>{rep.description}</p>
									<a href={rep.html_url}>Link do Projeto</a>
									<button onClick={(e) => handleRemove(repo.indexOf(rep))}>
										Excluir
									</button>
								</li>
						  ))
						}
				</ul>
			</Container>
		</main>
	);
}
