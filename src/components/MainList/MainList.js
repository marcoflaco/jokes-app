import React from 'react';
import ApiCall from '../GenericComponents/ApiCall/ApiCall';
import styles from './MainList.scss';

class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
        };
        this.LoadApi = this.LoadApi.bind(this);
    }

    LoadApi() {
        fetch(this.props.url + this.props.url_extension)
            .then(response => response.json())
            .then(jokes => {
                this.setState({ jokes: jokes.value });
            });
    }

    render() {
        if (!this.props.url) {
            return <div>loading</div>;
        }
        const jokes = this.state.jokes.map((joke, index) => (
            <p key={index} className={styles.List}>
                {joke.joke} - {joke.id}
                {this.props.favourites.includes(joke) ? (
                    <button
                        className={styles.Delete}
                        onClick={e =>
                            this.props.processFavourites(e, joke, 'delete')
                        }
                    >
                        Delete from favourites
                    </button>
                ) : (
                    <button
                        className={styles.Favourites}
                        onClick={e =>
                            this.props.processFavourites(e, joke, 'add')
                        }
                    >
                        Add joke #{joke.id} to favourites
                    </button>
                )}
            </p>
        ));
        return (
            <div>
                <button className={styles.ShowJokes} onClick={this.LoadApi}>
                    Show new list of jokes
                </button>
                <div>{jokes}</div>
            </div>
        );
    }
}

export default MainList;
