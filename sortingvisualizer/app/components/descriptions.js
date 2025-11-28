export default function Descriptions() {
    return (
        <div>
        <div>
            <h2 className="text-3xl">
                More About the Algorithms
            </h2>
        </div>

        <div className="grid grid-cols-2 mt-8">

            <OneDescription
            title="Bubble Sort"
            description="A"
            />

            <OneDescription
            title="Insertion Sort"
            description="A"
            />

            <OneDescription
            title="Selection Sort"
            description="A"
            />

            <OneDescription
            title="Gnome Sort"
            description="A"
            />

            <OneDescription
            title="Merge Sort"
            description="A"
            />

            <OneDescription
            title="Quick Sort"
            description="A"
            />
        </div>

        

        </div>
    );
}


const OneDescription = ({title, description}) => {
    return (
        <div className="m-4 ml-0">
            <h3 className="text-2xl">
                {title}
            </h3>
            <div className="text-lg mt-2 font-sans">
                {description}
            </div>
        </div>
    );
}