const fs = require('fs')

const inFs = (filename) => {
	return (data) => {
		filename = `${__dirname}/logs/${filename}.json`
		data = JSON.stringify(data)
		return new Promise((resolve, reject) => {
			fs.writeFile(filename, data, (err) => {
				if(err){
					return reject(err)
				}
				resolve(filename)
			})
		})
	}
}

const inConsole = (data) => {
	data = JSON.stringify(data, null, 2)
	return Promise.resolve(data)
}

const inCosmos = () => {
	return Promise.resolve('The data lives in the cosmos')
}

module.exports = {
	inFs,
	inConsole,
	inCosmos
}
