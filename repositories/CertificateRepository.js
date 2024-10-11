const Certificate = require('../models/Certificate');

class CertificateRepository {
    async create(certificate) {
        const newCertificate = new Certificate(certificate);
        return await newCertificate.save();
    }

    async findById(certificateId) {
        return Certificate.findById(certificateId);
    }
}

module.exports = new CertificateRepository();
