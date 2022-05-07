import React, { useReducer, createContext, useEffect } from 'react';
import { auth } from '../firebase';

// reducer function responsible for updating the state based on switch cases and whatever we recieve in action payload and returning state and user object
const firebaseReducer = (state, action) => {
	switch (action.type) {
		case 'LOGGED_IN_USER':
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

// initial state
const initialState = {
	user: null,
};

// create context
const AuthContext = createContext();

// context provider which will be wrapping our applications(children components)
const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(firebaseReducer, initialState);

	// whenever reloading then we get token from firebase
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();

				// setting the Global context state
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: { email: user.email, token: idTokenResult.token },
				});
			} else {
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: null,
				});
			}
		});

		// cleanup
		return () => unsubscribe();
	}, []);

	const value = { state, dispatch };
	// returning child component with authcontext provider hence state and dispatch will be available to all components
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

// exporting so that we can access context everwhere in application
export { AuthContext, AuthProvider };
