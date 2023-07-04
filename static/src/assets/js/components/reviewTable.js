// var dataExample = {
// 	"model_release_year":2023,
// 	"make":"Alfa Romeo",
// 	"model":"Tonale",
// 	"variant":"MHEV",
// 	"price":"$49 900",
// 	"engine_displacement":1.5,
// 	"engine_configuration":"4cyl",
// 	"transmission_type_description":"Auto",
// 	"side_door_no":4,
// 	"seating_capacity":5,
// 	"body_style":"SUV",
// 	"drivetrain":"2WD",
// 	"fuel_type":"Petrol 95RON",
// 	"fuel_consumption_combined":5.6,
// 	"fuel_consumption_urban":5.5,
// 	"electric_range":"",
// 	"annual_fuel_cost":1411
// }


// const htmlSchemaRow = `
// 	<tr class="review-table__body-row">
// 		<td><span>${model_release_year}</span></td>
// 		<td><span>${make}</span></td>
// 		<td><span>${model}</span></td>
// 		<td><span>${variant}</span>
// 			<div class="iconWithTooltip js-tooltipster tooltipstered" data-tooltip-content="#tooltip_content-${uniqHash1}">
// 			<svg class="svg-icon">
// 				<use xlink:href="#info"></use>
// 			</svg>
// 			<div class="tooltip_templates tooltip_templates_icon-description">
// 				<div class="p-2" id="tooltip_content-${uniqHash1}">
// 					<table>
// 						<tbody>
// 							<tr>
// 								<td><span>Engine Displacement</span></td>
// 								<td><span>${engine_displacement}</span></td>
// 							</tr>
// 							<tr>
// 								<td><span>Engine Configuration</span></td>
// 								<td><span>${engine_configuration}</span></td>
// 							</tr>
// 							<tr>
// 								<td><span>Transmission Type Description</span></td>
// 								<td><span>${transmission_type_description}</span></td>
// 							</tr>
// 							<tr>
// 								<td><span>Side Door No</span></td>
// 								<td><span>${side_door_no}</span></td>
// 							</tr>
// 							<tr>
// 								<td><span>Seating Capacity</span></td>
// 								<td><span>${seating_capacity}</span></td>
// 							</tr>
// 							<tr>
// 								<td><span>Body Style</span></td>
// 								<td><span>${body_style}</span></td>
// 							</tr>
// 							<tr>
// 								<td><span>Drivetrain</span></td>
// 								<td><span>${drivetrain}</span></td>
// 							</tr>
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 			</div>
// 		</td>
// 		<td><span>${price}</span></td>
// 		<td>
// 			${getFuelTypeIcons(fuel_type)}
// 		</td>
// 		<td><span>${fuel_consumption_combined}</span></td>
// 		<td><span>${fuel_consumption_urban}</span></td>
// 		<td><span>${electric_range}</span></td>
// 		<td><span>${annual_fuel_cost}</span></td>
// 	</tr>`

// const fuelGas = `
// 	<svg class="review-table__fuel-icon">
//  		<use xlink:href="#fuel_gas"></use>
//  	</svg>
// `;
// const fuelElectricity = `
// 	<svg class="review-table__fuel-icon">
//  		<use xlink:href="#fuel_electricity"></use>
//  	</svg>
// `;
// const fuelDiesel = `
// 	<svg class="review-table__fuel-icon">
//  		<use xlink:href="#fuel_diesel"></use>
//  	</svg>
// `;

// const paginationLayout = (activePage,allPages) => {
// 	return `
// 		<div class="review-table__pagination">
// 			<div class="review-table__pagination__item review-table__pagination__item--prev">
// 				<svg class="svg-icon">
// 					<use xlink:href="#arrow_left"></use>
// 				</svg>
// 			</div>
// 			${allPages.map((page) => {
// 				return `<div class="review-table__pagination__item review-table__pagination__item--number ${activePage === page ? 'review-table__pagination__item--active' : ''}">${page}</div>`
// 			}).join('')}
// 			<div class="review-table__pagination__item review-table__pagination__item--next">
// 				<svg class="svg-icon">
// 					<use xlink:href="#arrow_right"></use>
// 				</svg>
// 			</div>
// 		</div>
// 	`
// }

