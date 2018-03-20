const fs         = require('fs')
const handlebars = require('handlebars')
const Template   = require('./template')
const jsdom      = require('jsdom')
const { JSDOM }  = jsdom

class Page {
	constructor(pageName, templateName = 'default', options = {}) {
		this.page       = this.buildPage(pageName)
		this.dataSource = this.findDataSource()
	}

	render() {
		const template = handlebars.compile(this.page)
		return template(this.dataSource)
	}

	findDataSource() {
		const doc = new JSDOM(this.page).window.document
		const dataSourceName = doc.querySelector('script[type="browder/json"]').src
		const dataSourceRaw = fs.readFileSync(`./data/${dataSourceName}`, 'utf8')
		return JSON.parse(dataSourceRaw)
	}

	buildPage(pageName) {
		const pageFile = this.findPage(pageName)
		const template = new Template("default")
		return template.prepare(pageFile)
	}

	findPage(pageName) {
		return fs.readFileSync(`./pages/${pageName}.html`, 'utf8')
	}

	static handleRoute(req, res) {
		try {
			const name = Page.templateNameFromRoute(req)
			const page = new Page(name)
			res.send(page.render())
		} catch (err) {
			switch(err.errno) {
				case -2:
					res.status(404).send('NOT FOUND')
					break
				default:
					res.status(500).send('INTERNAL SERVER ERROR')
			}

		}
	}

	static templateNameFromRoute(req) {
		const route = req.originalUrl
		const subroutes = route.split('/')
		return subroutes[subroutes.length - 1]
	}
}

module.exports = Page
