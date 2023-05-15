const form = document.querySelector('form');
const result = document.querySelector('#result');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.querySelector('#fileInput');
    const file = fileInput.files[0];

    Papa.parse(file, {
        header: true,
        complete: function(results) {
            result.innerHTML = JSON.stringify(results.data, null, 8);
        }
    });
});