export const utils = {

    // round a number to an amount of digits
    round(num, digits=2) {
        return Math.round((num + Number.EPSILON) * 10**digits) / 10**digits
    },

    // sort an array of objects by object key
    sortObjectArray(arr, key, ascending=true) {
        if (typeof arr[0][key] === 'number') {
            if (ascending) {
                arr.sort((a, b) => a[key] - b[key])
            } else {
                arr.sort((a, b) => b[key] - a[key])
            }
        } else {
            if (ascending) {
                arr.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
            } else {
                arr.sort((b, a) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
            }
        }
        return arr
    },

}