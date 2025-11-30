export default function GridLayout({ array, comparisons, swaps, currentStep, steps }) {
   
    return (
        <div className="m-8 ml-0">
            <Grid 
                text="Sorting Visualizer"
                array={array}
                comparisons={comparisons}
                swaps={swaps}
            />
        </div>
    );
}

const Grid = ({ text, array, comparisons, swaps }) => {
    if (!array || array.length === 0) {
        return (
            <div>
                <div className="text-xl p-4 pb-0 pl-0 pt-0">
                    {text}
                </div>
                <div className="p-2 mt-1 pl-0">
                    <div className="bg-white h-72 w-full flex items-center justify-center">
                        <p className="text-black">Click "Generate New Array" to start</p>
                    </div>
                </div>
            </div>
        );
    }
    
    const maxValue = Math.max(...array, 1);
    
    return (
        <div>
            <div className="text-xl p-4 pb-0 pl-0 pt-0">
                {text}
            </div>
            
            <div className="flex gap-4 text-sm p-2 pl-0">
                <div>Comparisons: {comparisons}</div>
                <div>Swaps: {swaps}</div>
                <div>Array Size: {array.length}</div>
            </div>
            
            <div className="p-2 mt-1 pl-0">
                <div className="bg-white h-72 w-full flex items-end justify-around gap-0.5 p-2">
                    {array.map((value, index) => (
                        <div
                            key={index}
                            className="bg-blue-500 flex-1"
                            style={{
                                height: `${(value / maxValue) * 100}%`,
                                minWidth: '2px'
                            }}
                            title={`Value: ${value}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}