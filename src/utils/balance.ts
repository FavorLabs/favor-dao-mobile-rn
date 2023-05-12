import {toBN} from 'web3-utils'

export function addDecimal(amount: string, decimal = 3) {
    return toBN(amount).div(toBN(10).pow(toBN(decimal))).toString()
}

export function mulDecimal(amount: string, decimal = 3) {
    return toBN(amount).mul(toBN(10).pow(toBN(decimal))).toString()
}

export function compareNumber(amount1: string, amount2: string) {
    return toBN(amount1).gt(toBN(amount2));
}