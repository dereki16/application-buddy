  // On page load, replace input fields with committed text
$(document).ready(function() {
  $('input, textarea').each(function() {
    const id = $(this).attr('id');
    const savedValue = localStorage.getItem(id);
    const savedType = localStorage.getItem(`type${id}`); // Retrieve the saved type

    if ($(this).closest('#chatBot').length === 0 && savedValue) { 
      $(this).replaceWith(`
        <div class="committed" data-type="${savedType}">
          <p id="${id}">${savedValue}</p> 
          <button class="btn btn-secondary editBtn post-refresh-btn">Edit</button>
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
  const text = committedDiv.find('p').text();
  const originalType = committedDiv.data('type'); 
  let newElement;
  const textElement = committedDiv.find('p');
  const id = textElement.attr('id');
  const value = localStorage.getItem(id);

  if (originalType === 'textarea') {
    newElement = `<textarea class="form-control">${text}</textarea>`;
  } else if (originalType === 'label') {
    const text = committedDiv.find('p').text();
    const id = committedDiv.find('p').attr('id');
    const newElement = `<input type="text" class="form-control label committable" value="${text}"/>`;
    committedDiv.replaceWith(newElement);
  }
   else {
    newElement = `<input id="${id}" type="text" class="form-control committable" value="${text}"/>`;
  }
  localStorage.setItem(id, value);
  committedDiv.replaceWith(newElement);
});

// Handle edit button for committed labels
$(document).on('click', '.editBtn', function() {
  const committedDiv = $(this).parent('.committed-section');
  const text = committedDiv.find('p').text();
  const originalType = committedDiv.data('type'); // get the original type from data attribute
  let newElement;
  const textElement = committedDiv.find('p');
  const id = textElement.attr('id');
  const value = localStorage.getItem(id);

  newElement = `<input id="${id}" type="text" class="form-control committableLabel" value="${text}"/>`;
  localStorage.setItem(id, value);
  committedDiv.replaceWith(newElement);
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
$(document).on('input', 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not(#chatBot input):not(#container-contact input):not(#container-contact textarea), textarea', function() {
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

// On page load, replace input fields in answersContainer with committed text and labels
$('input, textarea, .committedLabel').each(function() {
  const id = $(this).attr('id');
  const savedValue = localStorage.getItem(id);
  const savedType = localStorage.getItem(`type${id}`); // Retrieve the saved type
  const defaultQ1 = 'Have you used REST APIs? Which ones?';
  const defaultQ2 = 'Do you have experience with CI/CD? If so, which?';

  if (savedValue) {
    if ($(this).hasClass('committedLabel')) {
      // Check if the div is empty
      if ($(this).children().length === 0) {
        const pElement = $(this).find('p');
        const pValue = pElement.text();

        if (!pValue) {
          if (pElement.attr('id') === 'label1') {
              pElement.text(defaultQ1);
          } else if (pElement.attr('id') === 'label2') {
              pElement.text(defaultQ2);
          }
        }
      }

    } if ($(this).parents('#chatBot').length > 0) {
      $(this).replaceWith(`
          <input placeholder="Type a message..." id="${id}"></input> 
      `);
    } 
  }
});

$(document).ready(function() {

  // Handle Edit button click for labels with class committedLabel
  $(document).on('click', '.committedLabel .editBtn', function() {
      const committedLabelDiv = $(this).parent('.committedLabel');
      const labelText = committedLabelDiv.find('p').text();
      const id = committedLabelDiv.find('p').attr('id');
      
      const newInputElement = `<input id="${id}" type="text" class="form-control label" value="${labelText}"/>`;
      
      // Replace the committed label with the new input element
      committedLabelDiv.replaceWith(newInputElement);
  });

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

        if (value === "") {
          console.log("null");
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
        localStorage.setItem(id, value);

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
