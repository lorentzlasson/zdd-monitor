const poller = require('./poller')
const store = require('./store')
const config = require('./config')
let storage = store.inCosmos

const init = () => {
	const configs = config.create(
		config.props,
		config.args(),
		config.envs(process.env),
		config.file(__dirname +'/config.yml'),
		config.defaults
	)

	config.validate(configs)

	const pretty = config.pretty(configs)
	console.log(`${pretty.start}\n${pretty.storage}\n${pretty.timeout}\n`)

	switch(configs.store){
		case 'fs':
			const filename = `monitor_${new Date().toISOString()}`
			storage = store.inFs(filename)
			break
		case 'console':
			storage = store.inConsole
			break
	}

	poller.poll(configs.url, configs.freq, configs.timeout)
}

poller.ee.on('finish', result => {
	storage(result)
	.then((res) => {
		return `stored\n${res || ''}`
	})
	.catch(err => {
		return `error storing\n${err}`
	})
	.then(msg => {
		console.log(msg)
		shutdown()
	})
})

const shutdown = () => {
	process.exit(0)
}

process.on('SIGINT', () => {
	poller.kill()
})

init()
