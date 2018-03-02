import React from 'react';
import './App.scss';
import MainList from '../../components/MainList/MainList';
import Favourites from '../../components/Favourites/Favourites';
import Menubar from '../../components/Menubar/Menubar';
import Button from '../../components/Button';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favourites: [],
            ApiUrl: 'http://api.icndb.com/jokes/',
            page: 'list',
            autoLoad: false,
            interval: 0,
        };
        this.processFavourites = this.processFavourites.bind(this);
        this.changePage = this.changePage.bind(this);
        this.saveToLocal = this.saveToLocal.bind(this);
        this.toggleAutoLoad = this.toggleAutoLoad.bind(this);
        this.autoLoad = this.autoLoad.bind(this);
        this.enableAutoload = this.enableAutoload.bind(this);
        this.disableAutoload = this.disableAutoload.bind(this);
    }

    componentWillMount() {
        const local = localStorage.getItem('saveFavorites');
        if (local) {
            this.setState({ favourites: JSON.parse(local) });
        }
    }

    enableAutoload() {
        const setTimer = window.setInterval(() => {
            this.iRunEveryFiveSeconds();
        }, 5000);
        this.setState({ interval: setTimer });
    }

    disableAutoload() {
        // console.log('Clearing the timer from state...');
        const clearTimer = window.clearInterval(this.state.interval);
        this.setState({ interval: clearTimer });
    }

    iRunEveryFiveSeconds() {
        if (this.state.favourites.length < 10) {
            fetch('http://api.icndb.com/jokes/random/1')
                .then(response => response.json())
                .then(jokes => {
                    this.setState({
                        favourites: this.state.favourites.concat(jokes.value),
                    });
                });
        }
    }

    autoLoad() {}

    toggleAutoLoad() {
        const status = this.state.autoLoad;

        if (status === true) {
            this.setState({ autoLoad: false });
        } else {
            this.setState({ autoLoad: true });
            // this.autoLoad();
        }
    }

    saveToLocal() {
        const local = this.state.favourites;
        localStorage.setItem('saveFavorites', JSON.stringify(local));
    }

    processFavourites(e, joke, action) {
        if (action === 'add') {
            if (this.state.favourites.length === 10) {
                alert(
                    'To many (more than 10) Chuck Norris Jokes will kill you'
                );
                return null;
            }
            this.setState(
                { favourites: this.state.favourites.concat(joke) },
                () => {
                    this.saveToLocal();
                }
            );
        } else {
            const oldFavourites = this.state.favourites;
            const newFavourites = oldFavourites.filter(
                favourite => favourite !== joke
            );
            this.setState({ favourites: newFavourites }, () => {
                this.saveToLocal();
            });
        }
        // const new_local = this.state.favourites;
    }

    changePage(value) {
        this.setState({ page: value });
    }
    render() {
        if (this.state.page === 'list') {
            return (
                <div className="buttons">
                    <Button onClick={this.enableAutoload}>
                        Enable Autoload
                    </Button>

                    <Button onClick={this.disableAutoload} disabled>
                        Disable Autoload
                    </Button>

                    <Menubar changePage={this.changePage} />
                    <MainList
                        url={this.state.ApiUrl}
                        url_extension="random/10/"
                        favorite={this.setState}
                        favourites={this.state.favourites}
                        processFavourites={this.processFavourites}
                    />
                </div>
            );
        }
        return (
            <div>
                <Menubar changePage={this.changePage} />

                <Favourites
                    favourites={this.state.favourites}
                    processFavourites={this.processFavourites}
                    toggleAutoLoad={this.toggleAutoLoad}
                />
            </div>
        );
    }
}

export default App;
