// import NiceSelect from "nice-select2";
import NiceSelect from "nice-select2/dist/js/nice-select2";



const nSel = document.querySelectorAll('.js-custom-select');
if(nSel.length){
	nSel.forEach(elem => {
		const options = JSON.parse(elem.dataset.options);
		const elSel = new NiceSelect(elem, {searchable: options.searchable, placeholder: options.placeholder});


		// const dropdown = elem.closest('.customSelect').querySelector('.nice-select-dropdown');
		// if(dropdown){
		// 	dropdown.insertAdjacentHTML('beforeend', `<div class="review-btns">
		// 		<button class="btn btn_reset" type="button">Clear</button>
		// 		<button class="btn btn_primary" type="button">Apply</button>
		// 	</div>`);
		// }

		// elem.addEventListener('change', function (e) {
			// console.log(elSel.selectedOptions)
		// 	let arr = [];
		// 	for ( var i = 0; i < elSel.selectedOptions.length; i++) {
				// console.log( elSel.selectedOptions[i].data.value);
		// 		arr.push(elSel.selectedOptions[i].data.value);
		// 	}
		// 	console.log(arr.join(', '));
			// for ( var i = 0; i < this.selectedOptions.length; i++) {
			// 	console.log( this.selectedOptions[i].value);
			// }
		// })
	})
}


const pseudoSelect = document.querySelector('.js-range-select');
if(!!pseudoSelect){
	pseudoSelect.addEventListener('click', function (e) {
		pseudoSelect.classList.add('open');
	}, false);
	const closePseudoSelect = function () {
		pseudoSelect.classList.remove('open');
	}
	document.addEventListener('click', function(e){
		if (!pseudoSelect.contains(e.target)) {
			closePseudoSelect();
		}
	});


	const close = pseudoSelect.querySelector('.js-btn-apply');
	if(!!close){
		console.log(close);
		close.addEventListener('click', ()=>{
			setTimeout(()=>{
				closePseudoSelect();
			}, 10);
		});
	}
}



const between = document.querySelector('.js-between-btn');
const tableWordFormation = document.querySelector('.js-wordFormation');
let fromSelect = document.querySelector('.from .js-custom-select');
let toSelect = document.querySelector('.to .js-custom-select');


if(!!tableWordFormation && !!fromSelect && !!toSelect && !!between){

	function filterTable(){
		const 	activeFrom = fromSelect.value,
				activeTo = toSelect.value,
				wrappers = tableWordFormation.querySelectorAll('td[data-type]'),
				filterString = `${activeFrom}-${activeTo}`,
				isMobile = window.matchMedia('(max-width: 767px)').matches,
				tableOverflowContainer = tableWordFormation.querySelector('.review-table__container'),
				tableWidthStep = tableWordFormation.querySelector('table').offsetWidth / 4,
				positionNoun = 0,
				positionVerb = tableWidthStep,
				positionAdjective = tableWidthStep * 2,
				positionAdverb = tableWidthStep * 3;


		if(isMobile){
			console.log(activeTo);
			switch (activeTo) {
				case 'noun':
					tableOverflowContainer.scrollLeft = positionNoun;
					break;
				case 'verb':
					tableOverflowContainer.scrollLeft = positionVerb;
					break;
				case 'adjective':
					tableOverflowContainer.scrollLeft = positionAdjective;
					break;
				case 'adverb':
					tableOverflowContainer.scrollLeft = positionAdverb;
					break;
				default:
					tableOverflowContainer.scrollLeft = 0;
					break;
			}
		}


		wrappers.forEach(elem => {
			const type = elem.dataset.type;
			// console.log(type);
			if(type.includes(filterString)){
				elem.classList.add('active');
			}else{
				elem.classList.remove('active');
			}
		})
	}

	filterTable();

	fromSelect.addEventListener('change', filterTable);
	toSelect.addEventListener('change', filterTable);


	between.addEventListener('click', function (e) {
		between.classList.toggle('between-btn--to');
		between.classList.toggle('between-btn--from');
		[fromSelect, toSelect] = [toSelect, fromSelect];
		filterTable();
	}, false);

}
