const graphArr = [[1, [21, 22, [231, 232, 233]], 3], 0, [4, 5, [61, 62]], [7, 8, 9]]

/**
 * Breadth-first graph traversing
 * @param {*} search graph represented as an array of numbers and another arrays
 * @param {number} val number value to find
 * @returns the value if it found in the graph, undefined if not
 */
const breadthFirstSearch = (search, val) => {
    const queue = []
    queue.push(search)
    while (queue.length) {
        let node = queue.shift()
        if (node === val) return node
        else if (node.length) {
            for (let child of node) {
                queue.push(child)
            }
        }
    }
}

console.log(breadthFirstSearch(graphArr, 232))
