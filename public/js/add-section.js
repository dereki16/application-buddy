$(document).ready(function() {
    loadSectionsFromLocalStorage();

    $(document).on('click', '.addSectionBtn', function() {
        const section = createSection();
        $('.sectionsContainer').append(section);
    });

    $(document).on('input', '.sectionsContainer input', function() {
        saveSectionsToLocalStorage();
    });
});

function createSection(labelValue, descriptorValue) {
    return `
    <div class="form-group">
        <label class="removable-label">Enter section info: </label>
        <input class="input-label form-control committableLabel" placeholder="Enter your label" value="${labelValue || ''}">
        <input class="input-descriptor form-control committable users-descriptor" placeholder="Enter label's descriptor" value="${descriptorValue || ''}">
    </div>`;
}

function saveSectionsToLocalStorage() {
    const sections = $('.sectionsContainer .form-group');
    let sectionsToSave = [];

    sections.each(function() {
        let label = $(this).find('.input-label').text() || $(this).find('input[id="inputLabel"]').val();
        let descriptor = $(this).find('.input-descriptor').text() || $(this).find('input[id="inputDescriptor"]').val();
        
        if (label && descriptor) {
            sectionsToSave.push({ label, descriptor });
        }
    });

    localStorage.setItem('savedSections', JSON.stringify(sectionsToSave));
}

function createCommittedSection(label, descriptor) {
    return `
        <div class="form-group">
            <div class="committed-section" data-type="text">
                <p class="input-label">${label}</p>
                <button class="btn btn-secondary editBtn init-Btn">Edit</button>
            </div>
            <div class="committed" data-type="text">
                <p class="input-descriptor">${descriptor}</p>
                <button class="btn btn-secondary editBtn init-Btn">Edit</button>
            </div>
        </div>`;
}

function loadSectionsFromLocalStorage() {
    const savedSectionsString = localStorage.getItem('savedSections');

    $('.sectionsContainer').empty();

    if (savedSectionsString) {
        const savedSections = JSON.parse(savedSectionsString);

        savedSections.forEach(section => {
            const sectionHtml = createCommittedSection(section.label, section.descriptor);
            $('.sectionsContainer').append(sectionHtml);
        });
    }
}

