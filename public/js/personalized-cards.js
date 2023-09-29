// Corrected version of your code:
$(document).ready(function () {

    $(document).on('click', '.addPersonalizedCardBtn', function () {
        const personalizedCardHTML = buildEditCardHTML();
        $('.personalizedCardContainer').append(personalizedCardHTML);
    });

    $(document).on('click', '.addSectionBtn', function () {
        buildNewSectionHTML.call($(this).closest('.personalized-card'));
    });


  // Handle click event for committing section
$(document).on('click', '.commit-btn', function () {
  console.log("commit button pressed");
    const section = $(this).closest('.added-section');
    const sectionId = section.data('section-id');
    
    const header = $(`#header${sectionId}`).val();
    const info = $(`#info${sectionId}`).val();

    section.html(`
        <div class="committed-section" id="committedSection${sectionId}">
            <label>${header}:</label>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p>${info}</p>
                <!-- Your other content -->
            </div>
        </div>
    `);
});


    

  function commitCardChanges(card, cardData) {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const sections = card.find('.added-section').map(function() {
      const header = $(this).find('.header-input').val();
      const info = $(this).find('.info-input').val();
      return {
        header: header,
        info: info
      };
    }).get();
    cardData.sections = sections;
    
    if (card.data('index') !== undefined) {
      cards[card.data('index')] = cardData;
    } else {
      cards.push(cardData);
      card.data('index', cards.length - 1);
    }
   localStorage.setItem('cards', JSON.stringify(cards));
    const committedCardHTML = buildCommittedCardHTML(cardData, card.data('index'));
    card.replaceWith(committedCardHTML);
  }

  function buildCommittedCardHTML(cardData, index) {
    return `
      <div class="personalized-card" data-index="${index}">
        <div class="col-12 mx-auto">
          <h2>${cardData.title}</h2>
          <p><span class="committed">${cardData.value}</span></p>
          <button class="btn btn-secondary edit-btn">Edit</button>
        </div>
      </div>
    `;
  }

  function buildEditCardHTML(title = '', value = '') {
    return `
        <div class="personalized-card edit-mode">
            <div class="col-12 mx-auto">
                <div class="form-group">
                    <label>Title:</label>
                    <input type="text" class="form-control title-input" value="${title}">
                </div>
                <div class="form-group">
                    <label>Value:</label>
                    <input type="text" class="form-control value-input" value="${value}">
                </div>
                <button class="btn btn-primary commit-btn">Commit</button>
                <div class="sectionsContainer"></div>
                <button class="btn btn-secondary addSectionBtn">Add Section</button>
            </div>
        </div>
    `;
}

// keep a global section count to give unique ids to each section
let sectionCount 
  
  = 0;

// Function to build a new section with unique ids for each input field
function buildNewSectionHTML() {
    sectionCount++; // increment section count to ensure unique id
    const newSection = `
        <div class="added-section" data-section-id="${sectionCount}">
            <!-- Use unique ids for header and info input fields -->
            <input type="text" class="header-input" id="header${sectionCount}">
            <input type="text" class="info-input" id="info${sectionCount}">
            <button class="btn btn-primary commit-btn">Commit</button>
        </div>
    `;
    $(this).find('.sectionsContainer').append(newSection);
}

// Handle click event for committing section
$(document).on('click', '.commit-btn', function () {
    // find the closest added-section to the clicked commit button
    const section = $(this).closest('.added-section');
    
    // get the unique section id from data attribute
    const sectionId = section.data('section-id');
    
    // use the unique id to access the header and info input fields
    const header = $(`#header${sectionId}`).val();
    const info = $(`#info${sectionId}`).val();

    // replace the section html with committed information
    section.html(`
        <div class="committed-section" id="committedSection${sectionId}">
            <label>${header}:</label>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p>${info}</p>
            </div>
        </div>
    `);
});


$(document).on('click', '.addSectionBtn', function() {
    buildNewSectionHTML.call(this);
});
});

