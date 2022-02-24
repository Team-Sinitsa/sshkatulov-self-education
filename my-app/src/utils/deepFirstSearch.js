const graphArr = [[1, [21, 22, [231, 232, 233]], 3], 0, [4, 5, [61, 62]], [7, 8, 9]]

/**
 * Deep-first graph traversing
 * @param {*} search graph represented as an array of numbers and another arrays
 * @param {number} val number value to find
 * @returns the value if it found in the graph, undefined if not
 */
const deepFirstSearch = (search, val) => {
    if (search === val) return search
    while (search.length) {
        let result = deepFirstSearch(search.shift(), val)
        if (result != null) return result
    }
}

console.log(deepFirstSearch(graphArr, 61))
