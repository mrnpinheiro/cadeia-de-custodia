export default class JSONLocalStorage {
    /**
     * Return object from local storage
     *
     * @param {string} key
     *
     * @return {object}
     */
    static get(key) {
        const valueObj = JSON.parse(localStorage.getItem(key));
        return valueObj;
    }

    /**
     * Add object to local storage
     *
     * @param {string} key
     * @param {object} value
     *
     * @return {void}
     */
    static add(key, value) {
        const valueStr = JSON.stringify(value);
        localStorage.setItem(key, valueStr);
    }

    /**
     * Remove item from local storage
     *
     * @param {string} key
     *
     * @return {void}
     */
    static remove(key) {
        localStorage.removeItem(key);
    }
}
