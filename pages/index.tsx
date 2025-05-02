import React, { useState } from "react";
import {motion} from "framer-motion";
import AddCommentForm from "./AddCommentForm";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

const goalsData = [
  {
    id:1,
    title:"Finish Internship Project",
    progress:60,
    comments:["Almost done!", "Need final polish"],
    milestone:[50, 100],
  }, 
  {
    id:2,
    title:"Prepare for Interview",
    progress:30,
    comments:["Schedule mock interview"],
    milestone:[50, 100]
  }
];

export default function GoalTrackerApp(){
  const [currentPage, setCurrentPage] = useState<"landing" | "dashboard" | "loading">("landing");
  const [goals, setGoals] = useState(goalsData)

  const addComment = (goalId: number, comment: string) => {
    if (!comment.trim()) return;
    setGoals((prevGoals) => 
    prevGoals.map((goal)=>
    goal.id === goalId
  ? {...goal, comments : [...goal.comments, comment]}
  : goal
    )
  );
  }

  const renderMilestones = (progress: number, milestones: number[]) => 
    milestones.map((m)=>(
      <span key={m}
      className={`ml-2 px-2 py-1 rounded test-xs $ {
        progress >= m ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          {m}%milestone
        </span>
    ));

  return (<>
  <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
    <nav className="flex justify-between items-center p-4 shadow bg-white sticky top-0 z-10">
      <h1 className="text-xl font-bold text-gray-800">GoalTracker</h1>
      <div className="space-x-4">
        <button
        onClick={()=> setCurrentPage('landing')}
        className="text-gray-700 hover:text-blue-500 transition">
          Home
        </button>
        <button
        onClick={()=> setCurrentPage("dashboard")}
        className="text-gray-700 hover:text-blue-500 transition">
          Dashboard
        </button>
      </div>
    </nav>

    <main className="flex-1">
      {currentPage === 'landing' &&(
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        className="flex flex-col justify-center items-center h-[70vh] text-center"
        >
         <h2 className="text-4xl font-bold mb-4">Track You Goals Effortlessly</h2>
         <p className="text-gray-600 mb-6 max-w-lg">
          Set goals, track progress, celebrate milestones. Stay accountable and achive more.
          </p>
          <button 
          onClick={()=> setCurrentPage('dashboard')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Go to Dashboard
            </button> 
        </motion.div> 
      )}

      {currentPage ==="dashboard" && (
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {goals.map((goal) => (
            <motion.div
            key={goal.id}
            whileHover={{ scale: 1.02}}
            className="bg-white shadow rounded-lg p-4 flex flex-col"
            >
              <h3 className="font-semibold text-lg mb-2">{goal.title}</h3>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{ width: `${goal.progress}%`}}
                ></div>
                <div className="text-sm text-gray-600 mb-2">
                Progress: {goal.progress}%
                {renderMilestones(goal.progress, goal.milestone)}
                </div>

                <div className="mb-2">
                  <h4 className="font-medium text-sm mb-1">Comments:</h4>
                  <ul className="text-us text-gray-700 space-y-1 max-h-24 overflow-y-auto">
                    {goal.comments.map((c , i) => (
                      <li key={i} className="bg-gray-100 p-1 rounded">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <AddCommentForm goalId={goal.id} onAdd={addComment}/>
            </motion.div>
          ))}
        </motion.div>
      )}

    </main>

    <footer className="bg-white shadow p-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} GoalTracker. All rights reserved.
    </footer>
  </div>
    </>)
}


