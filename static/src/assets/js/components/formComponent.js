import {addCommasToInput, setPercentFieldWidth, onlyNumbersDotCommaAndDelete,removeDecor, addDecor} from "./fieldsHandler";

export default class ContactPage {
	constructor() {

	}
	innerFn() {
		const testForms = document.querySelectorAll(".form_js-validate");
		window.formComponent = {
			init: () => {
				testForms.forEach((form) => {

					const fields = form.querySelectorAll("[data-validate]");
					// console.log(fields)

					form.target = '_blank';
					const fieldsSum = form.querySelectorAll("[type='number']");
					[...fieldsSum].forEach(e=>{
						e.type = 'text';
						e.value = (addDecor(e.dataset.value || "0"));
						e.addEventListener('keydown', onlyNumbersDotCommaAndDelete);
						addCommasToInput(e)
						formComponent.setToEmpty(e);

						e.closest('.form__field').classList.add('form__field_active')
						e.closest('.form__field').classList.add('calc-form__field_pre')
					})
					formComponent.validationOnSubmit(fields, form);
					formComponent.checkActive(fields, form);
					formComponent.validateOnEntry(fields, form);
				});
			},

			modelValidation: (validationFields, form) => {
				validationFields.forEach((field) => {
					formComponent.validateFields(field);
				});
				let checks = form.querySelector(".error:not(.hidden)");
				if (form.contains(checks)) {
					return false;
				} else {
					// formSending(form);
					if(form.classList.contains('js-pseudo-form')){
						let val = +removeDecor(document.getElementById('amount').value);
						let link = document.getElementById('amount').dataset.link || 'https://www.money.com.au/matching-engine?loan_amount=';
						if(!isNaN(val)){
							val = val.toFixed(0);
							document.getElementById('amount').value = val;
						}
						form.action = link;
						return true;
					}
				}
			},

			validationOnSubmit: (validationFields, form) => {
				form.addEventListener("submit", (e) => {
					if(formComponent.modelValidation(validationFields, form)){
						setTimeout(() => {
							document.getElementById('amount').value = addDecor(document.getElementById('amount').value);

						}, 25);

						return true;
					} else {
						e.preventDefault();
						return false;
					}
				});
			},

			checkActive: (validationFields, form) => {
				validationFields.forEach((field) => {
					// console.log(field);
					field.onfocus = function () {
						field.closest('.form__field').classList.add('form__field_active');
						// console.log(this);
					}
					field.onblur = function () {
						if (field.value == '')
							field.closest('.form__field').classList.remove('form__field_active');
					}

				});
			},

			validateOnEntry: (validationFields, form) => {
				validationFields.forEach((field) => {
					field.addEventListener("input", (event) => {
						formComponent.validateFields(field);
					});
				});
			},

			setToEmpty: (input) =>{
				if(+input.dataset.value === 0) return;

				input.dataset.hoverRemoveDefault = '1';

				input.addEventListener('focus', event=>{
					if(event.target.dataset.hoverRemoveDefault !== '1') return;
					event.target.dataset.hoverRemoveDefault = '0';
					event.target.value = 0;
				})

			},

			validateFields: (input) => {
				const data = input.dataset.validate;
				document.getElementById('amount').name = 'loan_amount';
				if (~data.indexOf("no-empty")) {
					if (removeDecor(input.value) === '' || removeDecor(input.value) < 1) {

					// if (input.value.trim() === "") {
						formComponent.setStatus(input, "error");
					} else {
						formComponent.setStatus(input, "success");
					}
				}
				if (~data.indexOf("number")) {
					const numReg = /^\d+$/;
					if (numReg.test(input.value) && input.value.trim() !== "") {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}
				if (~data.indexOf("email")) {
					const emailReg = /\S+@\S+\.\S+/;
					if (emailReg.test(input.value) && input.value.trim() !== "") {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}

				if (~data.indexOf("select")) {
					if (input.value === "") {
						formComponent.setStatus(input, "error");
					} else {
						formComponent.setStatus(input, "success");
					}
				}
				if (~data.indexOf("checkbox")) {
					// console.log(input.checked);
					if (input.checked) {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}

				if (~data.indexOf("phone")) {
					const phoneReg =
						/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
					if (phoneReg.test(input.value) && input.value.trim() !== "") {
						formComponent.setStatus(input, "success");
					} else {
						formComponent.setStatus(input, "error");
					}
				}
			},

			// set/remove class final fx
			setStatus: (field, status) => {
				const errorMessage = field.parentElement.querySelector(".error");

				// console.log(errorMessage);
				if (status === "success") {
					field.classList.remove("input-error");
					errorMessage.classList.add("hidden");
				}
				if (status === "error") {
					field.classList.add("input-error");
					errorMessage.classList.remove("hidden");
				}
			},
		};

		formComponent.init();
		// console.log('test');
	}

}
