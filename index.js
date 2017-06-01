/**
 * Created by Shmidt on 01.06.2017.
 */

var RUN = (function () {

    function loadRandom() {
       $.ajax({
            type: "GET"
            , "crossDomain": true
            , "crossOrigin": true
            , url: " http://localhost:8081/get"
            , success: handleSucces
            , error: errorHandler
        });
    }

    function handleSucces(data) {

        var slider = $("#slider").slider({
            animate: true
        });
        slider.slider('value', data);
    }

    function setApp() {
        $("#slider").slider({
            value: 0,
            animation: true
        });

        $('#fire').click(function () {

            var iValue = $("#fire i:first-child");
            if(iValue.attr('class') == "fa fa-play"){
                go = setInterval(function(){loadRandom()}, 2000);
                $(iValue).removeClass('fa fa-play');
                $(iValue).addClass('fa fa-pause');
            } else{
                clearInterval(go);
                $(iValue).removeClass('fa fa-pause');
                $(iValue).addClass('fa fa-play');
            }

        });

    }

    function errorHandler(jqXhr, textStatus, errorThrown) {
        var errorMessage = "";

        if (jqXhr.status === 0) {
            errorMessage = "Не удалось подключится к веб сервису";
        } else if (jqXhr.status == 400) {
            errorMessage = jqXhr.responseJSON + "Неправильный запрос";
        } else if (jqXhr.status == 404) {
            errorMessage = jqXhr.responseJSON + 'Requested page not found. [404]';
        } else if (jqXhr.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        } else if (jqXhr.status == 500) {
            errorMessage = jqXhr.responseJSON + 'Internal Server Error [500]';
        } else if (textStatus === 'parsererror') {
            errorMessage = 'Requested JSON parse failed.';
        } else if (textStatus === 'timeout') {
            errorMessage = 'Time out error.';
        } else if (textStatus === 'abort') {
            errorMessage = 'Ajax request aborted.';
        } else {
            errorMessage = jqXhr.responseJSON + 'Unexpected error: ' + jqXhr.responseText;
        }
        console.log(errorMessage);
    }

    function init() {
        setApp();
    }

    return {
        init: init
    }

})();

$(RUN.init);


