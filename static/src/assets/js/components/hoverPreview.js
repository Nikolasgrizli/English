export class HoverPreview {
	constructor(parentSelector, filterSelector, childSelector) {
		// Get all elements matching the parent selector
		this.parentElements = document.querySelectorAll(parentSelector);

		// Save the child selector for later use
		this.parentSelector = parentSelector;
		this.childSelector = childSelector;
		this.filterSelector = filterSelector;

		// Create a new element to use for copying
		this.newElement = document.createElement('div');
		this.newElement.classList.add('hover-copy');

		// Add the new element to the body
		document.body.appendChild(this.newElement);

		// Bind event handlers to 'this' object so they can be easily removed later
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);

		// Add event listeners to each parent element
		this.parentElements.forEach(parentElement => {
			parentElement.addEventListener('mouseover', this.handleMouseOver);
			parentElement.addEventListener('mousemove', this.handleMouseMove);
			parentElement.addEventListener('mouseout', this.handleMouseOut);
		});
	}

	handleMouseOver(event) {
		// Get the child element from the hovered parent element
		const childElement = event.currentTarget.querySelector(this.childSelector);
		const style =  getComputedStyle(childElement.closest('.section'));
		this.newElement.style.backgroundColor = style.backgroundColor;


		// Copy the contents of the child element and paste into the new element
		this.newElement.innerHTML = childElement.innerHTML;
	}

	handleMouseMove(event) {
		// Set the position of the new element to the bottom-right corner of the cursor
		this.newElement.style.left = `${event.clientX + 10}px`;
		this.newElement.style.top = `${event.clientY + 10}px`;
		let wrap = event.target.closest(this.parentSelector);
		if (!wrap.classList.contains(this.filterSelector)) {
			this.newElement.classList.add('hover-copy--active');
		}
	}

	handleMouseOut() {
		// Clear the contents of the new element
		this.newElement.innerHTML = '';
		this.newElement.classList.remove('hover-copy--active');
	}

	removeEventListeners() {
		// Remove event listeners from each parent element
		this.parentElements.forEach(parentElement => {
			if (!parentElement.classList.contains(this.filterSelector)) {
				parentElement.removeEventListener('mouseover', this.handleMouseOver);
				parentElement.removeEventListener('mousemove', this.handleMouseMove);
				parentElement.removeEventListener('mouseout', this.handleMouseOut);
			}
		});
	}
}
