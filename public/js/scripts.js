
$(document).ready(function() {
  let sectionCount = 0;

  $('body').on('click', '.addSectionBtn', function() {
    sectionCount++;
    
    const newSection = `
      <div class="added-section" id="section${sectionCount}">
          <label for="header${sectionCount}">Header:</label>
          <input type="text" id="header${sectionCount}" class="form-control">
          <label for="info${sectionCount}">Information:</label>
          <textarea id="info${sectionCount}" class="form-control"></textarea>
          <button class="btn btn-secondary mt-2 commitBtn" data-section-id="${sectionCount}">Commit</button>
      </div>
    `;
    $(this).closest('.col-12').find('.sectionsContainer').append(newSection);
  });

  // Handle click event for committing section
  $('body').on('click', '.commitBtn', function() {
  const sectionId = $(this).data('section-id');
  const header = $(`#header${sectionId}`).val();
  const info = $(`#info${sectionId}`).val();
  // Save to localStorage
  localStorage.setItem(`header${sectionId}`, header);
  localStorage.setItem(`info${sectionId}`, info);
    
    $(`#section${sectionId}`).html(`
      <div class="committed-section" id="committedSection${sectionId}">
          <label>${header}:</label>
          <div style="display: flex; justify-content: space-between; align-items: center;">
              <p>${info}</p>
              <button style="color:green;" class="btn btn-secondary editSectionBtn" data-section-id="${sectionId}">Edit</button>
          </div>
      </div>
    `);
  });

  // Handle edit button
  $('body').on('click', '.editSectionBtn', function() {
  const sectionId = $(this).data('section-id');
  // Fetch from localStorage
  const savedHeader = localStorage.getItem(`header${sectionId}`);
  const savedInfo = localStorage.getItem(`info${sectionId}`);
  $(`#section${sectionId}`).replaceWith(`
    <div class="added-section" id="section${sectionId}">
        <label for="header${sectionId}">Header:</label>
        <input type="text" id="header${sectionId}" class="form-control" value="${savedHeader}">
        <label for="info${sectionId}">Information:</label>
        <textarea id="info${sectionId}" class="form-control">${savedInfo}</textarea>
        <button class="btn btn-secondary mt-2 commitBtn" data-section-id="${sectionId}">Commit</button>
    </div>
  `);
});
});




// Handle edit button
$(document).on('click', '.editBtn', function() {
  const committedDiv = $(this).parent('.committed');
  const text = committedDiv.find('p').text();
  const originalType = committedDiv.data('type'); // get the original type from data attribute
  let newElement;
  if (originalType === 'textarea') {
    newElement = `<textarea>${text}</textarea>`;
  } else {
    newElement = `<input type="text" value="${text}"/>`;
  }
  committedDiv.replaceWith(newElement);
});

// Add a job info card
$(document).ready(function() {
  $('#addJobInfoBtn').on('click', function() {
    const newJobInfoCard = $('.job-info-card').first().clone();
    $('#jobInfoContainer').append(newJobInfoCard);
  });
});

// Add a reference card
$(document).ready(function() {
  $('#addReferenceBtn').on('click', function() {
    const newReferenceCard = $('.job-reference-card').first().clone();
    $('#jobRefContainer').append(newReferenceCard);
  });
});

// On page load, fill the input fields with data from localStorage
window.onload = function() {
  document.querySelectorAll('input, textarea').forEach(input => {
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) {
      input.value = savedValue;
    }
    // Add an event listener to each input field to save its value in localStorage on change
    input.addEventListener('input', () => {
      localStorage.setItem(input.id, input.value);
    });
  });

  // Load committed sections from localStorage
  let sectionCount = localStorage.getItem('sectionCount') || 0;
  for (let i = 1; i <= sectionCount; i++) {
    const savedHeader = localStorage.getItem(`header${i}`);
    const savedInfo = localStorage.getItem(`info${i}`);
    if (savedHeader && savedInfo) {
      const committedSection = `
        <div class="committed-section" id="committedSection${i}">
            <label>${savedHeader}:</label>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p>${savedInfo}</p>
                <button style="color:green;" class="btn btn-secondary editSectionBtn" data-section-id="${i}">Edit</button>
            </div>
        </div>
      `;
      $('.sectionsContainer').append(committedSection);
    }
  }
};



$(document).ready(function() {
  // On page load, replace input fields with committed text
  $('input, textarea').each(function() {
    const id = $(this).attr('id');
    const savedValue = localStorage.getItem(id);
    if (savedValue) {
      $(this).replaceWith(`<div class="committed"><p>${savedValue}</p> <button style="color:blue;" class="btn btn-secondary editBtn">Edit</button></div>`);
    }
  });
});










// Use event delegation to handle input event
$(document).on('input', 'input, textarea', function() {
  const id = $(this).attr('id');
  localStorage.setItem(id, $(this).val());
});


// Function to clear all data from the form and localStorage
function clearFormData() {
  localStorage.clear();
  document.querySelectorAll('input, textarea').forEach(input => {
    input.value = '';
  });
  location.reload(true);
}

// Assuming you have a clear button with an id of 'clearButton'
document.getElementById('clearButton').addEventListener('click', clearFormData);
