document.addEventListener("DOMContentLoaded", function() {
  const gridElements = document.getElementsByClassName('gridElement');
  const color = document.querySelector('#colorPicker');
  const eraser = document.querySelector('#eraserButton');
  const clear = document.querySelector('#clearButton');
  const slider = document.querySelector('#sizeSlider');
  const gridContainer = document.querySelector('.gridContainer');
  const sizeText = document.querySelector('.sizeText');
  const rainbow = document.querySelector('#rainbowButton');

  let isDragging = false; // Track if the mouse is being dragged

  // Invoke createGrid with initial value of 16
  createGrid(16);

  // Event listener for the slider input
  slider.addEventListener('input', function() {
    const gridSize = slider.value;
    sizeText.textContent = gridSize + ' x ' + gridSize;
    createGrid(gridSize);
  });

  // Event listener for the eraser button
  eraser.addEventListener('click', () => {
    color.value = '#FFFFFF';
    rainbow.classList.remove('active'); // Remove 'active' class from rainbow button
  });

  // Event listener for the clear button
  clear.addEventListener('click', () => {
    clearFunc();
    rainbow.classList.remove('active'); // Remove 'active' class from rainbow button
  });

  // Event listener for the rainbow button
  rainbow.addEventListener('click', () => {
    rainbow.classList.toggle('active');
  });

  // Event listener for the color picker button
  color.addEventListener('click', () => {
    rainbow.classList.remove('active'); // Remove 'active' class from rainbow button
  });

  // Function to create the grid dynamically
  function createGrid(size) {
    // Clear the existing grid
    gridContainer.innerHTML = '';

    // Set the CSS grid template columns and rows
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Create the grid elements
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div');
      gridElement.classList.add('gridElement');

      // Event listener for each grid element to handle color changes on click and drag
      gridElement.addEventListener('mousedown', function(e) {
        if (e.buttons === 1) { // Check if left mouse button is pressed
          isDragging = true;
          handleColorChange(e);
        }
      });

      // Event listener for each grid element to handle color changes on release
      gridElement.addEventListener('mouseup', function() {
        isDragging = false;
      });

      // Event listener for each grid element to handle color changes on hover (singular clicks)
      gridElement.addEventListener('mouseover', function(e) {
        if (isDragging) {
          handleColorChange(e);
        }
      });

      // Append the grid element to the grid container
      gridContainer.appendChild(gridElement);
    }
  }

  // Function to handle color changes based on the active mode (rainbow or regular color)
  function handleColorChange(e) {
    if (rainbow.classList.contains('active')) {
      randomizeColor(e);
    } else {
      e.target.style.backgroundColor = color.value;
    }
  }

  // Function to randomize a color
  function randomizeColor(e) {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = randomColor;
  }

  // Function to clear the grid by resetting all grid element colors
  function clearFunc() {
    for (let i = 0; i < gridElements.length; i++) {
      gridElements[i].style.backgroundColor = '#FFFFFF';
    }
  }
});
