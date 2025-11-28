export default function ButtonLayout() {
    return (
        <div className="space-y-8">
            <div className="bg-white text-black p-2 mt-4">
                Array Size
            </div>
            <div className="flex space-x-8">
                <div className="bg-white text-black p-2">
                    Generate New Array
                </div>
                <div className="bg-white text-black p-2">
                    Activate
                </div>
            </div>
        </div>
    );
}