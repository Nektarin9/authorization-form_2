import React from 'react';
import style from './form.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useEffect } from 'react';
const emailValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

let stateMail = false;
let statePassword = false;
let stateNewPassword = false;
function sendData(formData) {
	console.log(formData);
}
const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(emailValid, 'Укажите адрес электронный почты в формате address@mail.ru'),
	password: yup
		.string()
		.max(25, 'Пароль должен быть от 5 - 25 символов')
		.min(5, 'Пароль должен быть от 5 - 25 символов'),
	newPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароль не совпадает'),
});

export const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			newPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	});
	const submitButtonRef = useRef(null);

	let error;
	if (errors.email?.message) {
		stateMail = false;
		error = errors.email?.message;
	} else if (errors.password?.message) {
		statePassword = false;
		error = errors.password?.message;
	} else if (errors.newPassword?.message && !isValid) {
		stateNewPassword = false;
		error = errors.newPassword?.message;
	} else {
		error = null
		stateMail = true;
		statePassword = true;
		stateNewPassword = true;
	}
	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	}, [isValid]);

	return (
		<section className={style.form_container}>
			<form onSubmit={handleSubmit(sendData)}>
				{error && <p className={style.error}>{error}</p>}

				<label>Email</label>
				<input
					className={stateMail ? style.input_enable : style.input}
					name="Email"
					type="text"
					{...register('email')}
				></input>

				<label>Пароль</label>
				<input
					className={statePassword ? style.input_enable : style.input}
					name="password"
					type="password"
					{...register('password')}
				></input>

				<label>Повтор пароля</label>
				<input
					className={stateNewPassword ? style.input_enable : style.input}
					name="newPassword"
					type="password"
					{...register('newPassword')}
				></input>

				<button type="submit" ref={submitButtonRef} disabled={error}>
					Зарегистрироваться
				</button>
			</form>
		</section>
	);
};
