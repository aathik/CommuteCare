import axios from 'axios';

export const login = async (email, password, data) => {
	const response = await axios.post('http://localhost:5000/userLogin', {
		email,
		password
	});
    

	const token = response.data.token;
	if (token) {
		localStorage.setItem('User', JSON.stringify(response.data));
		localStorage.setItem('LoggedIn', true);
		localStorage.setItem('UserType', data);
        console.log(response.data);
	}

	return response.data;
};
