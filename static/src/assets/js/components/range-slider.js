import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

document.addEventListener("DOMContentLoaded", function () {
	const stepsSlider = document.querySelector('.js-range-slider'),
		input0 = document.getElementById('input-1'),
		input1 = document.getElementById('input-2'),
		inputs = [input0, input1];

	if (!stepsSlider) {
		return;
	}

	console.log(input0.value, input1.value);
	noUiSlider.create(stepsSlider, {
		start: [+input0.value, +input1.value],
		step: (+input1.getAttribute('max') + +input0.getAttribute('min')) / 100,
		connect: true,
		range: {
			'min': +input0.getAttribute('min'),
			'max': +input1.getAttribute('max')
		},
		format: wNumb({
			decimals: 3,
			thousand: '.',
			prefix: '$ '
		})
	});

	stepsSlider.noUiSlider.on('update', function (values, handle) {
		inputs[handle].value = values[handle];
	});

	inputs.forEach(function (input, handle) {
		input.addEventListener('change', function () {
			stepsSlider.noUiSlider.setHandle(handle, this.value);
		});
	});

}, false);

