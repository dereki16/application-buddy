
// Function to copy committed value
$(document).ready(function() {
  let sectionCount = 0;
  let currentInputIndex = 0;
  const inputs = $('input');

  function copyToClipboard(text, committedElem) {
    console.log("copyToClipboard is called");

    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const rect = committedElem.getBoundingClientRect();

    // Show notification
    const notification = document.getElementById('notification');
    // Position the notification to the right of the committed value
    notification.style.left = `${rect.right + window.scrollX - 250}px`;
    notification.style.top = `${rect.top + window.scrollY}px`;
    notification.classList.remove('hidden');

    setTimeout(() => {
      console.log("Hiding notification");
      notification.classList.add('hidden');
    }, 2000);
  }
  $(document).on('keydown', 'input, textarea', function(e) {
    if (e.which == 13 && !e.shiftKey && $(this).hasClass('no-enter')) { // Check if Enter was pressed without Shift
      e.preventDefault(); 
      $(this).closest('.form-group').nextAll('.form-group:first').find('input').focus();
      return; 
    }
    if (e.which == 13) {
      e.preventDefault();
      const value = $(this).val();
      const elementType = this.tagName.toLowerCase(); // get the tag name of the current element
      $(this).replaceWith(`<div class="committed" data-type="${elementType}"><p>${value}</p> <button style="color:yellow;" class="btn btn-secondary editBtn">Edit</button></div>`);
      currentInputIndex += 1;
      if (currentInputIndex < inputs.length) {
        $(inputs[currentInputIndex]).focus();
      }
    }
  });


  $(document).on('click', '.committed', function() {
    const textToCopy = $(this).find('p').text();
    copyToClipboard(textToCopy, this); // pass this (committed element) as a second argument
  });

  
$('body').on('click', '.personalized-card .committed', function() {
  const text = $(this).text();
  if (text) {
    copyToClipboard(text, this);
  }
});

});