// Copying to clipboard and showing notification
$(document).ready(function() {
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
    notification.style.left = `${rect.right + window.scrollX - 250}px`;
    notification.style.top = `${rect.top + window.scrollY}px`;
    notification.classList.remove('hidden');

    setTimeout(() => {
      notification.classList.add('hidden');
    }, 2000);
  }

  // Pressing enter to commit data and tab into next input
  let counter = parseInt(localStorage.getItem('counter')) || 0; 
  $(document).on('keydown', ':input', function (e) {
    const inputs = $(':input:visible:not(#chatBot :input, #answersContainer :input, #contact-form :input)');
    const currentIndex = inputs.index(this);
    const id = $(this).attr('id');

    if (e.which == 13 && !e.shiftKey) { 
        e.preventDefault();

        if ($(this).attr('id') === 'interests') {
            const value = $(this).val();
            localStorage.setItem(id, value); // Save the value immediately after capturing it

            $(this).replaceWith(`
                <div class="committed" data-type="text">
                    <p class="label" id="${id}" tabindex="0">${value}</p>
                    <button class="btn btn-secondary editBtn init-Btn">Edit</button>
                </div>
            `);
          $("#answersContainer .editBtn").first().click();
          $("#answersContainer .label").first().focus();
          const firstLabel = $("#answersContainer .label").first();
          firstLabel.focus();
          firstLabel[0].selectionStart = firstLabel[0].value.length;
          firstLabel[0].selectionEnd = firstLabel[0].value.length;

      } else if (counter == 0 && $(this).hasClass('label')) {
        $("#question1").focus();
        counter++;

    } else if ($(this).attr('id') === 'question1') {
          $("#answersContainer .editBtn").eq(2).click();
          $("#answersContainer .label").eq(2).focus();
          const secondLabel = $("#answersContainer .label").eq(2);
          secondLabel.focus();
          secondLabel[0].selectionStart = secondLabel[0].value.length;
          secondLabel[0].selectionEnd = secondLabel[0].value.length;
          
      } else if ($(this).hasClass('label')) {
          $("#question2").focus();
      }
      else if (counter == 1  && $(this).attr('id') === 'question2') {
        $(this).blur();
    }
        else if ($(this).parents('#chatBot').length > 0) {
          $('#sendButton').click(); 
        } 
        else if ($(this).closest('#answersContainer').length > 0) {
          const value = $(this).val();
          $(this).replaceWith(`
              <div class="committedLabel" data-type="text">
                  <p class="committed label">${value}</p>
                  <button class="btn btn-secondary editBtn init-Btn">Edit</button>
              </div>
          `);

      } else if ($(this).closest('#container-contact').length) {
        let $containerContact = $(this).closest('#container-contact');
        const $nextInput = $(this).nextAll(':input, textarea').first();
    
        if ($nextInput.length && !$nextInput.closest('#answersContainer').length) {
            $nextInput.focus();
        }
        const isLastInput = $(this).is(':last-of-type') && $(this).is('textarea');

        if ($containerContact.length && isLastInput) {
            $containerContact.find('input[type="submit"]').click();
        } else {
            let inputs = $(':input:visible');
            let currentIndex = inputs.index(this);
            if (currentIndex + 1 < inputs.length && !$(this).closest('#answersContainer').length) {
                inputs.eq(currentIndex + 1).focus();
            }
        }
        
    } else if ($(this).closest('#cover-letter').length) {
        let $nextInput = $(this).nextAll(':input, textarea').first();
        if (e.which == 13) {
            e.preventDefault();
            if ($(this).is('#textToPdf')) {
                $('#download').click();
            }
            else {
                if ($nextInput.length && !$nextInput.closest('#yourSpecificContainer').length) {
                    $nextInput.focus();
                }
                const isLastInput = $(this).is(':last-of-type') && $(this).is('textarea');
                if (!isLastInput) {
                    let inputs = $('#cover-letter :input:visible, #cover-letter textarea:visible');
                    let currentIndex = inputs.index(this);
                    if (currentIndex + 1 < inputs.length && !$(this).closest('#yourSpecificContainer').length) {
                        inputs.eq(currentIndex + 1).focus();
                    }
                }
            }
        }
    } else if ($(this).hasClass('.sectionsContainer')) {
      const parent = $(this).closest('.form-group');
      const labelValue = parent.find('.committedLabel').val();
      const descriptorValue = parent.find('.form-control:not(.committedLabel)').val();
      // Append the new structure
      parent.empty().append(`
        <div>${labelValue}</div>
        <div>${descriptorValue}</div>
      `);
    } 
    else if ($(this).hasClass('committableLabel')) {
      const value = $(this).val();
      const elementType = this.tagName.toLowerCase();
      
      $(this).replaceWith(`
          <div class="committed-section" data-type="${elementType}">
              <p class="input-label">${value}</p>
              <button class="btn btn-secondary editBtn init-Btn">Edit</button>
          </div>`);
      
      saveSectionsToLocalStorage();
  
      if (currentIndex + 1 < inputs.length && !$(this).closest('#answersContainer').length) {
          inputs.eq(currentIndex + 1).focus();
      }
  
  } else if ($(this).hasClass('users-descriptor')) {
      const value = $(this).val();
      const elementType = this.tagName.toLowerCase();
      $(this).replaceWith(`
          <div class="committed users-descriptor" data-type="${elementType}">
              <p class="input-descriptor">${value}</p>
              <button class="btn btn-secondary editBtn init-Btn">Edit</button>
          </div>`);
      
      saveSectionsToLocalStorage();
  
      if (currentIndex + 1 < inputs.length && !$(this).closest('#answersContainer').length) {
          inputs.eq(currentIndex + 1).focus();
      }
  } else if ($(this).hasClass('committable')) {
    const value = $(this).val();
    const elementType = this.tagName.toLowerCase();
    let committedHTML = '';

    // Check if it's a textarea or a text input
    if (elementType === 'textarea') {
        committedHTML = `
        <div class="committed" data-type="${elementType}">
            <p id="${id}">${value.replace(/\n/g, '<br>')}</p> 
            <button class="btn btn-secondary editBtn init-Btn">Edit</button>
        </div>`;
    } else if (elementType === 'input' && $(this).attr('type') === 'text') {
        committedHTML = `
        <div class="committed" data-type="${elementType}">
            <p id="${id}">${value}</p>
            <button class="btn btn-secondary editBtn init-Btn">Edit</button>
        </div>`;
    } else {
        committedHTML = `
        <div class="committed" data-type="${elementType}">
            <p id="${id}">${value}</p>
            <button class="btn btn-secondary editBtn init-Btn">Edit</button>
        </div>`;
    }

    if (committedHTML) {
        $(this).replaceWith(committedHTML);
    }

    if (currentIndex + 1 < inputs.length && !$(this).closest('#answersContainer').length) {
        inputs.eq(currentIndex + 1).focus();
    }
}
}
localStorage.setItem('counter', counter);
});

// Add new section
$(document).on('input', '.sectionsContainer input', function() {
    const container = $(this).closest('.sectionsContainer');
    saveSectionsToLocalStorage(container);
});

// Copy data to keyboard on click
$(document).on('click', '.committed', function() {
  const textToCopy = $(this).find('p').text();
  copyToClipboard(textToCopy, this); 
});

});

