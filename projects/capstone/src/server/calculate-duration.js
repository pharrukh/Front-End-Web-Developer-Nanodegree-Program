const moment = require('moment')

export function calculateDuration(from, to) {
    return moment(to).diff(moment(from), 'days') + 1
}