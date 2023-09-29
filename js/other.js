// Corrected version of your code:
$(document).ready(function () {
    // loadCardsFromLocalStorage();

    $(document).on('click', '.addPersonalizedCardBtn', function () {
        const personalizedCardHTML = buildEditCardHTML();
        $('.personalizedCardContainer').append(personalizedCardHTML);
    });

    $(document).on('click', '.addSectionBtn', function () {
        buildNewSectionHTML.call($(this).closest('.personalized-card'));
    });

    $(document).on('click', '.commit-btn', function () {
        console.log('commit-btn clicked');
       const section = $(this).closest('.added-section');
console.log(section);  // log the section element
const header = $('.header-input').val();
console.log(header);  // log the header element
const info = $('.info-input').val();
console.log(info);  // log the info element


console.log(section);

        console.log(`Header: ${header}, Information: ${info}`);
    });

    // $(document).on('click', '.edit-btn', function () {
    //     const card = $(this).closest('.personalized-card');
    //     const title = card.find('h2').text();
    //     const value = card.find('.committed').text();
    //     const editCardHTML = buildEditCardHTML(title, value);
    //     card.replaceWith(editCardHTML);
    // });
});
  

  // function loadCardsFromLocalStorage() {
  //   const loadedCards = JSON.parse(localStorage.getItem('cards')) || [];
  //   loadedCards.forEach((cardData, index) => {
  //     const personalizedCardHTML = buildCommittedCardHTML(cardData, index);
  //     $('.personalizedCardContainer').append(personalizedCardHTML);
  //   });
  // }

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

//   function buildEditCardHTML(title = '', value = '') {
//     return `
//       <div class="personalized-card edit-mode">
//         <div class="col-12 mx-auto">
//           <div class="form-group">
//             <label>Title:</label><input type="text" class="form-control title-input" value="${title}">
//           </div>
//           <div class="form-group">
//             <label>Value:</label><input type="text" class="form-control value-input" value="${value}">
//           </div>
//           <button class="btn btn-primary commit-btn">Commit</button>
//           <div class="sectionsContainer"></div>
//           <button class="btn btn-secondary addSectionBtn">Add Section</button>
//         </div>
//       </div>
//     `;
// }

let sectionCount = 0;

function buildNewSectionHTML() {
    sectionCount++;
    const newSection = `
        <div class="added-section section${sectionCount}">
            <!-- Add your content here -->
        </div>
    `;
    $(this).find('.sectionsContainer').append(newSection);
}


function buildEditCardHTML(title = '', value = '') {
    return `
        <div class="personalized-card edit-mode">
            <div class="col-12 mx-auto">
                <div class="form-group">
                    <label>Title:</label><input type="text" class="form-control title-input" value="${title}">
                </div>
                <div class="form-group">
                    <label>Value:</label><input type="text" class="form-control value-input" value="${value}">
                </div>
                <button class="btn btn-primary commit-btn">Commit</button>
                <div class="sectionsContainer"></div>
                <button class="btn btn-secondary addSectionBtn">Add Section</button>
            </div>
        </div>
    `;
}

$(document).on('click', '.addSectionBtn', function() {
    buildNewSectionHTML.call(this);
});

