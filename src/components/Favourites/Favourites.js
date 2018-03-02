import React from 'react';
import styles from './Favourites.scss';

class Favourites extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.favourites) {
            return <h1>LOADING</h1>;
        }
        const jokes = this.props.favourites.map((joke, index) => (
            <p key={index} className={styles.FavouritesJokes}>
                {joke.joke} - {joke.id}
                <button
                    className={styles.DeleteJoke}
                    onClick={e =>
                        this.props.processFavourites(e, joke, 'delete')
                    }
                >
                    Remove joke
                </button>
            </p>
        ));

        if (jokes.length < 1) {
            return (
                <div>
                    <button onClick={this.props.toggleAutoLoad}>
                        Auto load
                    </button>
                    <h2>No favourites!</h2>
                </div>
            );
        }
        return (
            <div>
                <button onClick={this.props.toggleAutoLoad}>Auto load</button>
                {jokes}
            </div>
        );
    }
}

export default Favourites;
