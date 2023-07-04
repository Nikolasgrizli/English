jQuery(function ($) {
    function accordion(parent, val, elem){
        if(parent.length > 0){
            // console.log(elem);
            const $elemParent = $(elem).closest('.accordion__item');


            if(elem !== undefined && $elemParent.is('.active')){
                $('.accordion__body', $elemParent).slideUp('200');
                $elemParent.removeClass('active');

            } else {
                $(`.accordion__item:not(:nth-child(${val+1})) .accordion__body`).slideUp('200').closest('.accordion__item').removeClass('active');
                $(`.accordion__item:nth-child(${val+1}) .accordion__body`).slideDown('200').closest('.accordion__item').addClass('active');
            }


        }
    }

    $('.accordion__head').on('click', function(){
        const $parent = $($(this).closest('.accordion'));
        const index = $(this).closest('.accordion__item').index();

        accordion($parent ,index, $(this));

    })


    if(window.matchMedia("(min-width: 768px)").matches){
        $('.accordion__body').hide();
        accordion($('.accordion'),0);
    } else {
        $('.accordion__body').hide();
        $('.accordion__item').removeClass('active');
    }

});