// ReviewTable class that will take in the constructor:
// tableWrapper - table wrapper selector,
// array with objects(data),
// will also have:
// internal variable filteredData (which will have an array of data when loaded, but which will then be overwritten),
// internal variable rowsPerPage (which can also be overwritten later),
// internal variable activePage, which by default will be 1 (but will also be overwritten).

// Class ReviewTable will have the following functionality:
// internal method buildRow, which will take an object (as in the example above called dataExample) and will return the html string for the table according to the htmlSchemaRow scheme
// internal method getFuelTypeIcons which will receive the string, process it as follows - will check the string for matches (in any case) with the words Petrol, Diesel or Electric and for each match will add to the internal variable icons appropriate html code:
// if there is a match for the word Petrol, the html will be added as in the example of the variable fuelGas,
// when matching with Diesel as in the example of the variable fuelDiesel,
// if matching with Electric - fuelElectricity
// The method will return the html code from the icons internal variable. internal method genaratePagination which will take two numbers: activePage and totalLines.
// The method will create the following variables based on the incoming data:
// const count = filteredData.length
// const totalPages = Math.ceil(count / rowsPerPage)
// const calculatedRows = returns the index range of visible lines, which are visible based on the current active page( activePage ), the total number of available lines(filteredData) and the rowsPerPage variable
// The method will generate and add lines (rows ) to a table (tableWrapper tbody ) using buildRow(filteredData) and add them display: none if the line does not fall into the range of the active page( its index is not in the calculatedRows range
// The method will add html code in the following pattern - paginationLayout(activePage,totalPages) at the end of tableWrapper if the number resulting in totalPages is greater than one external method rewriteFilterRows, which will take an array of filters (objects of type column: value) will filter the array data, overwrite the variable filteredData and run the internal function genaratePagination.
// internal method which will write into the variable canSorting all th with the class .review-table__sort-th and hang click events on them which will sort all the lines in the table by a certain cell (the cell number is the same as the number of the cell where the .review-table__sort-th is), overwrite the variable filteredData and run the internal function genaratePagination. Only one sorting can be active, after sorting active page is always first, there is sorting by number(a-b) only. When you click again on already active .review-table__sort-th there is sorting (b-a).


class ReviewTable {
	constructor(tableWrapper, data) {
		this.tableWrapper = tableWrapper;
		this.data = data;
		this.filteredData = data;
		this.rowsPerPage = 10;
		this.activePage = 1;

		this.buildRow = this.buildRow.bind(this);
		this.generateHash = this.generateHash.bind(this);
		this.getFuelTypeIcons = this.getFuelTypeIcons.bind(this);
		this.generatePagination = this.generatePagination.bind(this);
		this.rewriteFilterRows = this.rewriteFilterRows.bind(this);

		this.render();
		this.generatePagination();
		this.setupSorting();
	}
	generateHash() {
		const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let hash = '';
		for (let i = 0; i < 8; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			hash += characters.charAt(randomIndex);
		}
		return hash;
	}


