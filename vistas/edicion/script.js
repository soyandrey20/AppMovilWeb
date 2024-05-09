const URL_API = 'http://localhost:3000/parametro_sensor';

const userTable = document.getElementById('userTable');
const tableData = document.getElementById('tableData');
const fetchButton = document.getElementById('fetchBtn');

// Function to enable editing for a specific table row
function enableEditing(row) {
  // Select all data cells (excluding the last action cell)
  const dataCells = row.querySelectorAll('td:not(:last-child)');

  // Iterate through each data cell and:
  // - Remove the 'disabled' attribute
  // - Set a class for styling (optional)
  dataCells.forEach(cell => {
    cell.removeAttribute('disabled');
    cell.classList.add('editable'); // Optional class for styling
  });
}

// Function to disable editing for a specific table row
function disableEditing(row) {

  const dataCells = row.querySelectorAll('td:not(:last-child)');


  dataCells.forEach(cell => {
    cell.setAttribute('disabled', true);
    cell.classList.remove('editable');
  });
}

function handleUpdateClick(event) {
  event.preventDefault();

  const updateButton = event.target;
  const tableRow = updateButton.closest('tr');

  console.log('Editing row:', tableRow);
  if (tableRow.querySelector('td[disabled]')) {

    enableEditing(tableRow);
    updateButton.textContent = 'Guardar Cambios';
  } else {


    console.log('Data successfully updated!');
    disableEditing(tableRow);
    updateButton.textContent = 'Editar';
  }
}

fetchButton.addEventListener('click', async () => {
  try {
    const response = await fetch(URL_API);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const users = await response.json();

    tableData.innerHTML = '';

    users.forEach(user => {
      const tableRow = document.createElement('tr');

      tableRow.innerHTML = `
        <td id="id">${user.Id}</td>
        <td id="id_parametro" disabled>${user.id_parametro}</td>
        <td id="id_sensor" disabled>${user.id_sensor || ''}</td>
        <td id="estado" disabled>${user.estado || ''}</td>
  
        <td>
          <a href="#" id="btnUpdate"><i class='bx bxs-edit-alt'></i></a>
          
        </td>
      `;

      tableData.appendChild(tableRow);

      // Add click event listener to the update button
      const updateButton = tableRow.querySelector('#btnUpdate');
      updateButton.addEventListener('click', handleUpdateClick);
    });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
  }
});


const updateButtons = document.querySelectorAll('#btnUpdate');

updateButtons.forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells.forEach(cell => {

      if (cell.id !== "Cedula" && cell.id !== "Email" && cell.id !== "Permisos" && cell.id !== "Estado") {
        const text = cell.textContent.trim();
        cell.innerHTML = `<input type="text" value="${text}">`;
      }
    });

  });
});