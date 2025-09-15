import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '/portfolio-v5/js/config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the default form submission

    const formInputs = contactForm.elements;
    
    // Get the form data
    const formData = {
        name: formInputs.name.value,
        email: formInputs.email.value,
        phone: formInputs.phone.value,
        company: formInputs.company.value,
        source: formInputs.source.value,
        message: formInputs.message.value,
    };

    // Send the data to Supabase
    const { data, error } = await supabase
        .from('messages')
        .insert([formData]);

    if (error) {
        console.error('Error sending message:', error);
        alert('There was an error sending your message. Please try again.');
    } else {
        console.log('Message sent successfully:', data);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset(); // Clear the form
    }
});