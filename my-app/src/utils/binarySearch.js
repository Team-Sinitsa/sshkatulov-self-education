const numArr = [ 1, 4, 7.1, 11, 16, 23, 34, 42, 49, 51, 64, 77, 82, 93, 99 ]

/**
 * Binary seach on a sorted array
 * @param {number[]} searchArr array to search
 * @param {number} val value to find
 * @returns index of the found value, null if not found
 */
const binarySearch = (searchArr, val) => {
    if (!searchArr.length || val == null) return null
    let maxIndex = searchArr.length
    let minIndex = -1
    while (minIndex < maxIndex - 1) {
        let index = Math.floor((maxIndex + minIndex) / 2)
        if (searchArr[index] < val) {
            minIndex = index
        } else {
            maxIndex = index
        }
    }
    return searchArr[maxIndex] === val ? maxIndex : null
}

console.log(binarySearch(numArr, 1))
