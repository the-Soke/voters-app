// controllers/candidateController.js

// Import Candidate model using ES Modules syntax
import Candidate from '../models/candidate.js';
import { uploader } from '../utils/cloudinary.js';

//Add a new candidate
// export const addCandidate = async (req, res) => {
//   try {
//     const { name, party, position } = req.body;
//     const candidate = await Candidate.create({ name, party, position });
//     res.status(201).json(candidate); // Responds with the created candidate
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add candidate' });
//   }
// };

// // Get all active candidates
// export const getCandidates = async (req, res) => {
//   try {
//     const candidates = await Candidate.findAll({
//       where: { isActive: true }
//     });
//     res.json(candidates); // Responds with the list of active candidates
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch candidates' });
//   }
// };

// Add a new candidate
// controllers/candidateController.js

// export const addCandidate = async (req, res) => {
//   try {
//     const { name, party, position } = req.body;
//     let image = null;

//     // Handle image upload if it exists
//     if (req.file) {
//       const result = await uploader.upload(req.file.path, {
//         folder: 'candidates', // Optional: Cloudinary folder
//       });
//       image = result.secure_url;
//     }

//     if (!name || !party || !position) {
//       return res.status(400).json({ message: 'Please provide name, party, and position' });
//     }

//     const candidate = await Candidate.create({
//       name,
//       party,
//       position,
//       image,
//       isActive: true
//     });

//     res.status(201).json({
//       message: 'Candidate added successfully',
//       candidate
//     });
//   } catch (error) {
//     console.error('Error adding candidate:', error);
//     res.status(500).json({ message: 'Server error while adding candidate' });
//   }
// };

import { cloudinary } from '../utils/cloudinary.js'; // import cloudinary directly

export const addCandidate = async (req, res) => {
  try {
    const { name, party, position } = req.body;

    if (!name || !party || !position) {
      return res.status(400).json({ message: 'Please provide name, party, and position' });
    }

    let image = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'candidates',
      });
      image = result.secure_url;
    }

    const candidate = await Candidate.create({
      name,
      party,
      position,
      image,
      isActive: true
    });

    res.status(201).json({
      message: 'Candidate added successfully',
      candidate
    });

  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ message: 'Server error while adding candidate' });
  }
};



export const getCandidates = async (req, res) => {
  const candidates = await Candidate.findAll({ where: { isActive: true } });
  res.json(candidates);
};



