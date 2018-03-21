(function() {
    let originalAddClassMethod = jQuery.fn.addClass;
    let originalRemoveClassMethod = jQuery.fn.removeClass;
    jQuery.fn.addClass = function() {
        let result = originalAddClassMethod.apply(this, arguments);
        jQuery(this).trigger('classChanged');
        return result;
    }
    jQuery.fn.removeClass = function() {
        let result = originalRemoveClassMethod.apply(this, arguments);
        jQuery(this).trigger('classChanged');
        return result;
    }

    // $("#email").bind("classChanged", function() {
    //     if (("#name").hasClass("error")) {
    //         $("#email").addClass("contact__input-field--error");
    //     } else {
    //         $("#name").removeClass("contact__input-field--error");
    //     }
    // });

})();

(function() {
    //Сохраняем ссылку на стандартный метод jQuery
    var originalAddClassMethod = jQuery.fn.addClass;
    //Переопределяем
    $.fn.addClass = function() {
        var result = originalAddClassMethod.apply(this, arguments);
        //Инициализируем событие смены класса
        $(this).trigger('cssClassChanged');
        return result;
    }
})();

$(function() {
    $("#test").bind('cssClassChanged', function() {
        //Отработает, как только сменится класс
    });
});