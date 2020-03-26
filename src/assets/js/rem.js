function rem() {
    var docEl = document.documentElement
    function setRemUnit() {
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }
    setRemUnit()
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })
}
export default  rem()


