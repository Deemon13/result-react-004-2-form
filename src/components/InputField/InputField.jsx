import PropTypes from 'prop-types';

import styles from './inputField.module.css';

export const InputField = ({ label, htmlFor, ...otherProps }) => {
	return (
		<div className={styles.group}>
			<label className={styles.label} htmlFor={htmlFor}>
				{label}
			</label>
			<input className={styles.input} {...otherProps} />
		</div>
	);
};

InputField.propTypes = {
	label: PropTypes.string,
	htmlFor: PropTypes.string,
	otherProps: PropTypes.object,
};
