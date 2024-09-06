document.addEventListener('DOMContentLoaded', function () {

    const bookAppointmentButton = document.getElementById("bookAppointmentButton");
    const emergencyDiagnosisButton = document.getElementById("emergencyDiagnosisButton");

    const appointmentFormContainer = document.getElementById("appointmentFormContainer");
    const diagnosisFormContainer = document.getElementById("diagnosisFormContainer");

    bookAppointmentButton.addEventListener("click", function () {
        appointmentFormContainer.classList.toggle("show");
        diagnosisFormContainer.classList.remove("show"); // Hide the diagnosis form if open
    });

    emergencyDiagnosisButton.addEventListener("click", function () {
        diagnosisFormContainer.classList.toggle("show");
        appointmentFormContainer.classList.remove("show"); // Hide the appointment form if open
    });




    // Handle button clicks to show the appropriate form
    document.getElementById('bookAppointmentButton').addEventListener('click', function () {
        document.getElementById('appointmentFormContainer').classList.remove('hidden');
        document.getElementById('diagnosisFormContainer').classList.add('hidden');
    });

    document.getElementById('emergencyDiagnosisButton').addEventListener('click', function () {
        document.getElementById('appointmentFormContainer').classList.add('hidden');
        document.getElementById('diagnosisFormContainer').classList.remove('hidden');
    });

    // Handle appointment form submission
    document.getElementById('appointmentForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous error messages
        clearErrorMessages();

        // Get form values
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById("lastname").value.trim();
        const email = document.getElementById('email').value.trim();
        const physician = document.getElementById('physician').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Validation
        let valid = true;

        if (firstname === '') {
            displayErrorMessage('firstnameError', 'Cannot be empty');
            valid = false;
        }
        if (lastname === "") {
            displayErrorMessage('lastnameError', 'Cannot be empty');
            valid = false;
        }

        if (email === '') {
            displayErrorMessage('emailError', 'Cannot be empty');
            valid = false;
        } else if (!validateEmail(email)) {
            displayErrorMessage('emailError', 'Invalid email address');
            valid = false;
        }

        if (physician === "") {
            displayErrorMessage('physicianError', 'Cannot be empty');
            valid = false;
        }
        if (date === "") {
            displayErrorMessage('dateError', 'Cannot be empty');
            valid = false;
        }
        if (time === "") {
            displayErrorMessage('timeError', 'Cannot be empty');
        }

        if (!valid) return; // Stop form submission if validation fails

        // Generate appointment receipt
        const appointmentDetails = `
            <strong>First Name:</strong> ${firstname} <br>
            <strong>Last Name:</strong> ${lastname} <br>
            <strong>Email:</strong> ${email} <br>
            <strong>Physician:</strong> ${physician} <br>
            <strong>Appointment Date:</strong> ${date} <br>
            <strong>Appointment Time:</strong> ${time}
        `;

        // Display receipt
        document.getElementById('appointmentDetails').innerHTML = appointmentDetails;
        document.getElementById('appointmentReceipt').classList.remove('hidden');
    });

    // Handle form submission for emergency diagnosis
    document.getElementById('diagnosisForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous error messages
        clearErrorMessages();

        // Get selected symptoms
        const selectedSymptoms = Array.from(document.querySelectorAll('.symptom:checked')).map(symptom => symptom.value);


        // Validation: ensure at least one symptom is selected
        if (selectedSymptoms.length === 0) {
            displayErrorMessage('symptomsError', 'Please select at least one symptom');
            return;
        }

        // Diagnosis and prescription logic
        let diagnosis;
        let prescription;

        if (selectedSymptoms.includes('fever') && selectedSymptoms.includes('cough')) {
            diagnosis = "Flu (Influenza)";
            prescription = "Oseltamivir (Tamiflu) and Rest";
        } else if (selectedSymptoms.includes('headache') && selectedSymptoms.includes('nausea') && selectedSymptoms.includes('sensitivity to light')) {
            diagnosis = "Migraine";
            prescription = "Sumatriptan and Dark Room Rest";
        } else if (selectedSymptoms.includes('chest pain') && selectedSymptoms.includes('shortness of breath')) {
            diagnosis = "Possible Heart Condition";
            prescription = "Aspirin and Immediate Medical Attention";
        } else if (selectedSymptoms.includes('rash') && selectedSymptoms.includes('itching') && selectedSymptoms.includes('swelling')) {
            diagnosis = "Allergic Reaction";
            prescription = "Antihistamines (e.g., Benadryl) and Hydrocortisone Cream";
        } else if (selectedSymptoms.includes('joint pain') && selectedSymptoms.includes('fatigue') && selectedSymptoms.includes('swollen joints')) {
            diagnosis = "Rheumatoid Arthritis";
            prescription = "Ibuprofen and Disease-Modifying Antirheumatic Drugs (DMARDs)";
        } else if (selectedSymptoms.includes('abdominal pain') && selectedSymptoms.includes('diarrhea') && selectedSymptoms.includes('vomiting')) {
            diagnosis = "Gastroenteritis";
            prescription = "Oral Rehydration Solutions (ORS) and Antiemetics";
        } else {
            diagnosis = "Unclear or Complex Condition";
            prescription = "Consult a Physician for Further Evaluation";
        }

        // Display diagnosis and prescription
        const diagnosisDetails = `
        <strong>Diagnosis:</strong> ${diagnosis} <br>
        <strong>Prescription:</strong> ${prescription}
    `;
        document.getElementById('diagnosisDetails').innerHTML = diagnosisDetails;
        document.getElementById('diagnosisResult').classList.remove('hidden');

        // Show the print button
        document.getElementById('printSummaryButton').classList.remove('hidden');



    });
    // Function to display error messages
    function displayErrorMessage(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.innerText = message;
        errorElement.classList.remove('hidden');
    }

    // Function to clear all error messages
    function clearErrorMessages() {
        document.getElementById('symptomsError').classList.add('hidden');
    }

    // Handle print appointment button click
    document.getElementById('printAppointmentButton').addEventListener('click', function () {
        // Open print dialog with appointment receipt
        window.print();
    });

    // Handle print summary button click
    document.getElementById('printSummaryButton').addEventListener('click', function () {
        // Open print dialog with diagnosis result
        window.print();
    });

    // Function to display error messages
    function displayErrorMessage(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.innerText = message;
        errorElement.classList.remove('hidden');
    }

    // Function to clear all error messages
    function clearErrorMessages() {
        document.getElementById('firstnameError').classList.add('hidden');
        document.getElementById('lastnameError').classList.add('hidden');
        document.getElementById('emailError').classList.add('hidden');
        document.getElementById('symptomsError').classList.add('hidden');
    }

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
