// Download cover letter
$("#download").on("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const textToPdf = localStorage.getItem('textToPdf') || '';
    const fileName = localStorage.getItem('fileName');
    const includeMiddleName = $("#includeMiddleName").prop('checked');
    const includePortfolio = $("#includePortfolio").prop('checked');
    const includeEmail = $("#includeEmail").prop('checked');
    const includePhone = $("#includePhone").prop('checked');
    const usePreferredName = $("#usePreferredName").prop('checked');
    
    const firstName = localStorage.getItem('firstName');
    const middleName = localStorage.getItem('middleName');
    const lastName = localStorage.getItem('lastName');
    const preferredName = localStorage.getItem('preferredName');
    const onlyFullName = localStorage.getItem('fullName') || firstName + ' ' + lastName;
    let fullName = onlyFullName;
    const portfolioLink = localStorage.getItem('portfolioLink') || '';
    const emailForm = localStorage.getItem('emailForm') || '';
    const phoneNumber = localStorage.getItem('phoneNumber') || '';

    const pdf = new jsPDF();

    if (usePreferredName && preferredName) {
        if (includeMiddleName && middleName) {
            fullName = `${preferredName} ${middleName} ${lastName}`;
        } else {
            fullName = `${preferredName} ${lastName}`;
        }
    } else if (!usePreferredName && includeMiddleName && middleName) {
        fullName = `${firstName} ${middleName} ${lastName}`;
    } else {
        fullName = onlyFullName;
    } 

    if (fullName) {
        doc.setFontSize(32); 
        doc.text(fullName, 105, 20, { align: 'center' }); 
        doc.setFontSize(12);
    }
    
    if (includePortfolio || includeEmail || includePhone) {
        const info = [];
        if (includePortfolio && portfolioLink) info.push(`${portfolioLink}`);
        if (includePhone && phoneNumber) info.push(`${phoneNumber}`);
        if (includeEmail && emailForm) info.push(`${emailForm}`);
        
        doc.text(info.join("     "), 105, 30, { align: 'center' });

    }

    doc.line(20, 32, 190, 32); 
    pdf.setFontSize(12);
    doc.text(textToPdf, 20, 45); 
    doc.save(fileName || 'CoverLetter.pdf');
});
    
// Manage checkbox states
$(document).ready(function() {
    $("input:checkbox.no-commit").each(function() {
        if(localStorage.getItem(this.id) === null) {
            if (this.id === "includeMiddleName" || this.id === "usePreferredName") {
                localStorage.setItem(this.id, false); 
            } else {
                localStorage.setItem(this.id, true);
            }
        }
        this.checked = (localStorage.getItem(this.id) === "true");
        $(this).change(function() {
            localStorage.setItem(this.id, this.checked);
        });
    });

    // Manage text inputs and textareas
    $("input:text.no-commit, textarea.no-commit").each(function() {
        if(localStorage.getItem(this.id)) {
            $(this).val(localStorage.getItem(this.id));
        }

        $(this).on('input', function() {
            localStorage.setItem(this.id, $(this).val());
        });
    });

    // Custom checkbox interaction
    $('.custom-checkbox').click(function() {
        var realCheckbox = $(this).prev('.real-checkbox');
        realCheckbox.prop('checked', !realCheckbox.prop('checked')).change(); 
    });
});