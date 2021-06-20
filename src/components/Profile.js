import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { navToSendCard, getDataForProfile } from '../Utils/firebase';
import { defaultImg } from '../images/default';
import { profileLoading } from '../images/loading';
import { mailWhiteIcon } from '../images/icons';

const MainProfile = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    width: 300px;
    height: 100vh;
    background-color: #172f2f;
    align-items: center;
`;

const MainProfileName = styled.div`
    display: flex;
    width: 200px;
    margin-top: 30px;
    padding-left: 20px;
    font-size: 20px;
    color: #e1dad4;
`;

const MainProfileMail = styled(MainProfileName)`
    font-size: 14px;
    margin-bottom: 30px;
`;

const MainProfileImg = styled.img`
    margin-top: 130px;
    width: 150px;
    padding: 13px;
    border: 2px solid #e1dad4;
    border-radius: 4px;
`;

const ProfileLoadingContainer = styled.div`
    display: flex;
    width: 100%;
    height: 139px;
    align-items: center;
    justify-content: center;
`;

const ProfileLoadingImg = styled.img`
    width: 80px;
`;

const SendMailBtn = styled.div`
    width: 160px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: white;
    background-color: #996633;
    :hover {
        cursor: pointer;
        background-color: #c2bab4;
    }
`;

const SendMailBtnIcon = styled.img`
    width: 28px;
    margin-right: 20px;
`;

const Profile = (props) => {
    const history = useHistory();
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    useEffect(() => {
        if (props.currentUser && props.currentUser.email === 'noUser') {
            history.push('/');
        } else if (props.currentUser.email) {
            getDataForProfile(
                props.currentUser.email,
                setProfileName,
                setProfileEmail,
                setProfilePhoto
            );
        }
    }, [props.currentUser, history]);

    const navToSendCardPage = () => {
        navToSendCard(props.currentUser.email);
    };

    return (
        <MainProfile>
            <MainProfileImg
                src={profilePhoto === '' ? defaultImg : profilePhoto}
            ></MainProfileImg>
            {profileName !== '' ? (
                <>
                    <MainProfileName>{profileName}</MainProfileName>
                    <MainProfileMail>{profileEmail}</MainProfileMail>
                </>
            ) : (
                <ProfileLoadingContainer>
                    <ProfileLoadingImg src={profileLoading} />
                </ProfileLoadingContainer>
            )}
            <SendMailBtn onClick={navToSendCardPage}>
                <SendMailBtnIcon src={mailWhiteIcon} alt="mail-icon" />
                我要寄信
            </SendMailBtn>
        </MainProfile>
    );
};

export default Profile;
