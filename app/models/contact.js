"use strict";
var Contact = (function () {
    function Contact(info) {
        this.id = info.id;
        this.name = info.name;
        this.operatorId = info.operatorId;
        this.email = info.email;
        this.phone = info.phone;
        this.address = info.address;
        this.openingHours = info.openingHours;
        this.info = info.info;
    }
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=contact.js.map