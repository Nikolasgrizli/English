export class MagicTriangle {
	constructor(selector) {
		this.selector = selector;
		this.elements = document.querySelectorAll(selector);
		this.isHovering = new Array(this.elements.length).fill(false);
		this.debugging = false;

		// Bind event listeners to this object
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleResize = this.handleResize.bind(this);

		// Attach event listeners to each element
		this.elements.forEach((element, index) => {
			element.addEventListener('mouseenter', this.handleMouseEnter);
			element.addEventListener('mouseleave', this.handleMouseLeave);
			this.isHovering[index] = false;
		});

		window.addEventListener('resize', this.handleResize);
	}

	handleMouseEnter(event) {
		const index = Array.from(this.elements).indexOf(event.target);
		if (index === -1) return;

		// Calculate percentages
		const widthPercent = event.target.offsetWidth / window.innerWidth * 100;
		const positionPercent = event.target.offsetLeft / window.innerWidth * 100;

		// Set css variables and add class
		document.documentElement.style.setProperty('--ls', `${positionPercent}%`);
		document.documentElement.style.setProperty('--le', `${positionPercent + widthPercent}%`);
		event.target.classList.add('is-magic-triangle');
		this.isHovering[index] = true;

		// Debugging mode: hide other elements
		if (this.debugging) {
			Array.from(this.elements).forEach((element, i) => {
				if (i !== index) {
					element.style.pointerEvents = 'none';
					element.style.opacity = '0.5';
				}
			});
		}
	}

	handleMouseLeave(event) {
		const index = Array.from(this.elements).indexOf(event.target);
		if (index === -1) return;


		// Debugging mode: restore other elements
		if (!this.debugging) {
			// Clear css variables and remove class
			document.documentElement.style.removeProperty('--ls');
			document.documentElement.style.removeProperty('--le');
			event.target.classList.remove('is-magic-triangle');
			this.isHovering[index] = false;
		}
	}

	handleResize() {
		// Recalculate css variables for all hovering elements
		this.isHovering.forEach((hovering, index) => {
			if (hovering) {
				const widthPercent = this.elements[index].offsetWidth / window.innerWidth * 100;
				const positionPercent = this.elements[index].offsetLeft / window.innerWidth * 100;
				document.documentElement.style.setProperty('--ls', `${positionPercent}%`);
				document.documentElement.style.setProperty('--le', `${positionPercent + widthPercent}%`);
			}
		});
	}

	toggleDebug() {
		this.debugging = !this.debugging;
		if (this.debugging) {
			this.elements.forEach((element) => {
				element.style.pointerEvents = 'auto';
				element.style.opacity = '1';
			});
		} else {
			this.elements.forEach((element, index) => {
				if (!this.isHovering[index]) {
					element.style.pointerEvents = 'none';
					element.style.opacity = '0.5';
				}
			});
		}
	}
}
