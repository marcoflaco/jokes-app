import React from 'react';
import cc from 'classcat';

import styles from './Button.scss';

const Button = ({ ...props, className, disabled }) =>
<div {...props} className={cc([styles.Button, className])} />


export default Button;
