import React, { useState } from "react";
import {motion} from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const goalsData = [
  {
    id:1,
    title:"Finish Internship Project",
    progress:5*["Almost done!", "Need final polish"].length,
    comments:["Almost done!", "Need final polish"],
    milestone:[50, 100],
  }, 
  {
    id:2,
    title:"Prepare for Interview",
    progress:5*["Schedule mock interview"].length,
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
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          const newProgress = Math.min(goal.progress + 5, 100); // increase by 5%
          return {
            ...goal,
            comments: [...goal.comments, comment],
            progress: newProgress,
          };
        }
        return goal;
      })
    );
  };
  
  const deleteComment = (goalId: number, commentIndex: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              comments: goal.comments.filter((_, index) => index !== commentIndex),
              progress: Math.max(0, goal.progress - 5), // decrease by 5% on delete
            }
          : goal
      )
    );
  };

  
  const deleteGoal = (goalId: number) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  };
  
  

  const renderMilestones = (progress: number, milestones: number[]) => 
    milestones.map((m)=>(
      <span key={m}
      className={`ml-2 px-2 py-1 rounded text-xs ${
        progress >= m ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'
      }`}>
        {m}%milestone
      </span>
    ));

  return (<>
  <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#1e1b4b] via-[#4c1d95] to-[#7c3aed]">
  <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white shadow-lg sticky top-0 z-20 backdrop-blur-md">
    <h1 className="text-2xl font-extrabold text-white tracking-wider">GoalTracker</h1>
    <div className="flex space-x-6">
      <button
        onClick={() => setCurrentPage('landing')}
        className="relative font-semibold px-3 py-1 hover:text-yellow-300 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300">
        Home
      </button>

      <button
        onClick={() => setCurrentPage('dashboard')}
        className="relative font-semibold px-3 py-1 hover:text-yellow-300 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 hover:after:w-full after:transition-all after:duration-300">
        Dashboard
      </button>
    </div>
  </nav>


    <main className="flex-1 mt-0">
      {currentPage === 'landing' && (
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-pink-600 opacity-30"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
            <h2 className="text-5xl sm:text-7xl font-semibold tracking-tight transform-gpu animate__animated animate__fadeInUp animate__delay-1s">Achieve Your Goals Faster</h2>
            <p className="mt-8 text-lg sm:text-xl font-medium opacity-75 animate__animated animate__fadeIn animate__delay-2s">Track, celebrate, and smash your milestones. Stay accountable with our tracker.</p>
          <div className="mt-12  ">

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-white">
                <h3 className="font-bold text-xl mb-2">Visual Progress</h3>
                <p className="text-sm opacity-80">See your goals tracked in real-time with interactive charts and milestones.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-white">
                <h3 className="font-bold text-xl mb-2">Stay Accountable</h3>
                <p className="text-sm opacity-80">Add comments, update milestones, and track every small win.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-white">
                <h3 className="font-bold text-xl mb-2">Celebrate Milestones</h3>
                <p className="text-sm opacity-80">Get notified as you hit important milestones and celebrate success.</p>
              </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl">
                Go to Dashboard
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute top-[-100px] left-[-100px] opacity-20 blur-3xl w-[600px] h-[600px] text-purple-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.3,-75.1C58.1,-65.7,66.9,-48.6,71.6,-32.4C76.3,-16.1,77,-0.7,71.9,13.4C66.9,27.5,55.9,40.3,43.4,51.3C30.9,62.2,15.4,71.3,0.5,70.8C-14.4,70.4,-28.8,60.5,-43.5,50.1C-58.2,39.8,-73.1,28.9,-77.2,14.4C-81.3,0,-74.5,-18,-63.4,-32.5C-52.2,-47,-36.8,-57.8,-21.1,-65.7C-5.4,-73.5,10.6,-78.4,25.7,-75.7C40.9,-73,54.6,-62.6,45.3,-75.1Z" transform="translate(100 100)" />
        </svg>
      </div>
    
      <div className="absolute top-0 left-0 transform-gpu -translate-x-1/4 -translate-y-1/2 opacity-40 animate__animated animate__fadeIn animate__delay-3s">
        <svg width="300" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="140" stroke="#9B4DFF" strokeWidth="30" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 transform-gpu translate-x-1/4 translate-y-1/2 opacity-40 animate__animated animate__fadeIn animate__delay-3s">
        <svg width="250" height="250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="125" cy="125" r="110" stroke="#7C3AED" strokeWidth="20" opacity="0.3" />
        </svg>
      </div>
    </div>
    )}

      {currentPage ==="dashboard" && (
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        className="p-6 bg-gradient-to-r from-[#1e1b4b] via-[#4c1d95] to-[#7c3aed] min-h-screen">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
            const name = prompt("Enter goal name:");
            if (!name) return;
            setGoals([...goals, { id: goals.length + 1, title: name, progress: 0, comments: [], milestone: [50, 100] }]);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 shadow-md transition">Add New Goal</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <motion.div key={goal.id} whileHover={{ scale: 1.02 }} className="bg-white shadow rounded-lg p-4 flex flex-col">
             <h3 className="font-bold text-xl text-slate-900 mb-2">{goal.title}</h3>
             <div className="flex justify-between items-center mb-2">
              
            <div className="flex justify-between items-center">
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold bg-red-100 rounded px-2 py-1 ml-2">
                  Delete Goal
              </button>
            </div>

            </div>

                    <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={[{ name: goal.title, progress: goal.progress }]}>
                          <XAxis dataKey="name" hide />
                          <Tooltip 
                              contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #7c3aed', borderRadius: '8px', color: 'white', fontSize: '12px' }}
                              itemStyle={{ color: '#c4b5fd' }}
                              cursor={{ fill: 'rgba(124, 58, 237, 0.1)' }}/>
                          <Bar dataKey="progress" fill="#7C3AED" radius={[10, 10, 0, 0]} isAnimationActive />
                        </BarChart>
                      </ResponsiveContainer>
                    <div className="text-sm text-gray-700 mt-2">
                      Progress: {goal.progress}%
                      {renderMilestones(goal.progress, goal.milestone)}
                    </div>
      
                    <div className="mb-2 mt-4">
                      <h4 className="font-medium text-sm mb-1 text-purple-800">Comments:</h4>
                      <ul className="text-sm text-gray-800 space-y-1 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-white shadow-inner">

                        {goal.comments.map((c, i) => (
                          <li key={i} className="bg-gray-100 p-1 rounded flex justify-between items-center">
                          <span>{c}</span>
                          <button
                            onClick={() => deleteComment(goal.id, i)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-0.5 rounded"
                          >
                            ✕
                          </button>
                        </li>
                        
                        ))}
                      </ul>
                    </div>
      
                    <AddCommentForm goalId={goal.id} onAdd={addComment}/>      </motion.div>
          ))}
        </div>
      </motion.div>
      )}
    </main>

    <footer className="bg-gradient-to-r from-[#1e1b4b] via-[#4c1d95] to-[#7c3aed] text-white text-center py-6 shadow-inner">

      <p className="text-sm opacity-80">
        &copy; 2025 GoalTracker. Designed & developed by <span className="font-bold text-purple-300">Ayush Kumar Pandey</span>.
      </p>
    </footer>

  </div>
  </>)
}

type AddCommentFormProps = {
    goalId: number;
    onAdd: (goalId: number, comment: string) => void;
};

function AddCommentForm({goalId, onAdd} : AddCommentFormProps){
    const[input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(goalId, input);
        setInput("");
    };

    return(
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a comment"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
            type="submit"
            className="w-full bg-purple-600 text-white text-sm rounded-lg py-1.5 hover:bg-purple-700 transition shadow-sm"
            >
                Add
            </button>
        </form>
    );
}