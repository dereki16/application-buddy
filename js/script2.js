$('#personalizedCardContainer').on('click', '.commit-btn', function() {
  const card = $(this).closest('.personalized-card');

  const titleInput = card.find('.title-input');
  const labelInput = card.find('.label-input');
  const valueInput = card.find('.value-input');

  if (titleInput.length > 0 && labelInput.length > 0 && valueInput.length > 0) {
    const title = titleInput.val();
    const label = labelInput.val();
    const value = valueInput.val();

    card.html(`
        <div class="col-12 mx-auto">
          <h2 class="page-section-heading text-uppercase text-secondary">${title}</h2>
          <p><strong>${label}:</strong></p> 
          <p class="committed">${value}</p>
        </div>
        <div class="divider-custom">
          <div class="divider-custom-icon">
            <button class="addSectionBtn btn btn-primary"><i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>
      `);
  } else {
    alert('Input fields not found!');
  }
});
