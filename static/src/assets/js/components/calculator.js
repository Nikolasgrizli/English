export const calculate =
	/**
	 * @param {number} amount Loan amount, $
	 * @param {number} deposit Deposit, $, may be 0
	 * @param {number} interestRate Interest rate, %
	 * @param {number} loanTerm Loan term, years
	 * @param {number} estFee Establishment fee, $
	 * @param {number: .25 | .5 | 1} payFreq Frequency payment (Weekly | Fortnightly | Monthly)
	 * @returns {Object<number>}
	 */
	(amount, deposit, interestRate, loanTerm, estFee, payFreq) => {
		const loanAmount = amount - deposit + estFee;
		const payFreqMultiplier = 12; // Monthly as a base value
		const numberOfPayments = loanTerm * payFreqMultiplier;
		const interestMultiplier = 1 + interestRate / 100 / payFreqMultiplier;

		let repayment = (loanAmount
			* Math.pow(interestMultiplier, numberOfPayments)
			* (interestMultiplier - 1)
			) / (Math.pow(interestMultiplier, numberOfPayments) - 1);
		let totalAmount = repayment * numberOfPayments;
		let interestPaid = totalAmount - loanAmount;

		switch(payFreq) {
			// weekly
			case .25:
				repayment = repayment / 52 * 12;
				break;
			// Fornightly
			case .5:
				repayment = repayment / 26 * 12;
				break;
			default:
				break;
		}

		totalAmount = Number(totalAmount.toFixed(2));
		repayment = Number(repayment.toFixed(2));
		interestPaid = Number(interestPaid.toFixed(2));

		return {
			totalAmount,
			repayment,
			interestPaid
		}
;
};
