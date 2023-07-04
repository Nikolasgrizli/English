import { HoverPreview } from "./hoverPreview";
import SplitType from 'split-type'
import {gsap,Power3} from 'gsap';
// аккордион с предпросмотром
// jQuery(function ($) {
// 	const accordionTest = document.querySelector('.accordion-test');
// 	if(!!accordionTest){
// 		const hoverPreviewAcccordion = new HoverPreview('.accordion-test .accordion__item', 'active', '.accordion__body');

// 	}
// })


function splitText(by) {
	const wrapper = document.querySelectorAll(".js-animDescription,.js-animTitle");
	let resultLines = [];
	wrapper.forEach(el => {
		const parents = el.querySelectorAll(":not(.js-lineDisabled) > *:not(.js-lineDisabled)");
		if (!parents.length) {
			console.error("No parent element found!");
			return;
		}

		parents.forEach(parent => {
			const text = new SplitType(parent);
			$(parent).css('overflow','hidden')
			// console.log(text.lines);
			if(by === 'words'){
				resultLines.push(text.words)
			} else if (by === 'chars'){
				resultLines.push(text.chars)
			} else {
				resultLines.push(text.lines)
			}
		})
	})
	return resultLines.flat();
  }




function setIntroEffect(numEffect){
	if(isNaN(numEffect)) return;
	if(+numEffect === 1){
		let tl = gsap.timeline();
		const lines = splitText();

		//set default state
		tl.set(lines,{opacity:0,duration:0, translateY: '2em'})
		tl.set('.section_animation1 .btn',{
			opacity:0,
			duration:0,
			clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)'
		})
		tl.set('.section_animation1',{'--overlay': 0})
		tl.set('.section_animation1 .section__bg',{scale: 1.3})

		// go
		tl
			.to('.section_animation1',{opacity:1,duration: .3})
			.to('.section_animation1 .section__bg',{
				scale: 1,
				ease: Power3.easeOut,
				// ease: SlowMo.ease.config(0.7, 0.7, false),
				duration: 1.5
			})
			.to('.section_animation1',{
				'--overlay': 46,
				duration: 2
			},'<')
			.to(lines,{
				opacity: 1,
				duration: 1,
				translateY: 0,
				stagger: .2
			},'<')
			.to('.section_animation1 .btn',{
				keyframes: [
					{
						opacity:1,
						duration:.2,
					},
					{
						clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
						duration: .2
					}

				]

			},'>')
	} else if(+numEffect === 2){
		let tl = gsap.timeline();
		const words = splitText('words');

		console.log(words);
		//set default state
		tl.set(words,{opacity:0,duration:0, translateY: '2em'})
		tl.set('.section_animation2 .btn',{
			opacity:0,
			duration:0,
			clipPath: 'polygon(70% 0, 70% 0, 30% 100%, 30% 100%)'
		})
		tl.set('.section_animation2',{'--overlay': 0})
		tl.set('.section_animation2 .section__bg',{scale: 1})


		// go
		tl
			.to('.section_animation2',{opacity:1,duration: .3})
			.to('.section_animation2 .section__bg',{
				scale: 1.3,
				ease: Power3.easeOut,
				// ease: SlowMo.ease.config(0.7, 0.7, false),
				duration: 1.5
			})
			.to('.section_animation2',{
				'--overlay': 46,
				duration: 2
			},'<')
			.to(words,{
				opacity: 1,
				duration: 1,
				translateY: 0,
				stagger: .01
			},'<')
			.to('.section_animation2 .btn',{
				keyframes: [
					{
						opacity:1,
						duration:.2,
					},
					{
						clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
						duration: .2
					}

				]

			},'>')

	} else {
		let tl = gsap.timeline({delay: .2});

		//set default state
		tl.set('.js-animTitle',{opacity:0,duration:0, translateY: '2em'})
		tl.set('.js-animDescription p',{opacity:0,duration:0, translateY: '2em'})
		tl.set('.section_animation3 .btn',{
			opacity: 0,
			duration: 0,
			translateY: '2em'
		})
		tl.set('.section_animation3',{'--overlay': 100})
		tl.set('.section_animation3 .section__bg',{scale: 1})


		// go
		tl
			.to('.section_animation3',{opacity:1,duration: .3})
			.to('.section_animation3 .section__bg',{
				scale: 1.3,
				ease: Power3.easeOut,
				// ease: SlowMo.ease.config(0.7, 0.7, false),
				duration: 5
			})
			.to('.section_animation3',{
				'--overlay': 36,
				duration: 2
			},'<')
			.to('.js-animTitle',{
				opacity: 1,
				duration: 1,
				translateY: 0,
			},'<.3')
			.to('.js-animDescription p',{
				opacity: 1,
				duration: 1,
				translateY: 0,
				stagger: .2
			},'<0.2')
			.to('.section_animation3 .btn',{
				opacity:1,
				duration:.2,
				opacity: 1,
				translateY: 0,
			},'>')
	}
}


jQuery(function ($) {
	const testIntro = $('#testState');
	if(testIntro.length){
		const currentEffect = localStorage.getItem("introEffect");

		const $sectionIntro = $('.section_intro');

		// Remove all classes with the "section_animation" prefix from the element
		// Split the class name into an array of individual classes
		const classNames = $sectionIntro.attr('class').split(' ');

		// Filter out all classes that start with "section_animation"
		const filteredClassNames = classNames.filter(className => !className.startsWith('section_animation'));

		$sectionIntro.removeClass();
		// Join the remaining classes back into a string and return it
		filteredClassNames.forEach(className => $sectionIntro.addClass(className));


		if(currentEffect){
			testIntro.val(currentEffect);
			$sectionIntro.addClass(`section_animation${currentEffect}`)
			setIntroEffect(currentEffect);
		} else {
			$sectionIntro.addClass(`section_animation1`)
			setIntroEffect(1)
		}

		testIntro.on('change',()=>{
			console.log(testIntro.val());
			localStorage.setItem("introEffect", testIntro.val())
			location.reload()
		})

	}

})
