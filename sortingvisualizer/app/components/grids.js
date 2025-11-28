export default function GridLayout() {
    return (
        <div className="grid grid-cols-3 m-8 ml-0">

            <Grid 
            text="01 Bubble Sort"
            />

            <Grid
            text="02 Insertion Sort"
            />

            <Grid 
            text="03 Selection Sort"
            />

            <Grid 
            text="04 Gnome Sort"
            />

            <Grid
            text="05 Merge Sort"
            />

            <Grid 
            text="06 Quick Sort"
            />

        </div>
    );
}

const Grid = ({text}) => {
    return (
        <div>
            <div className="text-xl p-4 pb-0 pl-0 pt-0">
                {text}
            </div>
            <div className="p-2 mt-1 pl-0">
                <div className="bg-white h-72 w-full">
                </div>
            </div>
        </div>
    );
}