
let targets = document.querySelectorAll(".js-video-autoplay");

if(targets.length > 0){
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.play();
        }
        else {
            entry.target.pause();
        }
      });
    };
    
    
    // Create the intersection observer
    let observer = new IntersectionObserver(callback, options);
    // start watching the target element

    [...targets].forEach(target =>{
        observer.observe(target);
    })

}
