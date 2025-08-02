/**
 * @file        aiController.js
 * @description Handles AI-related functionality such as generating interview questions. Integrates with Gemini API.
 *
 * @notes       Expects structured input (role, experience, topics) and manages API key via env file.
 *              Routes: POST /api/ai/generate-questions, POST /api/ai/generate-explanation
 */


//const { GoogleGenAI } = require("@google/genai");
//const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");
//const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const { conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts");

let GoogleGenAI;

(async () => {
  const module = await import("@google/genai");
  GoogleGenAI = module.GoogleGenAI;
})();



/**
 * 
 * @desc    Generate interview questions and answers using Gemini
 * @route   POST /api/ai/generate-questions
 * @access  Private
 */
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing Required Fields!" });
        }

        // Instantiate Google API calls
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = await response.text;

        // Clean JSON data Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting ``` json
            .replace(/```$/, "") // remove ending ```
            .trim(); //remove extra spaces
        
        // Ready to parse now
        const data = JSON.parse(cleanedText);
        
        res.status(200).json(data);    
    } 
    catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};



/**
 * 
 * @desc    Generate explanation for an interview question
 * @route   POST /api/ai/generate-explanation
 * @access  Private
 */
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if(!question) {
            return res.status(400).json({ message: "Missing Required Fields!" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = await response.text;

        const cleanedText = rawText
            .replace(/^```json\s*/, "") 
            .replace(/```$/, "")
            .trim(); 
        
        const data = JSON.parse(cleanedText);
        
        res.status(200).json(data);   
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};



module.exports = { generateInterviewQuestions, generateConceptExplanation };