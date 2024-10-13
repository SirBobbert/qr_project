document.querySelectorAll('.draggable').forEach(image => {
    image.addEventListener('dragstart', drag);
});

const gridCells = document.querySelectorAll('.grid-cell');

gridCells.forEach(cell => {
    cell.addEventListener('dragover', allowDrop);
    cell.addEventListener('drop', drop);
});

function allowDrop(event) {
    event.preventDefault(); // Prevent default to allow drop
}

function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.src); // Store the image URL
}

function drop(event) {
    event.preventDefault(); // Prevent default behavior
    const imgSrc = event.dataTransfer.getData('text/plain');
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.classList.add('dropped-image');
    event.target.innerHTML = ''; // Clear the cell
    event.target.appendChild(imgElement); // Add the image to the cell
}

// Export functionality
document.getElementById('export-btn').addEventListener('click', function () {
    // Disable the button to prevent multiple exports
    this.disabled = true;

    const grid = document.getElementById('grid');
    html2canvas(grid).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'piktogram.png';
        link.click();

        // Re-enable the button after exporting
        this.disabled = false;
    }).catch(error => {
        console.error('Export failed:', error);
        // Re-enable the button on error
        this.disabled = false;
    });
});
