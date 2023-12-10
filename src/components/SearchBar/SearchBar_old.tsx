import styles from './SearchBar.module.css';

function SearchBar() {
    return (
        <div className={styles.searchBarContainer}>
            <input
                type="search"
                placeholder="Searcha location"
                className={styles.searchBar}
            ></input>
        </div>
    );
}

export default SearchBar;