	buildRow(data) {
		const {
			model_release_year,
			make,
			model,
			variant,
			engine_displacement,
			engine_configuration,
			transmission_type_description,
			side_door_no,
			seating_capacity,
			body_style,
			drivetrain,
			price,
			fuel_type,
			fuel_consumption_combined,
			fuel_consumption_urban,
			electric_range,
			annual_fuel_cost
		} = data;
		const uniqHash = this.generateHash();

		return `
		<tr class="review-table__body-row">
		  <td><span>${model_release_year}</span></td>
		  <td><span>${make}</span></td>
		  <td><span>${model}</span></td>
		  <td><span>${variant}</span>
			<div class="iconWithTooltip js-tooltipster" data-tooltip-content="#tooltip_content-${uniqHash}">
			  <svg class="svg-icon">
				<use xlink:href="#info"></use>
			  </svg>
			  <div class="tooltip_templates tooltip_templates_icon-description">
				<div class="p-2" id="tooltip_content-${uniqHash}">
				  <table>
					<tbody>
					  <tr>
						<td><span>Engine Displacement</span></td>
						<td><span>${engine_displacement}</span></td>
					  </tr>
					  <tr>
						<td><span>Engine Configuration</span></td>
						<td><span>${engine_configuration}</span></td>
					  </tr>
					  <tr>
						<td><span>Transmission Type Description</span></td>
						<td><span>${transmission_type_description}</span></td>
					  </tr>
					  <tr>
						<td><span>Side Door No</span></td>
						<td><span>${side_door_no}</span></td>
					  </tr>
					  <tr>
						<td><span>Seating Capacity</span></td>
						<td><span>${seating_capacity}</span></td>
					  </tr>
					  <tr>
						<td><span>Body Style</span></td>
						<td><span>${body_style}</span></td>
					  </tr>
					  <tr>
						<td><span>Drivetrain</span></td>
						<td><span>${drivetrain}</span></td>
					  </tr>
					</tbody>
				  </table>
				</div>
			  </div>
			</div>
		  </td>
		  <td><span>${price}</span></td>
		  <td>${this.getFuelTypeIcons(fuel_type)}</td>
		  <td><span>${fuel_consumption_combined}</span></td>
		  <td><span>${fuel_consumption_urban}</span></td>
		  <td><span>${electric_range}</span></td>
		  <td><span>${annual_fuel_cost}</span></td>
		</tr>
	  `;
	}

	getFuelTypeIcons(fuel_type) {
		const fuelGas = `
		<svg class="review-table__fuel-icon">
		  <use xlink:href="#fuel_gas"></use>
		</svg>
	  `;
		const fuelElectricity = `
		<svg class="review-table__fuel-icon">
		  <use xlink:href="#fuel_electricity"></use>
		</svg>
	  `;
		const fuelDiesel = `
		<svg class="review-table__fuel-icon">
		  <use xlink:href="#fuel_diesel"></use>
		</svg>
	  `;

		let icons = '';

		if (fuel_type.toLowerCase().includes('petrol')) {
			icons += fuelGas;
		}
		if (fuel_type.toLowerCase().includes('diesel')) {
			icons += fuelDiesel;
		}
		if (fuel_type.toLowerCase().includes('electric')) {
			icons += fuelElectricity;
		}

		return icons;
	}

