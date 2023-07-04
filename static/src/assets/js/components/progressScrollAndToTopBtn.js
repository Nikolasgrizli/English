const backToTopButton = document.querySelector("#toTopBtn")

if (!!backToTopButton) {
    const showOnPx = 100;
    const scrollContainer = () => {
        return document.documentElement || document.body;
    };

    document.addEventListener("scroll", () => {
        if (scrollContainer().scrollTop > showOnPx) {
            backToTopButton.classList.remove("hidden")
        } else {
            backToTopButton.classList.add("hidden")
        }

        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight - (document.querySelector('.layout__footer') && document.querySelector('.layout__footer') .scrollHeight);
        let scrolled = (winScroll / height) * 100;
        backToTopButton.style.setProperty('--value', scrolled)
    })
    const goToTop = () => {
        document.body.scrollIntoView({
          behavior: "smooth"
        });
    };
    backToTopButton.addEventListener("click", goToTop);

	//this code below adds wrapper with class .to-top-btn-svgWrapper for svg-icon(arrow up to top)
	const svg = backToTopButton.querySelector('svg');
	const svgWrapper = document.createElement('div');
	svgWrapper.classList.add('to-top-btn-svgWrapper');
	svgWrapper.append(svg);
	backToTopButton.append(svgWrapper);

}



