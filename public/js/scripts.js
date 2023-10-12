  // On page load, replace input fields with committed text
$(document).ready(function() {
  $('input, textarea').each(function() {
    const id = $(this).attr('id');
    const savedValue = localStorage.getItem(id);
    const savedType = localStorage.getItem(`type${id}`); // Retrieve the saved type

    if ($(this).is('input') && $(this).closest('#chatBot').length === 0 && savedValue) { 
      $(this).replaceWith(`
        <div class="committed" data-type="${savedType}">
          <p id="${id}">${savedValue}</p> 
          <button class="btn btn-secondary editBtn post-refresh-btn">Edit</button>
        </div>
      `);
  } else if ($(this).is('textarea') && $(this).closest('#chatBot').length === 0 && savedValue) {
      $(this).replaceWith(`
        <div class="committed" data-type="textarea">
          <p id="${id}">${savedValue.replace(/\n/g, '<br>')}</p> 
          <button class="btn btn-secondary editBtn post-refresh-btn">Edity</button>
        </div>
      `);
  } else if ($(this).closest('#chatBot').length != 0) {
      $(this).replaceWith(`
        <div id="inputArea">
          <textarea type="text" class="form-control" id="userInput" placeholder="Type a message..."></textarea>
        </div>
      `);
    }
  });
});

// Handle edit button on regular conditions
$(document).on('click', '.editBtn', function() {
  const committedDiv = $(this).parent('.committed');
  const textElement = committedDiv.find('p');
  const id = textElement.attr('id') || '';
  const originalType = committedDiv.data('type');
  let value = textElement.html();

  // If there's no value from .html(), try fetching from localStorage
  if (!value) {
      value = localStorage.getItem(id) || '';
  }

  let newElement;

  if (originalType === 'textarea') {
      // Convert <br> tags back into newline characters for textarea
      value = value.replace(/<br>/g, '\n');
      newElement = `<textarea data-type="textarea" class="form-control committable" id="${id}">${value}</textarea>`;
  } else if (originalType === 'input') {
      newElement = `<input id="${id}" data-type="text" class="form-control committable" value="${value}"/>`;
  } else if (originalType === 'label') {
      newElement = `<textarea data-type="label" class="form-control label committable">${value}</textarea>`;
  } else {
      newElement = `<input id="${id}" data-type="text" class="form-control committable" value="${value}"/>`;
  }

  if (id !== '') {
      localStorage.setItem(id, value);
  }
  committedDiv.replaceWith(newElement);
});



// Handle edit button for committed labels
$(document).on('click', '.editBtn', function() {
  const committedDiv = $(this).parent('.committed-section');
  const text = committedDiv.find('p').text();
  const originalType = committedDiv.data('type'); // get the original type from data attribute
  let newElement;
  const textElement = committedDiv.find('p');
  const id = textElement.attr('id') || '';
  const value = localStorage.getItem(id) || '';

  newElement = `<input id="${id}" data-type="text" class="form-control committableLabel" value="${text}"/>`;
  if (id !== '') {
    localStorage.setItem(id, value);
}  committedDiv.replaceWith(newElement);
});

window.onload = function() {
  document.querySelectorAll('input, textarea').forEach(input => {
    if(input.id !== "userInput") {  // Exclude userInput from being loaded
      const savedValue = localStorage.getItem(input.id);
      if (savedValue) {
          input.value = savedValue;
      }
    }
  });
};

// Set certain inputs to storage
$(document).on('input', 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="hidden"]):not(#chatBot input):not(#container-contact input):not(#container-contact textarea), textarea', function() {
  
  const id = $(this).attr('id');
  const type = this.tagName.toLowerCase() + ($(this).attr('type') ? ':' + $(this).attr('type') : '');

  localStorage.setItem(id, $(this).val());
  localStorage.setItem(`type${id}`, type);
});


  // Clear input values from localStorage when the form is submitted
$('#container-contact form').on('submit', function() {
  $('input, textarea', this).each(function() {
      const id = $(this).attr('id');
      localStorage.removeItem(id);
      localStorage.removeItem(`type${id}`);

      $(this).val("");
  });
});

// Function to clear all data from localStorage except chat log
function clearFormData() {
  var myItem = localStorage.getItem('chatMessages');
  localStorage.clear();
  localStorage.setItem('chatMessages', myItem);
  document.querySelectorAll('input, textarea').forEach(input => {
    input.value = '';
  });
  location.reload(true);
}
document.getElementById('clearButton').addEventListener('click', clearFormData);



$(document).ready(function() {

  $(document).on('keydown', '#answersContainer input', function(e) {
    if (e.which == 13) { // 13 is for Enter key
        e.preventDefault();

        const value = $(this).val();
        const id = $(this).attr('id');
        let pClass = "label"; // Default class

        // If the input id is either question1 or question2, add the 'committed' class
        if (id === 'question1' || id === 'question2') {
            pClass += " committed";
        }

        const committedLabelElement = `
            <div class="committedLabel" data-type="label">
                <div>
                  <p class="${pClass}" tabindex="0">${value}</p>
                </div>
                <button class="btn btn-secondary editBtn init-Btn">Edit</button>
            </div>
        `;

        // Save to localStorage
        if (id !== '') {
          localStorage.setItem(id, value);
      }
        // Replace the input element with the new committed label
        $(this).replaceWith(committedLabelElement);
    }
});

  // Load committed labels from localStorage on page load
  $('#answersContainer .committedLabel p').each(function() {
      const id = $(this).attr('id');
      const savedValue = localStorage.getItem(id);

      if (savedValue) {
        $(this).text(savedValue);
      }
  });
});
