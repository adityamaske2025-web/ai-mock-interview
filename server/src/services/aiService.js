// src/services/aiService.js

const generateQuestions = async (
  jobRole,
  experience,
  techStack
) => {

  return [
    `What is ${techStack}?`,
    `Explain your experience with ${jobRole}.`,
    `What are the advantages of ${techStack}?`,
    `Describe a challenging project you worked on.`,
    `How would you improve performance in a web application?`
  ];

};

module.exports = {
  generateQuestions,
};