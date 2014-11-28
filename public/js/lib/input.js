function Input (input) {

    input.addEventListener("keypress", keypress);

    function keypress (e) {
        if(e.which == 13) {
            var enter = new CustomEvent('enter', {'detail': input.value});
            input.dispatchEvent(enter);
        }
    }
}
