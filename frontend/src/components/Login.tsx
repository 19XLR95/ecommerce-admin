import {ChangeEvent, FormEvent, useState} from 'react';

import '../styles/login.css';
import {login} from '../api/LoginApi';

interface PropsType {
    setUserData: Function,
}

function Login(props: PropsType) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const loginFormSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await login(email, password);
        
        if (res.code === 200) {
            props.setUserData(res.data);
        }
    }

    return(
        <div className='login-form-container'>
            <form className='login-form' onSubmit={loginFormSubmitHandler}>
                <div className='login-form-title'>Login</div>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' onChange={emailChangeHandler} />
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' onChange={passwordChangeHandler} />
                <div className='login-form-button-container'>
                    <button type='submit' className='login-form-button'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
