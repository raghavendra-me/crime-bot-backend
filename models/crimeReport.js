const mongoose = require('mongoose');

// Define the schema for Crime Reports
const crimeSchema = new mongoose.Schema({
  name: String,
  age: String,
  mobile: String,
  residence: String,
  crime: String,
  hasProof: String,
  proof: String, // Metadata for the file (e.g., filename)
  locationType: String,
  location: String,
  uniqueId: String, // For tracking purposes
});

const CrimeReport = mongoose.model('CrimeReport', crimeSchema);

module.exports = CrimeReport;
