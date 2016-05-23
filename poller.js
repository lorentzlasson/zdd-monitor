const request = require('request-promise')
const EventEmitter = require('events').EventEmitter
const util = require('./util')
const ee = new EventEmitter()

let killed = false

const poll = (storage, url, freq, timeout) => {
	(function call(count, errors) {
		if(killed) {
			const result = formatResult(count, errors)
			ee.emit('finish', storage, result)
			return
		}

		count = util.ensureNum(count)
		errors = util.ensureArray(errors)

		const start = Date.now()
		request({
			url,
			timeout,
			method: 'GET'
		})
		.then(() => {
			return 'ok'
		})
		.catch(err => {
			if (unexpectedError(err)) {
				console.log('Unexpected error occured, see result. Shutting down')
				kill()
			}
			err = errorInfo(err)
			errors = errors.concat([err])
			return 'fail'
		})
		.then(msg => {
			count++
			const time = Date.now() - start
			console.log(`count: ${count} - [${msg}] - ${time}`)
			setTimeout(() => {
				call(count, errors)
			}, freq)
		})
	})()
}

const unexpectedError = (err) => {
	if(err.cause) {
		const cause = err.cause.toString()
		if(cause.includes('Invalid URI')) return true
	}
	return false
}

const formatResult = (count, errors) => {
	return {
		count,
		errors: util.prettyEmpty(errors, 'none')
	}
}

const errorInfo = error => {
	return error.message
}

const kill = () => {
	killed = true
}

module.exports = {
	poll,
	kill,
	ee
}
