import React from 'react';
import styles from './Menubar.scss';

const Menubar = props => (
    <div className={styles.ChangePage}>
        <button className={styles.List} onClick={e => props.changePage('list')}>
            list
        </button>
        <button className={styles.Fav} onClick={e => props.changePage('fav')}>
            fav
        </button>
    </div>
);

export default Menubar;

//


<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}
</script>

<input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
