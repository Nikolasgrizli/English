jQuery(function ($) {
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    let callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let delay = entry.dataset?.aosDelay || 0;
            $(entry.target).delay(delay).animate( {opacity: 1} , 400 );
          }

        });
    };
    let observer = new IntersectionObserver(callback, options);
    $(document).on('ready', function(){
        const aosContainer = document.querySelectorAll('.auto-fading-container');
        [...aosContainer].forEach(wrapper=>{
            [...wrapper.children].forEach((e,i)=>{
                if(e.getBoundingClientRect()['top'] > $(window).height() && e.getBoundingClientRect()['height'] < $(window).height()){
                    if(e.tagName === 'PICTURE'){
                        const img = e.querySelector('img');
                        if(!!img){
                            img.dataset.aos = 'fade-up'
                            img.dataset.aosDelay = `${((i+1)%10)*75}`
                        }
                    } else {
                        e.dataset.aos = 'fade-up'
                        e.dataset.aosDelay = `${((i+1)%10)*75}`
                    }
                    $(e).fadeTo( 0, 0 );
                }
                observer.observe(e);
            });
        });

    })
});
