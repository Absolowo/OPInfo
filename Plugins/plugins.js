jQuery.fn.desaparece = function () {
    this.each(function () {
        elem = $(this);
        elem.css("display", "none");
    });
    return this;
};

jQuery.fn.color = function () {
    this.each(function () {
        elem = $(this);
        elem.css("color", "red");
    });
    return this;
};

jQuery.fn.cambiaColor = function (opciones) {
    configuracion = {
        fontSize: '16pt',
        background: 'yellow',
        textAlign: 'center'
    };

    var settings = $.extend({}, configuracion, opciones);

    return this.each(function () {
        $(this).css(settings);
    });
}