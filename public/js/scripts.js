$(document).ready(function() {
  let sectionCount = 0;

  // $('body').on('click', '.addSectionBtn', function() {
  //   sectionCount++;
    
  //   const newSection = `
  //     <div class="added-section" id="section${sectionCount}">
  //         <label for="header${sectionCount}">Header:</label>
  //         <input type="text" id="header${sectionCount}" class="form-control">
  //         <label for="info${sectionCount}">Information:</label>
  //         <textarea id="info${sectionCount}" class="form-control"></textarea>
  //         <button class="btn btn-secondary mt-2 commitBtn" data-section-id="${sectionCount}">Commit</button>
  //     </div>
  //   `;
  //   $(this).closest('.col-12').find('.sectionsContainer').append(newSection);
  //   localStorage.setItem('sectionCount', sectionCount);

  // });

  // This function will handle committing the section
// function commitSection(sectionId) {
//   const header = $(`#header${sectionId}`).val();
//   const info = $(`#info${sectionId}`).val();

//   // Determine the element type
//   const elementType = $(`#info${sectionId}`).prop('tagName');
//   console.log(elementType);
  
//   // Save to localStorage
//   localStorage.setItem(`header${sectionId}`, header);
//   localStorage.setItem(`info${sectionId}`, info);
//   localStorage.setItem(`type${sectionId}`, elementType); // store the type here

//   $(`#section${sectionId}`).html(`
//     <div class="committed-section" id="committedSection${sectionId}">
//         <label>${header}:</label>
//         <div style="display: flex; justify-content: space-between; align-items: center;">
//             <p>${info}</p>
//             <button style="color:green;" class="btn btn-secondary editSectionBtn new-btn" data-section-id="${sectionId}">Edit</button>
//         </div>
//     </div>
//   `);
// }


// Handle click event for committing section
// $('body').on('click', '.commitBtn', function() {
//   const sectionId = $(this).data('section-id');
//   commitSection(sectionId);
// });

// Handle Enter key press in textarea
// $('body').on('keypress', 'textarea', function(e) {
//   if (e.which === 13) { // 13 is the Enter key code
//     e.preventDefault(); // Prevent the default action of Enter key
//     const sectionId = $(this).attr('id').replace('info', '');
//     commitSection(sectionId);
//   }
// });

  // this section has to do with edit button for Newly Added sections
  // Handle edit button
//   $('body').on('click', '.editSectionBtn', function() {
//   const sectionId = $(this).data('section-id');
//   // Fetch from localStorage
//   const savedHeader = localStorage.getItem(`header${sectionId}`);
//   const savedInfo = localStorage.getItem(`info${sectionId}`);
//   $(`#section${sectionId}`).replaceWith(`
//     <div class="added-section" id="section${sectionId}">
//         <label for="header${sectionId}">Header:</label>
//         <input type="text" id="header${sectionId}" class="form-control" value="${savedHeader}">
//         <label for="info${sectionId}">Information:</label>
//         <textarea id="info${sectionId}" class="form-control">${savedInfo}</textarea>
//         <button class="btn btn-secondary mt-2 commitBtn" data-section-id="${sectionId}">Commit</button>
//     </div>
//   `);
// });
// });
});




// Handle edit button
$(document).on('click', '.editBtn', function() {
  const committedDiv = $(this).parent('.committed');
  console.log("committed div: " + committedDiv);
  const text = committedDiv.find('p').text();
  const originalType = committedDiv.data('type'); // get the original type from data attribute
  let newElement;
  if (originalType === 'textarea') {
    newElement = `<textarea class="form-control">${text}</textarea>`;
    console.log("text");
  } else {
    newElement = `<input type="text" class="form-control" value="${text}"/>`;
    console.log("p");
  }
  committedDiv.replaceWith(newElement);
});

// // Add a job info card
// $(document).ready(function() {
//   $('#addJobInfoBtn').on('click', function() {
//     const newJobInfoCard = $('.job-info-card').first().clone();
//     $('#jobInfoContainer').append(newJobInfoCard);
//   });
// });

// // Add a reference card
// $(document).ready(function() {
//   $('#addReferenceBtn').on('click', function() {
//     const newReferenceCard = $('.job-reference-card').first().clone();
//     $('#jobRefContainer').append(newReferenceCard);
//   });
// });

window.onload = function() {
  document.querySelectorAll('input, textarea').forEach(input => {
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) {
      input.value = savedValue;
    }
  });

  // Call this function on page load to re-populate your fields
$(document).ready(function() {
  let sectionCount = localStorage.getItem('sectionCount') || 0;
  for (let i = 1; i <= sectionCount; i++) {
    const savedHeader = localStorage.getItem(`header${i}`);
    const savedInfo = localStorage.getItem(`info${i}`);
    const savedType = localStorage.getItem(`type${i}`); // retrieve the saved type

    if (savedHeader && savedInfo) {
      let infoElement;
      if (savedType === 'textarea') {
        infoElement = `<p class="textarea">${savedInfo}</p>`;
        console.log("txtareaa");
      } else {
        infoElement = `<p class="period">${savedInfo}</p>`;
        console.log("p here");
      }

      const committedSection = `
        <div class="committed-section" id="committedSection${i}" data-type="${savedType}">
            <label>${savedHeader}:</label>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                ${infoElement}
                <button class="btn btn-secondary editSectionBtn new-sec-button" data-section-id="${i}">Edit</button>
            </div>
        </div>
      `;
      $('.sectionsContainer').append(committedSection);
    }
  }
});
};




$(document).ready(function() {
  // On page load, replace input fields with committed text
  $('input, textarea').each(function() {
    const id = $(this).attr('id');
    console.log("id: " + id);
    const savedValue = localStorage.getItem(id);
    console.log("value: " + savedValue);
    const savedType = localStorage.getItem(`type${id}`); // Retrieve the saved type

    if (savedValue) {
      $(this).replaceWith(`
        <div class="committed" data-type="${savedType}">
          <p class="${savedType === 'textarea' ? 'textarea' : 'period'}">${savedValue}</p>
          <button class="btn btn-secondary editBtn post-refresh-btn">Edit</button>
        </div>
      `);
    }
  });
});









// Helps set up newly added inputs
// Use event delegation to handle input event
$(document).on('input', 'input, textarea', function() {
  const id = $(this).attr('id');
  const type = this.tagName.toLowerCase();
  localStorage.setItem(id, $(this).val());
  localStorage.setItem(`type${id}`, type); // store the type here
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