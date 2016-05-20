const prettyEmpty = (array, pretty) => {
	return array.length === 0? pretty: array
}

const ensureArray = array => {
	return array || []
}

const ensureNum = n => {
	return n || 0
}

module.exports = {
	prettyEmpty,
	ensureArray,
	ensureNum
}
