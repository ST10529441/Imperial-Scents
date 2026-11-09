const BUSINESS_EMAIL = "dhlaminijunior88@gmail.com";
const DELIVERY_FEE = 60;           // sample delivery fee in rand
const FREE_DELIVERY_FROM = 500;    // free delivery over R500 (home page promotion)
 
 
// VALIDATION

 
// Checks one field. Returns an error message or "" if the field is fine.
function getError(input) {
    const value = input.value.trim();
    const label = input.dataset.label;
    const rule = input.dataset.rule;
 
    // Empty field: only an error if it is required
    if (value === "") {
        return input.required ? label + " is required." : "";
    }
 
    // Format checks
    if (rule === "name" && !/^[A-Za-z][A-Za-z\s'-]{1,59}$/.test(value)) {
        return "Please enter a valid name (letters only).";
    }
    if (rule === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return "Please enter a valid email address, e.g. name@example.com.";
    }
    if (rule === "phone" && !/^(\+27|0)[0-9]{9}$/.test(value.replace(/[\s-]/g, ""))) {
        return "Please enter a valid number, e.g. 0691155174 or +27691155174.";
    }
    if (rule === "date" && value < input.min) {
        return label + " cannot be in the past.";
    }
 
    // Length checks
    if (input.minLength > 0 && value.length < input.minLength) {
        return label + " must be at least " + input.minLength + " characters.";
    }
 
    // Number check (quantity)
    if (input.type === "number") {
        const n = Number(value);
        if (!Number.isInteger(n) || n < Number(input.min) || n > Number(input.max)) {
            return label + " must be a whole number between " + input.min + " and " + input.max + ".";
        }
    }
 
    return "";
}
 
// Shows (or clears) the error under a field. Returns true if the field is valid.
function checkField(input) {
    const message = getError(input);
    input.closest(".form-group").querySelector(".error-message").textContent = message;
    input.classList.toggle("field-invalid", message !== "");
    input.classList.toggle("field-valid", message === "" && input.value.trim() !== "");
    return message === "";
}
 
// Checks the delivery radio buttons (one must be chosen)
function checkRadios(group) {
    const chosen = group.querySelector("input:checked");
    const message = chosen ? "" : group.dataset.label + " is required.";
    group.querySelector(".error-message").textContent = message;
    return message === "";
}
 
// Checks the whole form. Returns the first bad field (so we can focus it), or null.
function checkForm(form) {
    let firstBad = null;
 
    form.querySelectorAll("[data-validate]").forEach(function (input) {
        if (!checkField(input) && !firstBad) firstBad = input;
    });
    form.querySelectorAll("fieldset[data-radio]").forEach(function (group) {
        if (!checkRadios(group) && !firstBad) firstBad = group.querySelector("input");
    });
 
    return firstBad;
}
 
// Check a field when the user leaves it, and re-check while they fix it
function addLiveChecks(form) {
    form.querySelectorAll("[data-validate]").forEach(function (input) {
        input.addEventListener("blur", function () { checkField(input); });
        input.addEventListener("input", function () {
            if (input.classList.contains("field-invalid")) checkField(input);
        });
    });
    form.querySelectorAll("fieldset[data-radio]").forEach(function (group) {
        group.addEventListener("change", function () { checkRadios(group); });
    });
}
 
// Clears the form and all error messages
function clearForm(form) {
    form.reset();
    form.querySelectorAll(".error-message").forEach(function (p) { p.textContent = ""; });
    form.querySelectorAll(".field-invalid, .field-valid").forEach(function (input) {
        input.classList.remove("field-invalid", "field-valid");
    });
}
 
// Shows a message under the submit button. type = "success", "error" or "info"
function showStatus(element, message, type) {
    element.textContent = message;
    element.className = "form-status status-" + type;
}
 
// Makes user text safe to put inside HTML
function safe(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
 
 
/* =========================================================
   PART 2: ENQUIRY FORM (enquiry.html)
   ========================================================= */
 
// Works out the cost and availability and returns the quote as HTML
function buildQuote(firstName, email, product, quantity, method) {
    const subtotal = product.price * quantity;
    let delivery = 0;
    let deliveryLabel = "Collection (free)";
    let tip = "";
 
    if (method === "delivery") {
        if (subtotal >= FREE_DELIVERY_FROM) {
            deliveryLabel = "Delivery (free)";
        } else {
            delivery = DELIVERY_FEE;
            deliveryLabel = "Delivery";
            tip = "<p>Add R" + (FREE_DELIVERY_FROM - subtotal) + " more to your order for free delivery.</p>";
        }
    }
 
    // Availability message
    let availability;
    if (product.stock >= quantity) {
        availability = '<p class="availability in-stock">In stock - we can fulfil your order of ' + quantity + ".</p>";
    } else if (product.stock > 0) {
        availability = '<p class="availability low-stock">Low stock - only ' + product.stock + " available right now.</p>";
    } else {
        availability = '<p class="availability out-of-stock">Currently out of stock - we will email ' + safe(email) + " when it is back.</p>";
    }
 
    const productName = product.name + (product.size ? " (" + product.size + ")" : "");
 
    return "<h3>Thank you, " + safe(firstName) + "! Here is your quote.</h3>" +
        '<dl class="quote-list">' +
        "<dt>Fragrance</dt><dd>" + productName + "</dd>" +
        "<dt>Unit price</dt><dd>R" + product.price + "</dd>" +
        "<dt>Quantity</dt><dd>" + quantity + "</dd>" +
        "<dt>Subtotal</dt><dd>R" + subtotal + "</dd>" +
        "<dt>" + deliveryLabel + "</dt><dd>R" + delivery + "</dd>" +
        "<dt>Total</dt><dd>R" + (subtotal + delivery) + "</dd>" +
        "</dl>" +
        availability + tip +
        "<p>We have also received your enquiry and will follow up at " + safe(email) + ".</p>" +
        '<button type="button" id="new-enquiry" class="btn">Make another enquiry</button>';
}
 
const enquiryForm = document.getElementById("enquiry-form");
 
if (enquiryForm) {
    const fragranceSelect = document.getElementById("enq-fragrance");
    const dateInput = document.getElementById("enq-date");
    const status = document.getElementById("enq-status");
    const result = document.getElementById("enq-result");
    const submitButton = enquiryForm.querySelector("button[type='submit']");
 
    // Fill the fragrance dropdown from products-data.js
    PRODUCTS.forEach(function (p) {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.category + " - " + p.name + (p.size ? " " + p.size : "") + " - R" + p.price;
        fragranceSelect.appendChild(option);
    });
 
    // The preferred date cannot be in the past
    dateInput.min = new Date().toISOString().split("T")[0];
 
    addLiveChecks(enquiryForm);
 
    enquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();          // stop the normal page reload
        result.hidden = true;
 
        // 1. Validate
        const firstBad = checkForm(enquiryForm);
        if (firstBad) {
            showStatus(status, "Please fix the highlighted fields and try again.", "error");
            firstBad.focus();
            return;
        }
 
        // 2. Collect the data
        const product = PRODUCTS.find(function (p) { return p.id === enquiryForm.elements.fragrance.value; });
        const quantity = Number(enquiryForm.elements.quantity.value);
        const method = enquiryForm.elements.deliveryMethod.value;
        const name = enquiryForm.elements.fullName.value.trim();
        const email = enquiryForm.elements.email.value.trim();
 
        const data = {
            fullName: name,
            email: email,
            phone: enquiryForm.elements.phone.value.trim(),
            enquiryType: enquiryForm.elements.enquiryType.value,
            fragrance: product.name + " " + product.size,
            quantity: quantity,
            preferredDate: enquiryForm.elements.preferredDate.value,
            deliveryMethod: method,
            message: enquiryForm.elements.message.value.trim()
        };
 
        // 3. Send it with AJAX (fetch) without reloading the page
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        showStatus(status, "Sending your enquiry...", "info");
 
        try {
            const response = await fetch(enquiryForm.action, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error("Server error");
            showStatus(status, "Your enquiry was sent successfully.", "success");
        } catch (error) {
            showStatus(status, "We could not send your enquiry. Your quote is below - please try again or contact us.", "error");
        }
 
        // 4. Show the quote
        result.innerHTML = buildQuote(name.split(" ")[0], email, product, quantity, method);
        result.hidden = false;
        result.scrollIntoView({ behavior: "smooth" });
 
        document.getElementById("new-enquiry").addEventListener("click", function () {
            clearForm(enquiryForm);
            result.hidden = true;
            status.textContent = "";
            enquiryForm.elements.fullName.focus();
        });
 
        submitButton.disabled = false;
        submitButton.textContent = "Send Enquiry";
    });
}
 
 
/* =========================================================
   PART 3: CONTACT FORM (contact.html)
   ========================================================= */
 
const contactForm = document.getElementById("contact-form");
 
if (contactForm) {
    const status = document.getElementById("contact-status");
    const preview = document.getElementById("email-preview");
    const messageBox = document.getElementById("contact-message");
    const counter = document.getElementById("message-count");
 
    addLiveChecks(contactForm);
 
    // Live character counter
    messageBox.addEventListener("input", function () {
        counter.textContent = messageBox.value.length + " / " + messageBox.maxLength;
    });
 
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
 
        // 1. Validate
        const firstBad = checkForm(contactForm);
        if (firstBad) {
            showStatus(status, "Please fix the highlighted fields and try again.", "error");
            firstBad.focus();
            return;
        }
        status.textContent = "";
 
        // 2. Put the form data into an email
        const name = contactForm.elements.fullName.value.trim();
        const email = contactForm.elements.email.value.trim();
        const phone = contactForm.elements.phone.value.trim() || "Not provided";
        const type = contactForm.elements.messageType.value;
        const subject = "[" + type + "] " + contactForm.elements.subject.value.trim();
 
        const body = "Hello Imperial Scents,\n\n" + messageBox.value.trim() +
            "\n\n---\nName: " + name +
            "\nEmail: " + email +
            "\nPhone: " + phone +
            "\nMessage type: " + type;
 
        const mailtoLink = "mailto:" + BUSINESS_EMAIL +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
 
        // 3. Show the email so the user can check it and send it
        preview.innerHTML =
            "<h3>Your message is ready to send</h3>" +
            "<p>Check the email below, then press the button to send it to us.</p>" +
            '<dl class="quote-list">' +
            "<dt>To</dt><dd>" + BUSINESS_EMAIL + "</dd>" +
            "<dt>Subject</dt><dd>" + safe(subject) + "</dd>" +
            "</dl>" +
            '<pre class="email-body">' + safe(body) + "</pre>" +
            '<div class="preview-actions">' +
            '<a class="btn" href="' + mailtoLink + '">Open in my email app</a>' +
            '<button type="button" id="edit-message" class="btn btn-outline">Edit message</button>' +
            "</div>";
 
        contactForm.hidden = true;
        preview.hidden = false;
        preview.scrollIntoView({ behavior: "smooth" });
 
        document.getElementById("edit-message").addEventListener("click", function () {
            preview.hidden = true;
            contactForm.hidden = false;
        });
    });
}