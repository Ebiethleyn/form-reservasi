document.getElementById('reserveNow').addEventListener('click', function () {
    document.getElementById('reservationForm').classList.remove('d-none');
});

document.getElementById('formReservation').addEventListener('input', function () {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const roomType = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const bookNowBtn = document.getElementById('bookNow');
    const totalPriceElement = document.getElementById('totalPrice');

    if (fullName && email && phone && roomType && checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

        if (nights > 0) {
            const roomPrice = parseInt(document.querySelector(`#roomType option[value="${roomType}"]`).dataset.price);
            const totalPrice = roomPrice * nights;

            totalPriceElement.textContent = `Total Price: ${totalPrice.toLocaleString()} IDR`;
            totalPriceElement.classList.remove('text-danger');
            totalPriceElement.classList.add('text-success');

            bookNowBtn.disabled = false;
            bookNowBtn.classList.remove('btn-secondary');
            bookNowBtn.classList.add('btn-success');

            // Event listener untuk tombol "Book Now"
            bookNowBtn.onclick = function () {
                const whatsappMessage = `https://wa.me/6285280064142?text=Reservation Details:%0A- Name: ${encodeURIComponent(fullName)}%0A- Email: ${encodeURIComponent(email)}%0A- Phone: ${encodeURIComponent(phone)}%0A- Room Type: ${encodeURIComponent(roomType)}%0A- Stay Duration: ${nights} Nights%0A- Total Price: ${totalPrice.toLocaleString()} IDR`;
                window.open(whatsappMessage, '_blank');
            };
        } else {
            totalPriceElement.textContent = 'Check-Out date must be after Check-In date!';
            totalPriceElement.classList.add('text-danger');
            bookNowBtn.disabled = true;
            bookNowBtn.classList.add('btn-secondary');
            bookNowBtn.classList.remove('btn-success');
        }
    } else {
        totalPriceElement.textContent = '';
        bookNowBtn.disabled = true;
        bookNowBtn.classList.add('btn-secondary');
        bookNowBtn.classList.remove('btn-success');
    }
});
