export const utils = {

    round(num, digits=2) {
        return Math.round((num + Number.EPSILON) * 10**digits) / 10**digits
    },

}