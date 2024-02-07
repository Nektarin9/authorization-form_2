import React from 'react';
import style from './form.module.css';
import { useState, useRef } from 'react';

let stateMail = false;
let statePassword = false;
let stateNewPassword = false;

export const Form = () => {
	const [value, setValue] = useState({
		email: '',
		password: '',
		newPassword: '',
	});
	const [error, setError] = useState(null);
	const [stateForm, setStateForm] = useState(false);

	const submitButtonRef = useRef(null);
	const emailValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	function sendData(event) {
		event.preventDefault();
		console.log(value);
	}

	function selectButtonRef() {
		if (stateMail && statePassword && stateNewPassword) {
			setStateForm(true);
			setTimeout(() => {
				submitButtonRef.current.focus();
			}, 0);
		} else {
			setStateForm(false);
		}
	}

	function onEmailChange({ target }) {
		setValue({
			...value,
			email: target.value,
		});
		if (!emailValid.test(target.value)) {
			stateMail = false;
			selectButtonRef();
		} else {
			stateMail = true;
			selectButtonRef();
		}
	}
	function onBlurEmailChange({ target }) {
		if (!emailValid.test(target.value)) {
			setError('Укажите адрес электронный почты в формате address@mail.ru');
		} else {
			setError(null);
		}
	}
	function onPasswordChange({ target }) {
		setValue({
			...value,
			password: target.value,
		});
		if (
			target.value.length >= 5 &&
			target.value.length <= 25 &&
			target.value === value.newPassword
		) {
			stateNewPassword = true;
			statePassword = true;
			setError(null);
			selectButtonRef();
		} else if (target.value.length <= 5 || target.value.length >= 25) {
			setError('Пароль должен быть от 5 - 25 символов');
			statePassword = false;
			selectButtonRef();
		} else {
			stateNewPassword = false;
			statePassword = true;
			setError(null);
			selectButtonRef();
		}
	}
	function onNewPasswordChange({ target }) {
		setValue({
			...value,
			newPassword: target.value,
		});
		if (
			target.value.length >= 5 &&
			target.value.length <= 25 &&
			target.value === value.password
		) {
			setError(null);
			stateNewPassword = true;
			statePassword = true;
			selectButtonRef();
		} else {
			setError('Пароль не совпадает');
			stateNewPassword = false;
			selectButtonRef();
		}
	}

	return (
		<section className={style.form_container}>
			<form onSubmit={sendData}>
				{error && <p className={style.error}>{error}</p>}

				<label>Email</label>
				<input
					className={stateMail ? style.input_mail : style.input}
					name="Email"
					type="email"
					value={value.email}
					onChange={onEmailChange}
					onBlur={onBlurEmailChange}
				></input>

				<label>Пароль</label>
				<input
					className={statePassword ? style.input_enable : style.input}
					name="password"
					type="password"
					value={value.password}
					onChange={onPasswordChange}
				></input>

				<label>Повтор пароля</label>
				<input
					className={stateNewPassword ? style.input_enable : style.input}
					name="newPassword"
					type="password"
					value={value.newPassword}
					onChange={onNewPasswordChange}
				></input>

				<button
					ref={submitButtonRef}
					type="submit"
					disabled={stateForm === false}
				>
					Зарегистрироваться
				</button>
			</form>
		</section>
	);
};
