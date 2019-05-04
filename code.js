let codeE = document.getElementById("code");
let tab = "\t";
let storage = localStorage.getItem("code");
if (storage == null){
    codeE.value = `<!DOCTYPE html>
<html>
\t<head>
\t\t<style>
\t\t\th1 {
\t\t\t\tcolor: green;
\t\t\t\t}
\t\t</style>
\t</head>
\t<body>
\t\t<h1>Hello world</h1>
\t\t<script>document.write("code works too")</script>
\t</body>
</html>`;
} else {
    codeE.value = storage;
}
let scroll = function(){
    //document.getElementById("code_syntax").style.width = codeE.scrollWidth+"px";
    document.getElementById("code_syntax").scrollTop = codeE.scrollTop;
    document.getElementById("code_syntax").scrollLeft = codeE.scrollLeft;
    requestAnimationFrame(scroll);
}
scroll();
HTMLTextAreaElement.prototype.insertAtCaret = function (text) {
    text = text || '';
    if (document.selection) {
      // IE
      this.focus();
      var sel = document.selection.createRange();
      sel.text = text;
    } else if (this.selectionStart || this.selectionStart === 0) {
      // Others
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      this.value = this.value.substring(0, startPos) +
        text +
        this.value.substring(endPos, this.value.length);
      this.selectionStart = startPos + text.length;
      this.selectionEnd = startPos + text.length;
    } else {
      this.value += text;
    }
  };
function input_changed(){
    let code = codeE.value;
    let originalcode = code;
    code = code.replace(/</g,'&lt;');
    code = code.replace(/>/g,'&gt;');
    code = code.replace(/\n/g,'<br>');
    code = code.replace(new RegExp(tab,'g'),'<i class="tab"></i>');
    
    document.getElementById("code_syntax").innerHTML = code;
    hljs.highlightBlock(document.getElementById("code_syntax"));
    console.clear();
    document.getElementById("output").src = "data:text/html,"+escape(originalcode);
    localStorage.setItem("code",originalcode);
}
var e;
codeE.onkeydown = function(event){
    e = event;
    if (event.keyCode == 9){
        codeE.insertAtCaret("\t");
        event.preventDefault();
    }
    
    
    input_changed();
}
codeE.onkeyup = function(event){
    if (event.keyCode == 9){
        event.preventDefault();
    }
    
    input_changed();
};

input_changed();