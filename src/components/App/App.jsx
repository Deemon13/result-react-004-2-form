import { useEffect, useRef, useState } from 'react';
import styles from './app.module.css';
import { InputField } from '../../components';

import { useStore } from '../../hooks';

const sendFormData = formData => {
	console.log(formData);
};

const REG_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

export const App = () => {
	const { getState, updateState, resetState } = useStore();
	const { email, password, checkPassword } = getState();

	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState(null);
	const btnSubmitRef = useRef(null);

	let errorMsg = null;

	const handleChange = ({ target }) => {
		updateState(target.name, target.value);

		setIsValid(null);

		if (target.name === 'email' && !REG_EMAIL.test(target.value)) {
			errorMsg = 'Invalid email';
		} else if (target.name === 'password' && target.value.length > 20) {
			errorMsg = 'Password too long, required 20 symbols';
		} else if (target.name === 'checkPassword' && target.value !== password) {
			errorMsg = 'Password are not equal';
		} else if (email && password && checkPassword) {
			setIsValid(true);
		}

		setError(errorMsg);
	};

	const handleBlur = ({ target }) => {
		if (target.name === 'password' && target.value.length < 6) {
			errorMsg = 'Required less then 6 symbols';
		}

		setError(errorMsg);
	};

	const handleSubmit = event => {
		event.preventDefault();
		sendFormData(getState());
		resetState();
		setIsValid(null);
	};

	useEffect(() => {
		if (isValid) {
			btnSubmitRef.current.focus();
		}
	}, [isValid]);

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={handleSubmit}>
				{error && <span className={styles.error}>{error}</span>}
				<InputField
					label={'Email:'}
					htmlFor={'email'}
					name={'email'}
					value={email}
					id={'email'}
					type={'email'}
					onChange={handleChange}
				/>
				<InputField
					label={'Пароль:'}
					htmlFor={'password'}
					name={'password'}
					value={password}
					id={'password'}
					type={'password'}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<InputField
					label={'Повтор пароля:'}
					htmlFor={'checkPassword'}
					name={'checkPassword'}
					value={checkPassword}
					id={'checkPassword'}
					type={'password'}
					onChange={handleChange}
				/>
				<button
					className={styles.btn}
					type="submit"
					disabled={!isValid}
					ref={btnSubmitRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
