var favicon = document.querySelector('.upload');
var filename = document.querySelector('.filename');
var chooseFile = document.querySelector('.choose-file');
var link = document.querySelector("link[rel~='icon']");
let file;

favicon.addEventListener('change', (e) => {
  const selectedFile = e.target.files[0];
  chooseFile.innerHTML = "Choose another file"
  filename.style.display = "block";
  filename.innerHTML = selectedFile.name;
  link.href = window.URL.createObjectURL(selectedFile);
});
