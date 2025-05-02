import React,{useState} from "react";

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
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-2">
            <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a comment"
            className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button
            type="submit"
            className="bg-green-500 text-white px-3 rounded text-sm hover:bg-green-600 transition"
            >
                Add
            </button>
        </form>
    );
}

export default AddCommentForm