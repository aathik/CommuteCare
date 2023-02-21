import React, { useState, useEffect, createContext } from 'react';
import { isAuthenticated } from './AuthService';

import Login from '../Login';
import { useContext } from 'react';


const AuthContext = React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authUser, setauthUser] = useState(null);
    const [isLoggedIn, setIsLogedIn] = useState(null);

    const value = {
        authUser,
        setauthUser,
        isLoggedIn,
        setIsLogedIn,
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
/*

export const UserProvider = ({ children }) => {
	const [ currentUser, setCurrentUser ] = useState(undefined);

	useEffect(() => {
		const checkLoggedIn = async () => {
			let cuser = isAuthenticated();
			if (cuser === null) {
				localStorage.setItem('user', '');
				cuser = '';
			}

			setCurrentUser(cuser);
		};

		checkLoggedIn();
	}, []);

	console.log('usercontext', currentUser);

	return (
		<UserContext.Provider value={[currentUser, setCurrentUser]}>
			{ currentUser?.token ? children : <Login />}
		</UserContext.Provider>
	);
};


export default UserContext; */