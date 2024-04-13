import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	checkPassword: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (stateName, newValue) => {
			setState({ ...state, [stateName]: newValue });
		},
		resetState() {
			setState(initialState);
		},
	};
};
