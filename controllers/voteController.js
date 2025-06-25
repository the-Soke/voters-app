// // Import models and utilities using ES Module syntax
// import Vote from '../models/vote.js';
// import Candidate from '../models/candidate.js';
// import User from '../models/user.js';
// import { sendVoteEmail } from '../utils/mailer.js';

// // Controller function to handle voting
// export const vote = async (req, res) => {
//   try {
//     const { candidateId } = req.body;
//     const userId = req.user.userId;

//     // Find the candidate being voted for
//     const candidate = await Candidate.findByPk(candidateId);
//     if (!candidate) return res.status(404).json({ message: 'Candidate not found.' });

//     // Check if the user has already voted for this position
//     const existing = await Vote.findOne({
//       where: { UserId: userId },
//       include: {
//         model: Candidate,
//         where: { position: candidate.position }
//       }
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: `You have already voted for the position of ${candidate.position}.`
//       });
//     }

//     // Record the vote
//     await Vote.create({ UserId: userId, CandidateId: candidateId });

//     // Send email notification to user
//     const user = await User.findByPk(userId);
//     await sendVoteEmail(user.email, candidate.name);

//     res.json({ message: 'Vote successful.' });
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred while voting.', error });
//   }
// };

import Vote from '../models/vote.js';
import Candidate from '../models/candidate.js';
import User from '../models/user.js';
import { sendVoteEmail } from '../utils/mailer.js';

export const vote = async (req, res) => {
  const { candidateId } = req.body;
  const userId = req.user.id;
  const candidate = await Candidate.findByPk(candidateId);
  if (!candidate) return res.status(404).json({ message: "Candidate not found" });

  const existing = await Vote.findOne({
    where: { UserId: userId },
    include: { model: Candidate, where: { position: candidate.position } }
  });
  if (existing) return res.status(400).json({ message: `Already voted for ${candidate.position}` });

  await Vote.create({ UserId: userId, CandidateId: candidateId });
  const user = await User.findByPk(userId);
  await sendVoteEmail(user.email, candidate.name);
  res.json({ message: 'Vote recorded' });
};

import { Sequelize } from 'sequelize'; // For COUNT and GROUP

export const getVoteCounts = async (req, res) => {
  try {
    const results = await Vote.findAll({
      attributes: [
        'CandidateId',
        [Sequelize.fn('COUNT', Sequelize.col('Vote.id')), 'voteCount']
      ],
      group: ['CandidateId'],
      include: {
        model: Candidate,
        attributes: ['id', 'name', 'position']
      }
    });

    res.json({ status: 'success', data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch vote counts' });
  }
};
