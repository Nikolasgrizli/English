import {
	calculate
} from "./calculator";
import {addCommasToInput, setPercentFieldWidth, onlyNumbersDotCommaAndDelete,removeDecor, addDecor} from "./fieldsHandler";


jQuery(function ($) {

	// pages
	const carCalculator = $('#carCalc');

	// fields
	const price = $('#price'),
		deposit = $('#deposit'),
		rate = $('#rate'),
		term = $('#term'),
		fees = $('#fees'),
		btn = $('#goNum'),
		payFraq = $('#repaymentTabs');

	//output
	const total = $('#total, #totalOutput'),
		payments = $("#payments"),
		line = $('#cdLine'),
		totalFee = $('#totalFee'),
		totalInterestPaid = $('#totalInterestRate');


	function checkPercent(input){
		if(input.getAttribute('data-placeholder') !== '0%') return;
		input.addEventListener('input', () => {
			console.log('percent');
			const intValue = input.value;

			if (intValue <= 100) {
				input.value = `${intValue}`;
			} else {
				input.value = `100`;
			}

		})
	}

	function setError(e, status) {
		if (status) {
			$(e).closest('.calc-form__line').addClass('is-error')
		} else {
			$(e).closest('.calc-form__line').removeClass('is-error')
		}
	}


	function checkFormFields() {
		[price, rate].forEach(e => {
			if (removeDecor($(e).val()) === '' || removeDecor($(e).val()) === 0) {
				setError(e, true);
				return false;
			}
		})
		return true;
	}

	function calculateAndPlace() {
		let obj = {
			price: +removeDecor(price.val()),
			deposit: +removeDecor(deposit.val()),
			rate: +removeDecor(rate.val()),
			term: +term.val(),
			estFee: +removeDecor(fees.val()),
			payFreq: +payFraq.find('.is-active').attr('data-repayment')
		}
		let data = calculate(obj.price, obj.deposit, obj.rate, obj.term, obj.estFee, obj.payFreq)
		// console.log(obj.payFreq);
		let metGreen = ((obj.price / data.totalAmount) * 100).toFixed(2),
			metYellow = ((obj.estFee / data.totalAmount) * 100).toFixed(2),
			metMain = 100 - metGreen - metYellow;


		totalFee.text(fees.val())
		totalInterestPaid.text(addDecor((data.interestPaid).toString(), '$0'))

		line[0].style.setProperty('--met-green', metGreen + '%')
		line[0].style.setProperty('--met-yellow', metYellow + '%')
		line[0].style.setProperty('--met-main', metMain + '%')

		total.text(addDecor((data.totalAmount).toString(), '$0', 2))
		// console.log(data.totalAmount);
		// console.log(data.totalAmount < 0);
		if(isNaN(data.totalAmount) || data.totalAmount < 0){
			$('.cd-num__result#total').addClass('hidden')
			$('#totalError').removeClass('hidden');
			$('#totalOutput,#totalFee,#totalInterestRate').text('----')
		}
		payments.text(addDecor(((data.repayment).toFixed(2)).toString(), '$0', 2))
		if(isNaN(data.repayment) || data.repayment < 0){
			$('.cd-num__result#payments').addClass('hidden')
			$('#paymentError').removeClass('hidden')
		}


	}

	// end helpers

	if (carCalculator.length) {
		$('.cd-button').addClass('inactive');


		[price, rate].forEach(e => {
			$(e).on('input', () => {
				if (removeDecor($(e).val()) === '' || removeDecor($(e).val()) === 0) {
					setError($(e), true);
				} else {
					setError($(e), false);
					$('#totalError, #paymentError').addClass('hidden')
					$('#total, #payments').removeClass('hidden').text('----')
				}
			});
		});

		$(deposit).on('input', () => {
			$('#totalError, #paymentError').addClass('hidden')
			$('#total, #payments').removeClass('hidden').text('----')
		});
		// const loanFields = [price[0], deposit[0], fees[0]];
		// const percentField = rate[0];
		// const fieldsHandler = new FieldsHandler(loanFields, percentField);




		[price, deposit, rate, fees].forEach(e => {

			e
				.val(addDecor(e.attr('data-value'))) // start
				.on('keydown', onlyNumbersDotCommaAndDelete);
			addCommasToInput(e[0])
			checkPercent(e[0])
		});



		btn.on('click', function () {
			$('.cd-button').removeClass('inactive');
			if (checkFormFields()) {
				calculateAndPlace()
				if(payFraq.offset().top > btn.offset().top){
					$('html, body').animate({scrollTop:payFraq.offset().top - 70},240);
				}
			}
		})
		$('button', payFraq).on('click', function (e) {

			if (checkFormFields()) {
				if (e.target.classList.contains('cd-button')) {
					$('button.is-active', payFraq).removeClass('is-active');
					$(e.target).addClass('is-active');
				}
				calculateAndPlace()
			}
		})

		$('[href*="/go/matching-engine"]', carCalculator).on('click', (e) => {
			let output = document.getElementById('price').value;
			e.target.target = '_blank';
			if (!isNaN(removeDecor(output))) {
				let sum = +removeDecor(output);
				let start = +removeDecor(deposit.val());
				let final = 0;
				console.log(start);
				if ((sum - start) > 0) {
					final = sum - start;
				}
				let link = 'https://www.money.com.au/matching-engine?loan_amount=' + final.toFixed(0);
				e.target.href = link;
			}
			return true;

		})

		// console.log('before');
		setPercentFieldWidth()
		// console.log('after');
	}
})
