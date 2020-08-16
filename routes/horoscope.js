const request = require('request')
const aztroJs = require("aztro-js")

let sign = 'aries'
let property = 'color'

//Get today's horoscope

const sign = aztroJs.getTodaysHoroscope(sign, function(res) {
	console.log(res)
})

module.exports = router;