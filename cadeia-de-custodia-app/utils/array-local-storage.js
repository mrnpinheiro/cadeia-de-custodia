import JSONLocalStorage from './json-local-storage';

export default class ArrayLocalStorage {
    /**
     * Return array from local storage
     *
     * @param {string} key
     *
     * @return {object[]}
     */
    static get(key) {
        return JSONLocalStorage.get(key);
    }

    /**
     * Add item to local storage array
     *
     * @param {string} key
     * @param {object} value
     *
     * @return {void}
     */
    static push(key, value) {
        const array = JSONLocalStorage.get(key) || [];

        array.push(value);

        JSONLocalStorage.add(key, array);
    }

    /**
     * Remove item from local storage array
     *
     * @param {number} index
     *
     * @return {void}
     */
    static remove(index) {
        const array = JSONLocalStorage.get(key);

        if (array && array.length >= index) {
            array.splice(index, 1);

            JSONLocalStorage.add(key, array);
        }
    }
}
