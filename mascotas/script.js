document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentCardContainer = document.getElementById('appointmentCardContainer');

    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Validate form
        if (validateForm()) {
            // Create appointment card
            createAppointmentCard();
            // Reset form
            appointmentForm.reset();
        }
    });

    // function validateForm() {
    //     const petName = document.getElementById('petName').value;
    //     const ownerName = document.getElementById('ownerName').value;
    //     const phone = document.getElementById('phone').value;
    //     const petType = document.getElementById('petType').value;
    //     const date = document.getElementById('date').value;
    //     const time = document.getElementById('time').value;
    //     const symptoms = document.getElementById('symptoms').value;
    //     const petPhoto = document.getElementById('petPhoto').value;
    
    //     // Expresión regular para validar que solo se ingresen números en el teléfono
    //     const phoneRegex = /^[0-9]+$/;
    
    //     // Validamos el teléfono
    //     if (!phoneRegex.test(phone)) {
    //         alert('Por favor, ingrese solo números en el campo de teléfono.');
    //         return false;
    //     }
    
    //     if (petName && ownerName && phone && petType && date && time && symptoms && petPhoto) {
    //         return true;
    //     }
        
    //     else {
    //         alert('Por favor, complete todos los campos.');
    //         return false;
    //     }
    // }

    function validateForm() {
        const petName = document.getElementById('petName').value;
        const ownerName = document.getElementById('ownerName').value;
        const phone = document.getElementById('phone').value;
        const petType = document.getElementById('petType').value;
        const date = new Date(document.getElementById('date').value); // Convertir la fecha a objeto Date
        const time = document.getElementById('time').value;
        const symptoms = document.getElementById('symptoms').value;
        const petPhoto = document.getElementById('petPhoto').value;
    
        // Expresión regular para validar que solo se ingresen números en el teléfono
        const phoneRegex = /^[0-9]+$/;
    
        // Validar que el teléfono solo contenga números
        if (!phoneRegex.test(phone)) {
            alert('Por favor, ingrese solo números en el campo de teléfono.');
            return false;
        }
    
        // Validar que todos los campos estén completos
        if (!petName || !ownerName || !phone || !petType || !date || !time || !symptoms || !petPhoto) {
            alert('Por favor, complete todos los campos.');
            return false;
        }
    
        // Validar que la fecha no sea anterior a la actual
        const today = new Date();
        if (date < today) {
            alert('La fecha de la cita no puede ser anterior a la fecha actual.');
            return false;
        }
    
        // Validar que la fecha no sea un domingo (día 0)
        if (date.getDay() === 6) {
            alert('No se pueden programar citas para los domingos.');
            return false;
        }

        // Validar el rango de horario de atención
        const horaApertura = 9; // 9:00 a.m.
        const horaCierre = 17;  // 5:00 p.m.
        const horaSeleccionada = parseInt(time.split(':')[0]); // Obtener la hora seleccionada
    
        if (horaSeleccionada < horaApertura || horaSeleccionada >= horaCierre) {
            alert('El horario de atención es de 9:00 a.m. a 5:00 p.m.');
            return false;
        }
    
        // Si todas las validaciones pasan, devolver true
        return true;
    }
    

    // function validateForm() {
    //     const petName = document.getElementById('petName').value;
    //     const ownerName = document.getElementById('ownerName').value;
    //     const phone = document.getElementById('phone').value;
    //     const petType = document.getElementById('petType').value;
    //     const date = document.getElementById('date').value;
    //     const time = document.getElementById('time').value;
    //     const symptoms = document.getElementById('symptoms').value;
    //     const petPhoto = document.getElementById('petPhoto').value;
    
    //     // Expresión regular para validar que solo se ingresen números en el teléfono
    //     const phoneRegex = /^[0-9]+$/;
    
    //     // Validamos el teléfono
    //     if (!phoneRegex.test(phone)) {
    //         alert('Por favor, ingrese solo números en el campo de teléfono.');
    //         return false;
    //     }
    
    //     // Validar el rango de horario de atención
    //     const horaApertura = 9; // 9:00 a.m.
    //     const horaCierre = 17;  // 5:00 p.m.
    //     const horaSeleccionada = parseInt(time.split(':')[0]); // Obtener la hora seleccionada
    
    //     if (horaSeleccionada < horaApertura || horaSeleccionada >= horaCierre) {
    //         alert('El horario de atención es de 9:00 a.m. a 5:00 p.m.');
    //         return false;
    //     }

    //     // Validar que la fecha no sea anterior a la actual
    //     const today = new Date();
    //     if (date < today) {
    //         alert('La fecha de la cita no puede ser anterior a la fecha actual.');
    //         return false;
    //     }
    
    
    //     if (petName && ownerName && phone && petType && date && time && symptoms && petPhoto) {
    //         return true;
    //     } else {
    //         alert('Por favor, complete todos los campos.');
    //         return false;
    //     }
    // }
    
    

    function createAppointmentCard() {
        const petName = document.getElementById('petName').value;
        const ownerName = document.getElementById('ownerName').value;
        const phone = document.getElementById('phone').value;
        const petType = document.getElementById('petType').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const symptoms = document.getElementById('symptoms').value;
        const petPhoto = document.getElementById('petPhoto').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            const card = document.createElement('div');
            card.classList.add('card');

            const petImage = document.createElement('img');
            petImage.src = imageUrl;
            petImage.alt = petName + ' Photo';
            petImage.classList.add('pet-photo');

            const details = document.createElement('div');
            details.classList.add('details');
            details.innerHTML = `
                <h3>${petName}</h3>
                <p><strong>Propietario:</strong> ${ownerName}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Tipo de Mascota:</strong> ${petType}</p>
                <p><strong>Fecha de Cita:</strong> ${date}</p>
                <p><strong>Hora de Cita:</strong> ${time}</p>
                <p><strong>Síntomas:</strong> ${symptoms}</p>
            `;

            card.appendChild(petImage);
            card.appendChild(details);
            appointmentCardContainer.appendChild(card);
        };
        reader.readAsDataURL(petPhoto);
    }
});
