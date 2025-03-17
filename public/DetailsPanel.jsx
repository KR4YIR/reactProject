// DetailsPanel.js
import './DetailsPanel.css';

export default class DetailsPanel {
  constructor() {
    this.panel = null;
    this.callbacks = {
      onEdit: null,
      onDelete: null,
      onClose: null
    };
    this.init();
  }

  init() {
    // Create panel element if it doesn't exist
    this.panel = document.getElementById('details-panel');
    if (!this.panel) {
      this.panel = document.createElement('div');
      this.panel.id = 'details-panel';
      this.panel.className = 'details-panel';
      document.body.appendChild(this.panel);
    }
  }

  show(data, title = 'Feature Details', contextData = {}) {
    // Store context data for button actions
    this.contextData = contextData;
    
    // Clear the panel content
    this.panel.innerHTML = '';
  
    // Create header
    const header = document.createElement('h2');
    header.textContent = title;
    header.className = 'panel-header';
    this.panel.appendChild(header);
  
    // Create content container
    const content = document.createElement('div');
    content.className = 'panel-content';
  
    // Check the data object and display specific properties
    if (data && typeof data === 'object') {
      // Only handle specific properties: name, wkt, id, createdDate
      const keysToDisplay = ['name', 'wkt', 'id', 'createdDate'];
  
      let hasDisplayableProps = false;
  
      keysToDisplay.forEach((key) => {
        if (data[key] !== undefined && typeof data[key] !== 'function') {
          hasDisplayableProps = true;
  
          const propertyRow = document.createElement('div');
          propertyRow.className = 'property-row';
  
          const keyElement = document.createElement('span');
          keyElement.textContent = key + ': ';
          keyElement.className = 'property-key';
  
          const valueElement = document.createElement('span');
          valueElement.className = 'property-value';
  
          if (key === 'wkt' && typeof data[key] === 'string' && data[key].length > 50) {
            // Truncate WKT values if they are too long
            valueElement.textContent = data[key].substring(0, 50) + '...';
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
  
    this.panel.appendChild(content);
  
    // Add default buttons
    this.addDefaultButtons();
  
    // Add the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.className = 'panel-close-button';
    closeButton.onclick = () => this.hide();
    this.panel.appendChild(closeButton);
  
    // Make the panel visible
    this.panel.style.display = 'block';
  
    return this;
  }
  
  // Add default buttons (Edit and Delete)
  addDefaultButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'panel-buttons-container';
    
    // Edit button
    this.addButton('Edit', () => {
      console.log('Edit button clicked!');
      if (typeof this.callbacks.onEdit === 'function') {
        this.callbacks.onEdit(this.contextData);
      } else {
        console.log('Edit handler not defined');
      }
    }, { container: buttonsContainer });
    
    // Delete button
    this.addButton('Delete', () => {
      console.log('Delete button clicked!');
      if (typeof this.callbacks.onDelete === 'function') {
        this.callbacks.onDelete(this.contextData);
      } else {
        console.log('Delete handler not defined');
      }
    }, { type: 'danger', container: buttonsContainer });
    
    this.panel.appendChild(buttonsContainer);
  }
  
  // Set callback functions for button actions
  setCallbacks(callbacks) {
    if (callbacks && typeof callbacks === 'object') {
      this.callbacks = { ...this.callbacks, ...callbacks };
    }
    return this;
  }
  
  // Add custom button
  addButton(text, onClick, options = {}) {
    // Get or create buttons container
    let buttonsContainer = options.container;
    if (!buttonsContainer) {
      buttonsContainer = this.panel.querySelector('.panel-buttons-container');
      if (!buttonsContainer) {
        buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'panel-buttons-container';
        this.panel.appendChild(buttonsContainer);
      }
    }
    
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    
    // Base class
    button.className = 'panel-button';
    
    // Additional classes
    if (options.type) {
      button.classList.add(options.type); // success, danger, warning etc.
    }
    
    buttonsContainer.appendChild(button);
    
    return button;
  }
  
  // Add section method
  addSection(title, content) {
    const section = document.createElement('div');
    section.className = 'panel-section';
    
    if (title) {
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = title;
      sectionTitle.className = 'panel-section-title';
      section.appendChild(sectionTitle);
    }
    
    if (typeof content === 'string') {
      section.innerHTML += content;
    } else if (content instanceof Element) {
      section.appendChild(content);
    }
    
    this.panel.appendChild(section);
    return section;
  }
  
  // Add custom content
  addContent(htmlContent) {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = htmlContent;
    this.panel.appendChild(contentDiv);
    return contentDiv;
  }
  
  hide() {
    if (this.panel) {
      this.panel.style.display = 'none';
      // Call onClose callback if defined
      if (typeof this.callbacks.onClose === 'function') {
        this.callbacks.onClose();
      }
    }
    return this;
  }
}