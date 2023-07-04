// helpers
export function countCommas(str) {
	return str.split(",").length - 1;
}
export function addCommasToInput(input) {
	// add event listener for input changes
	input.addEventListener('input', () => {
		const selectionStart = input.selectionStart;
		// get the input value
		let value = input.value;
		// remove all commas from the input
		const startCommas = countCommas(value);

		value = value.replace(/,/g, '');
		if(value !== ''){
			// check dot in the end
			let check = value.endsWith('.');

			// format the value with commas for thousands separator
			value = parseFloat(value).toLocaleString("en-US", {
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			});
			if(check){
				value += '.'
			}
		}
		const endCommas = countCommas(value);
		const selectionGap = endCommas - startCommas;
		// console.log(selectionGap);
		// set the input value to the formatted value
		input.value = value;

		input.setSelectionRange(selectionStart+selectionGap, selectionStart+selectionGap);

	});
}

export function setPercentFieldWidth() {
	const percentField = document.querySelector('#rate');
	const parentElement = percentField.parentElement;

	// Create a new span element to hold the calculated width value
	const widthSpan = document.createElement('span');
	widthSpan.classList.add('copy-percent');
	parentElement.appendChild(widthSpan);

	function setSize() {
		// Copy the value of the input element to the widthSpan
		widthSpan.textContent = percentField.value;

		// Get the width of the widthSpan
		const width = widthSpan.offsetWidth;

		// console.log('percentSize' ,`${width >= 10? width : 10}px`);

		// Set the --percentSize CSS variable on the parent element
		parentElement.style.setProperty('--percentSize', `${width >= 10? width : 10}px`);
	}
	// Listen for changes to the percentField input element
	percentField.addEventListener('input', setSize);

	setTimeout(() => {
		setSize()
	}, 10);

}

export function onlyNumbersDotCommaAndDelete(event) {
	// Allow: backspace, delete, tab, escape, enter, dot, comma, numbers, padNumbers, arrowLeft and Right
	var allowedKeys = [8, 46, 9, 27, 13, 110, 188, 190, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 37, 39];

	// Allow: Ctrl+A, Command+A
	if ((event.ctrlKey === true || event.metaKey === true) && (event.which === 65 || event.which === 97)) {
		return true;
	}

	// Ensure that it is a number or dot or comma
	var charCode = (event.which) ? event.which : event.keyCode;
	if (allowedKeys.indexOf(charCode) === -1) {
		event.preventDefault();
	}

	// Ensure that there is only one dot or comma
	var input = event.target.value;
	var dotIndex = input.indexOf('.');
	var commaIndex = input.indexOf(',');
	if (dotIndex !== -1 && charCode === 190) {
		event.preventDefault();
	}
	if (commaIndex !== -1 && charCode === 188) {
		event.preventDefault();
	}

	const inputingNum = event['key'];
	const currentValue = +removeDecor(input);
	const maxLength = parseInt(event.target.getAttribute('data-maxlength'), 10) || 99999999;

	if(!isNaN(inputingNum)){
		const lastDot = event.target.value.endsWith(".") ? '.' : '';
		const newVal = currentValue.toString() + lastDot + inputingNum
		if(+newVal > maxLength){
			if(event.target.getAttribute('data-placeholder') === '0%'){

			} else {
				event.preventDefault();
			}
		}

	}

}


export const removeDecor =
		/**
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		(str) => {
			return str.replace(/[,$%\s]/g, '')
		}

export const addDecor =
		/**
		 *
		 * @param {string} str
		 * @param {string} setting
		 * @returns {string}
		 */
		(str, setting, output = 0) => {
			const formattedNumber = (+str).toLocaleString("en-US", {
				maximumFractionDigits: 2,
				minimumFractionDigits: output
			});
			if (setting === '$0') {
				return `$${(formattedNumber)}${str.endsWith(".")?'.':''}`
			} else if (setting === '0%') {
				return `${(formattedNumber)}${str.endsWith(".")?'.':''}%`
			} else {
				return `${(formattedNumber)}${str.endsWith(".")?'.':''}`
			}
		}
