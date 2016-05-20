const yaml = require('yamljs')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))

const file = fileName => {
	try {
		fs.accessSync(fileName)
		return yaml.load(fileName)
	}
	catch (err) {
		if(err.code === 'ENOENT') {
			return {}
		}
		throw err
	}
}

const args = () => ({
	url: argv.url,
	freq: argv.freq,
	store: argv.store,
	timeout: argv.timeout
})

const envs = env => ({
	url: env.URL,
	freq: parseInt(env.FREQ),
	store: env.STORE,
	timeout: parseInt(env.TIME_OUT)
})

const defaults = {
	freq: 1000,
	store: 'console',
	timeout: 5000
}

const create = (props, ...params) => {
	const config = {}
	props.forEach(par => {
		config[par] = params
		.map(item => item[par])
		.reduce((prev, current) => {
			return prev || current
		})
	})
	return config
}

const pretty = config => {
	const storage = `Will be stored in ${config.store}.`
	const timeout = `Requests timeout after ${config.timeout} millis.`
	const start = `Begins polling ${config.url} every ${config.freq} millis.`

	return {
		storage,
		timeout,
		start
	}
}

module.exports = {
	create,
	pretty,
	file,
	args,
	envs,
	defaults
}