	generatePagination() {
		const count = this.filteredData.length;
		const totalPages = Math.ceil(count / this.rowsPerPage);


		if(!!this.tableWrapper.querySelector('.review-table__pagination')) return;


		const paginationContainer = document.createElement('div');
		paginationContainer.classList.add('review-table__pagination');


		if (totalPages > 1) {
			const prevButton = document.createElement('button');
			prevButton.classList.add('review-table__pagination__item', 'review-table__pagination__item--prev');
			prevButton.innerHTML = `
			<svg class="svg-icon">
			  <use xlink:href="#sort-bottom"></use>
			</svg>
		  `;
			paginationContainer.appendChild(prevButton);

			const firstPageButton = document.createElement('button');
			firstPageButton.classList.add('review-table__pagination__item', 'review-table__pagination__item--number');
			if (this.activePage === 1) {

				firstPageButton.classList.add('review-table__pagination__item--active');
			}
			firstPageButton.textContent = '1';
			paginationContainer.appendChild(firstPageButton);

			const secondPageButton = document.createElement('button');
			secondPageButton.classList.add('review-table__pagination__item', 'review-table__pagination__item--number');
			if (this.activePage === 2) {
				secondPageButton.classList.add('review-table__pagination__item--active');
			}
			secondPageButton.textContent = '2';
			paginationContainer.appendChild(secondPageButton);

			if (totalPages > 4) {
				const ellipsisItem = document.createElement('div');
				ellipsisItem.classList.add('review-table__pagination__item', 'review-table__pagination__item--ellipsis');
				ellipsisItem.textContent = '...';
				paginationContainer.appendChild(ellipsisItem);
			} else {
				for (let page = 2; page <= totalPages - 1; page++) {
					const pageButton = document.createElement('button');
					pageButton.className = `review-table__pagination__item review-table__pagination__item--number ${this.activePage === page ? 'review-table__pagination__item--active' : ''}`;
					pageButton.innerText = page;
					pagination.appendChild(pageButton);
				}
			}

			if(totalPages > 3){
				const penultimatePageButton = document.createElement('button');
				penultimatePageButton.classList.add('review-table__pagination__item', 'review-table__pagination__item--number');
				if(this.activePage === totalPages - 1){
					penultimatePageButton.classList.add('review-table__pagination__item--active');
				}
				penultimatePageButton.textContent = totalPages - 1;
				paginationContainer.appendChild(penultimatePageButton);

			}

			const lastPageButton = document.createElement('button');
			lastPageButton.classList.add('review-table__pagination__item', 'review-table__pagination__item--number');
			if (this.activePage === totalPages) {
				lastPageButton.classList.add('review-table__pagination__item--active');
			}
			lastPageButton.textContent = totalPages;
			paginationContainer.appendChild(lastPageButton);


			const nextButton = document.createElement('button');
			nextButton.classList.add('review-table__pagination__item', 'review-table__pagination__item--next');
			nextButton.innerHTML = `
			  <svg class="svg-icon">
				<use xlink:href="#sort-top"></use>
			  </svg>
			`;
			paginationContainer.appendChild(nextButton);
		}


		this.tableWrapper.appendChild(paginationContainer);


		paginationContainer.addEventListener('click', (event) => {
			const target = event.target;
			if (target.tagName === 'BUTTON') {
				if (target.classList.contains('review-table__pagination__item--number')) {
					const pageNumber = parseInt(target.textContent);
					this.activePage = pageNumber;
				} else if (target.classList.contains('review-table__pagination__item--prev')) {
					if (this.activePage > 1) {
						this.activePage -= 1;
					}
				} else if (target.classList.contains('review-table__pagination__item--next')) {
					if (this.activePage < totalPages) {
						this.activePage += 1;
					}
				}

				this.render();
			}
		});
	}


	rewriteFilterRows(filters) {
		this.filteredData = this.data.filter((item) => {
			for (let key in filters) {
				if (item[key] !== filters[key]) {
					return false;
				}
			}
			return true;
		});

		this.activePage = 1;
		this.render();
		this.generatePagination();
	}

	getVisibleRows() {
		const start = (this.activePage - 1) * this.rowsPerPage;
		const end = start + this.rowsPerPage;
		return this.filteredData.slice(start, end);
	}

	render() {


		const table = this.tableWrapper.querySelector('table');
		const tbody = this.tableWrapper.querySelector('tbody');

		tbody.innerHTML = '';

		const visibleRows = this.getVisibleRows();
		visibleRows.forEach((row) => {
			const htmlRow = this.buildRow(row);
			tbody.innerHTML += htmlRow;
		});


		table.appendChild(tbody);

	}

	setupSorting() {
		const sortableColumns = Array.from(this.tableWrapper.querySelectorAll('.review-table__sort-th'));

		sortableColumns.forEach((column) => {
			column.addEventListener('click', () => {
				const columnIndex = Array.from(column.parentNode.children).indexOf(column);

				if (column.classList.contains('review-table__sort-th--active')) {
					column.classList.toggle('review-table__sort-th--desc');
				} else {
					sortableColumns.forEach((col) => {
						col.classList.remove('review-table__sort-th--active');
						col.classList.remove('review-table__sort-th--desc');
					});
					column.classList.add('review-table__sort-th--active');
				}

				const isDescending = column.classList.contains('review-table__sort-th--desc');

				this.filteredData.sort((a, b) => {
					const aValue = Object.values(a)[columnIndex];
					const bValue = Object.values(b)[columnIndex];

					return isDescending ? bValue - aValue : aValue - bValue;
				});

				this.activePage = 1;
				this.render();
				this.generatePagination();
			});
		});
	}
}
const table = document.querySelector('.js-review-table');
if(!!table){
	const tableClass = new ReviewTable(table, window.carsFuelEfficient);
}

// https://docs.google.com/document/d/1Oh5Y8MUBUxno9RT0yjl4R7u1kp6mNOSvxoezx7XQfXg/edit?usp=sharing
