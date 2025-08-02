/**
 * Description:
 *  - This component renders a form to create a new interview session.
 *  - Upon submission, it collects the user's input (role, experience, topics, and description),
 *    sends it to the AI backend to generate questions, and stores the session in the database.
 */


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader';
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from '../../utils/axiosInstance';


const CreateSessionForm = () => {
    // Local state to store user input
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // Handles input changes and updates form data
    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    // Handles form submission: validates input, calls API, and navigates to new session
    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus } = formData;

        // Check required fields
        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all required fields!");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            // Step 1: Generate interview questions using AI API
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role, 
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 7,
                }
            );

            // Extract generated questions from API response
            // Should be array like [{question}, {answer, ...}]
            const generatedQuestions = aiResponse.data;

            // Step 2: Create new session and attach questions
            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
            });

            // Step 3: Redirect user to the new session page
            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }
        }
        catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        }
        finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Start a New Interview Journey.
            </h3>

            <p className="text-xs text-slate-700 mt-[5px] mb-3">
                Fill out the fields below and unlock your personalized set of interview questions!
            </p>

            {/* Form Submission */}
            <form onClick={handleCreateSession} className="flex flex-col gap-3">
                <Input 
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="Frontend Developer, UI/UX Designer, etc."
                    type="text"
                />

                <Input 
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years of Experience"
                    placeholder="1 year, 3 years, 5+ years."
                    type="number"
                />

                <Input 
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics to Focus On"
                    placeholder="Comma-seperated: React, Node.js, MongoDC."
                    type="text"
                />

                <Input 
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="Any specific goals or further notes on this session."
                    type="text"
                />

                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                {/* Submit Button with loading state */}
                <button
                    type="submit"
                    className="btn-primary w-full mt-2"
                    disabled={isLoading}
                >
                {isLoading && <SpinnerLoader />} Create Session
                </button>
            </form>
        </div>
    )
}


export default CreateSessionForm;