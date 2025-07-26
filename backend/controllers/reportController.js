import Tesseract from 'tesseract.js';
import Report from '../models/reportModel.js';


// 📤 Upload report with OCR (for image files only)
export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path.replace(/\\/g, '/'); // normalize for Windows paths

    // OCR on image file (png, jpg, etc.)
    const ocrResult = await Tesseract.recognize(filePath, 'eng');
    const extractedText = ocrResult.data.text;

    const newReport = new Report({
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      fileUrl: filePath,
      extractedText,
      uploadedAt: new Date()
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error("OCR failed:", error);
    res.status(500).json({ message: "OCR or upload failed" });
  }
};

// 📥 Get all reports by user ID (doctor or patient)
export const getReports = async (req, res) => {
  try {
    const userId = req.user._id;

    const reports = await Report.find({
      $or: [
        { patientId: req.userId  },
        { doctorId: req.userId  }
      ]
    });

    res.status(200).json(reports);
  } catch (error) {
    console.error("Fetch reports failed:", error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};
