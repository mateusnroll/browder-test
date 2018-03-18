

# Concepts
- Design responsive
- Design for accessibility
- Give a good base (typography, utility classes) and let people customize it
- Have placeholder assets to let designing the details for later
- Friendly for people that are not tech-savvy, but reward tech-savvy people
- Convention over configuration
- Reuse base styles and componets (if you're designing a new screen for an existing app)
- Be very, very interactive. As close to production as possible while keeping it untangled from too much dev complexity


# Technology
- Browser live reload
- Modern syntax, but still realatable. No wizardy.
- Design with data (maybe live?)
- Integrate with other software (sketch, figma, illustrator) to get design assets as fast as possible
- Automated accessibility tests



# Folder structure
```
- Browder project
	- browder.json
	- project.js

	+ styles
		- manifest.scss
		- something.scss

	+ pages
		- screen_something.bd.html

	+ layouts
		- main_layout.bd.html

	+ data
		- some_data.json

	+ components
		- my_component.bd (html/css)

	+ assets
		- assets.sketch (illustrator/figma/etc)
		- assets.svg
		+ export
```
