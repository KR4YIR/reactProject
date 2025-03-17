import './DetailsPanel.css';
import { deleteFeature } from '../src/redux/objectSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function createDetailsPanel() {
    const dispatch = useDispatch();
    let panel = null;

  function init() {
    // Create panel element if it doesn't exist
    panel = document.getElementById('details-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'details-panel';
      panel.className = 'details-panel';
      document.body.appendChild(panel);
    }
  }

  function show(data, title = 'Feature Details') {
    // Clear the panel content
    panel.innerHTML = '';

    // Create header
    const header = document.createElement('h2');
    header.textContent = title;
    header.className = 'panel-header';
    panel.appendChild(header);

    // Create content container
    const content = document.createElement('div');
    content.className = 'panel-content';

    // Check the data object and display specific properties
    if (data && typeof data === 'object') {
      const keysToDisplay = ['name', 'wkt', 'id', 'createdDate'];
      let hasDisplayableProps = false;

      keysToDisplay.forEach((key) => {
        if (data[key] !== undefined && typeof data[key] !== 'function') {
          hasDisplayableProps = true;

          const propertyRow = document.createElement('div');
          propertyRow.className = 'property-row';

          const keyElement = document.createElement('span');
          keyElement.textContent = `${key}: `;
          keyElement.className = 'property-key';

          const valueElement = document.createElement('span');
          valueElement.className = 'property-value';

          if (key === 'wkt' && typeof data[key] === 'string' && data[key].length > 50) {
            valueElement.textContent = `${data[key].substring(0, 50)}...`;
            valueElement.title = data[key]; // Full text on hover
          } else {
            valueElement.textContent = String(data[key]);
          }

          propertyRow.appendChild(keyElement);
          propertyRow.appendChild(valueElement);
          content.appendChild(propertyRow);
        }
      });

      if (!hasDisplayableProps) {
        const noProps = document.createElement('p');
        noProps.textContent = 'No valid properties to display.';
        noProps.className = 'panel-empty-message';
        content.appendChild(noProps);
      }
    } else {
      const noData = document.createElement('p');
      noData.textContent = 'No valid data provided.';
      noData.className = 'panel-empty-message';
      content.appendChild(noData);
    }

    panel.appendChild(content);

    // Add default buttons
    addDefaultButtons(data);

    // Add the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.className = 'panel-close-button';
    closeButton.onclick = () => hide();
    panel.appendChild(closeButton);

    // Make the panel visible
    panel.style.display = 'block';
  }

  function addDefaultButtons(data) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'panel-buttons-container';

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'panel-button';
    editButton.onclick = () => {
      console.log('Edit button clicked with data:', data);
      alert('Edit functionality here!');
    };
    buttonsContainer.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'panel-button danger'; // "danger" style added
    deleteButton.onclick = () => {
        if (confirm("Do you want to delete feature???")) {
            dispatch(deleteFeature(id));
            toast.success("Feature deleted successfully!");
        }else{
            toast.warning("delete operation is cancelled!");
        }
    };
    buttonsContainer.appendChild(deleteButton);

    // Add buttons container to the panel
    panel.appendChild(buttonsContainer);
  }

  function hide() {
    if (panel) {
      panel.style.display = 'none';
    }
  }

  init();

  return {
    show,
    hide
  };
}

export default createDetailsPanel;
