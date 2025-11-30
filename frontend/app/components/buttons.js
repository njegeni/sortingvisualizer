export default function ButtonLayout({ arraySize, setArraySize, algorithm, setAlgorithm, mode, setMode, generateArray, isPlaying, togglePlayPause }) {
    return (
        <div className="space-y-8">
            <div className="flex space-x-4">
                <div className="bg-white text-black p-2 mt-4">
                    <label>Array Size: {arraySize}</label>
                    <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={arraySize}
                        onChange={(e) => setArraySize(Number(e.target.value))}
                        disabled={isPlaying}
                    />
                </div>
                
                <div className="bg-white text-black mt-4 p-2">
                    <select 
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                        disabled={isPlaying}
                    >
                        <option value="bubble">Bubble Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="gnome">Gnome Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                    </select>
                </div>
            </div>
           
            <div className="flex space-x-8">
                <button 
                    className="bg-white text-black p-2"
                    onClick={generateArray}
                    disabled={isPlaying}
                >
                    Generate New Array
                </button>
                
               <button 
                className="bg-white text-black p-2"
                onClick={togglePlayPause}
                >
                {isPlaying ? 'Pause' : 'Activate'}
                </button>
            </div>
        </div>
    );
}