const CrimeReport = require('../models/crimeReport');

// Create new crime report
const createCrimeReport = async (req, res) => {
  try {
    console.log('--- New Crime Report Submission ---');
    console.log('File received:', req.file);
    
    // Log each input field
    const { name, age, mobile, residence, crime, hasProof, locationType, location } = req.body;
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Mobile:', mobile);
    console.log('Residence:', residence);
    console.log('Crime:', crime);
    console.log('Has Proof:', hasProof);
    console.log('Location Type:', locationType);
    console.log('Location:', location);

    // Create a unique ID for tracking the report
    const uniqueId = Date.now().toString();
    console.log('Generated Unique ID:', uniqueId);

    // Create a new Crime Report object
    const newCrimeReport = new CrimeReport({
      name,
      age,
      mobile,
      residence,
      crime,
      hasProof,
      proof: req.file ? req.file.filename : '', // Save filename if proof is uploaded
      locationType,
      location,
      uniqueId,
    });

    // Save the report to the database
    await newCrimeReport.save();
    console.log('Crime report saved successfully');

    // Respond with the unique ID
    res.status(200).json({
      message: 'Report successfully submitted',
      uniqueId,
      location,
    });
    console.log('Response sent to client');
    console.log('--- End of Crime Report Submission ---');
  } catch (err) {
    console.error('Error in createCrimeReport:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
    console.log('Error response sent to client');
  }
};

module.exports = { createCrimeReport };