
// Function to copy committed value
$(document).ready(function() {
    let sectionCount = 0;
    let currentInputIndex = 0;
    const inputs = $('input');
  
    function copyToClipboard(text, committedElem) {
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
        notification.classList.add('hidden');
      }, 2000);
    }
    $(document).on('keydown', ':input', function (e) {
      const inputs = $(':input:visible:not(#chatBot :input)');
      const currentIndex = inputs.index(this);
  
      if (e.which == 13 && !e.shiftKey) { // Check if Enter was pressed without Shift
        e.preventDefault();
  
        // If it's an input or textarea, handle it
        if ($(this).parents('#chatBot').length > 0) {
          // If the input is inside #chatBot, start the chat instead
          $('#sendButton').click(); // Trigger click event
      } else if ($(this).is('input, textarea')) {
          const value = $(this).val();
          const elementType = this.tagName.toLowerCase(); // get the tag name of the current element
          $(this).replaceWith(`<div class="committed" data-type="${elementType}"><p>${value}</p> <button class="btn btn-secondary editBtn init-Btn">Edit</button></div>`);
          if (currentIndex + 1 < inputs.length) {
            inputs.eq(currentIndex + 1).focus();
          }
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