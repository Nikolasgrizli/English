import { HoverPreview } from "./hoverPreview";
import SplitType from 'split-type'
import {gsap,Power3} from 'gsap';


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


function introEffect(){
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
			duration: 1
		})
		.to('.section_animation1',{
			'--overlay': 65,
			duration: .7
		},'<')
		.to(lines,{
			opacity: 1,
			duration: .6,
			translateY: 0,
			stagger: .12
		},'<-.2')
		.to('.section_animation1 .btn',{
			keyframes: [
				{
					opacity: 1,
					duration: .3,
				},
				{
					clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
					duration: .3
				}

			]

		},'<')
}


jQuery(function ($) {
	const intro = $('.section_animation1.section_animation_intro');
	if(intro.length > 0){
		introEffect();
	}

})
