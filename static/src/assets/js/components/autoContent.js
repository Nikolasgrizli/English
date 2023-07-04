export default function autoContent(){
	const 	titles = $('.js-content-h2'),
			contentList = $('#contentList');
		// console.log('ds');
	if(titles.length && contentList){
		$(titles).each((i,e)=>{
			const 	title = $(e)[0].dataset.title || $(e).text(),
					href = $(e)[0].id;
			// console.log(title);
			// console.log(href);
			const layout = `<li class="contents__item"><div class="contents__icon"><svg class="svg-icon"><use xlink:href="#bookmark_empty"></use></svg></div><a class="contents__text" href="#${href}">${title}</a></li>`

			contentList.append(layout);


		})
	}
}
