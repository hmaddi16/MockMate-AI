/**
 * Description:
 * This component renders the full interview preparation session page.
 * It includes a header with session metadata, interactive Q&A cards,
 * and controls for expanding, collapsing, and adding more questions.
 * 
 * Future Expansion (commented):
 * - Learn More Drawer for concept explanations via AI
 */


import React, { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import moment from "moment";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loaders/SpinnerLoader";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import QuestionCard from "../../components/Cards/QuestionCard";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
// import AIResponsePreview from "./components/AIResponsePreview";
// import Drawer from "../../components/Drawer";
// import SkeletonLoader from "../../components/Loader/SkeletonLoader";



const InterviewPrep = () => {
    const { sessionId } = useParams();

    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
    //const [explanation, setExplanation] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);

    const [expandedCards, setExpandedCards] = useState({});

    
    // Fetch session data by session id 
    const fetchSessionDetailsById = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.SESSION.GET_ONE(sessionId)
            );

            if (response.data?.session) {
                setSessionData(response.data.session);
            } 
        } 
        catch (error) {
            console.error("Error:", error);
        } 
    };


    /* Generate Concept Explanation
    const generateConceptExplanation = async (question) => {
        try {
            setErrorMsg("");
            setExplanation(null);
            setIsLoading(true);
            setOpenLearnMoreDrawer(true);

            const response = await axiosInstance.post(
                API_PATHS.AI.GENERATE_EXPLANATION,
                {
                    question,
                }
            );

            if (response.data) {
                setExplanation(response.data);
            }
        }
        catch (error) {
            setExplanation(null);
            setErrorMsg("Failed to generate explanation. Try again later.");
            console.error("Error:", error);
        }
        finally {
            setIsLoading(false);
        }
    }; */


    // Load additional questions to a session
    const uploadMoreQuestions = async () => {
        try {
            setIsUpdateLoader(true);

            // Call AI API to generate more questions
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role: sessionData?.role,
                    experience: sessionData?.experience,
                    topicsToFocus: sessionData?.topicsToFocus,
                    numberOfQuestions: 5,
                }
            );

            // Should be array like [{question, answer}, ...]
            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(
                API_PATHS.QUESTION.ADD_TO_SESSION,
                {
                    sessionId,
                    questions: generatedQuestions,
                }
            );

            if (response.data) {
                toast.success("Added More Questions!");
                fetchSessionDetailsById();
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
            setIsUpdateLoader(false);
        }
    };


    // Delete a question from the session
    const deleteQuestion = async (id) => {
        try {
            await axiosInstance.delete(`/api/questions/${id}`);
            toast.success("Question deleted!");
            fetchSessionDetailsById(); // Refresh session
        } catch (error) {
            toast.error("Failed to delete question");
            console.error("Delete Error:", error);
        }
    };


    // Expand/ collapse all questions
    const expandAll = () => {
        const allExpanded = {};
        sessionData?.questions?.forEach((q, idx) => {
            allExpanded[q._id || idx] = true;
        });
        setExpandedCards(allExpanded);
        toast.success("Expanded all questions!");
    };

    const collapseAll = () => {
        setExpandedCards({});
        toast.success("Collapsed all questions!");
    };


    // Load session data on the initial render
    useEffect(() => {
        if (sessionId) {
            fetchSessionDetailsById();
        }

        return () => {};
    }, []);



    return (
        <DashboardLayout>
            {/* Role Summary Section */}
            <RoleInfoHeader
                role={sessionData?.role || ""}
                topicsToFocus={sessionData?.topicsToFocus || ""}
                experience={sessionData?.experience || "-"}
                questions={sessionData?.questions?.length || "-"}
                description={sessionData?.description || ""}
                lastUpdated={
                    sessionData?.updatedAt
                    ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                    : ""
                }
            />

            {/* Main Q&A Section */}
            <div className="w-full max-w-7xl mx-auto pt-4 pb-4 px-4 md:px-8">
                {/* Header controls */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={expandAll}
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-2 py-2 rounded text-nowrap cursor-pointer hover:font-bold"
                        >
                            Expand
                        </button>
                        <button 
                            onClick={collapseAll}
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-2 py-2 rounded text-nowrap cursor-pointer hover:font-bold"
                        >
                            Collapse
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                {/* Change grid-cols-1 to 12 for original layout */}
                <div className="grid grid-cols-1 gap-4 mt-5 mb-10">
                    <div
                        className={`col-span-12 ${
                            openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
                        } `}
                    >
                        <AnimatePresence>
                            {sessionData?.questions?.map((data, index) => {
                                return (
                                    <motion.div
                                        key={data._id || index}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.4,
                                            type: "spring",
                                            stiffness: 100,
                                            delay: index * 0.1,
                                            damping: 15,
                                        }}
                                        layout // Key prop that animates position changes
                                        layoutId={`question-${data._id || index}`} // Helps framer track the speed
                                    >
                                        <>
                                            <QuestionCard
                                                question={data?.question}
                                                answer={data?.answer}
                                                //onLearnMore={() => generateConceptExplanation(data.question)}
                                                isExpanded={!!expandedCards[data._id || index]}
                                                setExpanded={(val) =>
                                                    setExpandedCards((prev) => ({
                                                        ...prev,
                                                        [data._id || index]: val,
                                                    }))
                                                }
                                                onDelete={() => deleteQuestion(data._id)}
                                            />
                                        
                                            {/* Load More button after the last card */}
                                            {(!isLoading) && (sessionData?.questions?.length == index + 1) && (
                                                <div className="flex items-center justify-center mt-5">
                                                    <button 
                                                        className="flex items-center gap-3 text-sm text-white font-medium bg-black px-3 py-2 mr-2 rounded text-nowrap cursor-pointer hover:font-semibold"
                                                        disabled={isLoading || isUpdateLoader}
                                                        onClick={uploadMoreQuestions}
                                                    >
                                                        {isUpdateLoader ? (
                                                            <SpinnerLoader />
                                                        ) : (
                                                            <LuListCollapse className="text-lg" />
                                                        )}{" "}
                                                        Load More
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>


                {/*
                // Optional Drawer for AI Explanation to question
                <div>
                    <Drawer 
                        isOpen={openLearnMoreDrawer}
                        onClose={() => setOpenLearnMoreDrawer(false)}
                        title={!isLoading && explanation?.title}
                    >
                        {errorMsg && (
                            <p className="flex gap-2 text-sm text-amber-60 font-medium">
                                <LuCircleAlert className="mt-1" /> {errorMsg}
                            </p>
                        )}
                        {isLoading && <SkeletonLoader />}
                        {!isLoading && explanation && (
                            <AIResponsePreview content={explanation?.explanation} />
                        )}
                    </Drawer>
                </div>
                */}
            </div>
        </DashboardLayout>
    )
}

export default InterviewPrep;