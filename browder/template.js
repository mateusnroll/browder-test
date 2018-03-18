const fs         = require('fs')
const handlebars = require('handlebars')
const jsdom      = require('jsdom')
const { JSDOM }  = jsdom

class Template {
	constructor(templateName, options = {}) {
		this.template = this.findTemplate(templateName)
		// this.dataSource = this.findDataSource()
	}

	findTemplate(templateName) {
		return fs.readFileSync(`./templates/${templateName}.html`, 'utf8')
	}

	findDataSource() {
		const doc = new JSDOM(this.template).window.document
		const dataSourceName = doc.querySelector('script[type="browder/json"]').src
		const dataSourceRaw = fs.readFileSync(`./data/${dataSourceName}`, 'utf8')
		return JSON.parse(dataSourceRaw)
	}

	prepare(pageContent) {
		const finalTemplate = this.template
			.replace('{{yield}}', pageContent)
			.replace('{{style}}', '<link rel="stylesheet" type="text/css" href="/style.css">')

		return finalTemplate
		
		const compiled = handlebars.compile(finalTemplate)
		return compiled(this.dataSource)
	}
}

module.exports = Template