import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { nativeSignup, nativeLogin } from '../../../Utils/firebase';
import { useHistory } from 'react-router-dom';
import { logo } from '../../../images/index';

const FieldForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
`;

const FieldTitle = styled.p`
    display: flex;
    font-size: 36px;
    margin-top: 0;
    margin-bottom: 0;
`;

const FieldSub = styled.p`
    display: flex;
    font-size: 16px;
    margin-top: 18px;
    margin-bottom: 0;
`;

const FieldInput = styled.input`
    width: 100%;
    height: 30px;
    margin-top: 18px;
    font-size: 14px;
    border: 1px solid #a3a3a3;
    border-radius: 3px;
    padding: 0;
    text-indent: 10px;
    align-self: center;
`;

const FieldBtn = styled.input`
    width: 100%;
    height: 36px;
    margin-top: 24px;
    align-self: center;
    font-size: 18px;
    color: white;
    background-color: #172f2f;
    border: 1px solid #172f2f;
    :hover {
        cursor: pointer;
    }
`;

const SignupChange = styled.div`
    font-size: 14px;
    margin-top: 20px;
    display: flex;
`;

const SignupChangeTag = styled.div`
    font-size: 14px;
    margin-left: 20px;
    color: #996633;
    font-weight: bold;
    :hover {
        color: #e6ccb3;
        cursor: pointer;
    }
`;

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
`;

const Logo = styled.img`
    width: 110px;
    margin-left: 30px;
`;

const Body = styled.div`
    background-image: url('https://images.unsplash.com/photo-1607827448387-a67db1383b59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
    width: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginPage = (props) => {
    const history = useHistory();

    const [signupOrLogin, setSignupOrLogin] = useState(true);
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        const asyncSignup = await nativeSignup(
            signupName,
            signupEmail,
            signupPassword
        );
        props.setCurrentUser(signupEmail);
        console.log(props.currentUser);
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const aysncLogin = await nativeLogin(
            loginEmail,
            loginPassword,
            () => {
                props.setCurrentUser({ email: loginEmail });
            },
            () => {
                window.alert('帳號密碼有誤');
            }
        );
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
            <Nav>
                <Logo src={logo} />
            </Nav>

            <Body>
                {signupOrLogin ? (
                    <FieldForm onSubmit={handleSignup}>
                        <FieldTitle>開始使用Scard</FieldTitle>
                        <FieldSub>註冊以使用Scard更完整的功能</FieldSub>
                        <FieldInput
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            placeholder="名字"
                            required
                        ></FieldInput>
                        <FieldInput
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            required
                        ></FieldInput>
                        <FieldInput
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="密碼"
                            type="password"
                            required
                        ></FieldInput>
                        <FieldBtn value="註冊" type="submit" />
                        <SignupChange>
                            已經有帳號了
                            <SignupChangeTag
                                onClick={() => setSignupOrLogin(false)}
                            >
                                我要登入
                            </SignupChangeTag>
                        </SignupChange>
                    </FieldForm>
                ) : (
                    <FieldForm onSubmit={handleLogin}>
                        <FieldTitle>登入你的帳號</FieldTitle>
                        <FieldInput
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="test@test.com"
                            type="email"
                            required
                        ></FieldInput>
                        <FieldInput
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="test123"
                            type="password"
                            required
                        ></FieldInput>
                        <FieldBtn value="登入" type="submit" />
                        <SignupChange>
                            第一次使用 Scard ?
                            <SignupChangeTag
                                onClick={() => setSignupOrLogin(true)}
                            >
                                我要註冊
                            </SignupChangeTag>
                        </SignupChange>
                    </FieldForm>
                )}
            </Body>
        </>
    );
};

export default LoginPage;

// separate header to a component
