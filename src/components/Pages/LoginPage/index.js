import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { nativeSignup, nativeLogin } from '../../../Utils/firebase';
import { useHistory } from 'react-router-dom';

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-top: 20px;
`;

const LoginPage = (props) => {
    const history = useHistory();

    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        const a = await nativeSignup(signupName, signupEmail, signupPassword);
        props.setCurrentUser(signupEmail);
        console.log(props.currentUser);
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const a = await nativeLogin(signupEmail, signupPassword);
        props.setCurrentUser({ email: loginEmail });
        console.log(props.currentUser);
        setLoginEmail('');
        setLoginPassword('');
    };

    useEffect(() => {
        console.log(props.currentUser);
    }, []);

    useEffect(() => {
        if (props.currentUser.email && props.currentUser.email !== 'noUser') {
            history.push(`/main/${props.currentUser.email}`);
        }
    }, [props.currentUser]);

    return (
        <>
            <SignupForm onSubmit={handleSignup}>
                signup
                <input
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="名字"
                    required
                ></input>
                <input
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                ></input>
                <input
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="密碼"
                    type="password"
                    required
                ></input>
                <input value="註冊" type="submit" />
            </SignupForm>
            <LoginForm onSubmit={handleLogin}>
                login
                <input
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                ></input>
                <input
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="密碼"
                    type="password"
                    required
                ></input>
                <input value="登入" type="submit" />
            </LoginForm>
        </>
    );
};

export default LoginPage;
