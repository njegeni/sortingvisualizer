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
            description="
            The Bubble Sort algorithm sorts arrays from the lowest to the highest value, it goes through the arrays one value at a time, and compares the value with the next value, if the value is higher than the next one, it swaps them so the highest value comes last. The time complexity of this algorithm is O(n^2) as for an array for n values, there are n comparisons in one loop
            "
            />

            <OneDescription
            title="Insertion Sort"
            description="
            The Insertion Sort algorithm sorts arrays by dividing arrays into two parts; one with sorted values and the other with values that haven’t been sorted yet. It takes in one value at a time until the array is sorted. The time complexity of this algorithm is O(n^2)
            "
            />

            <OneDescription
            title="Selection Sort"
            description="
            The Selection Sort algorithm works by finding the lowest value in an array and moving it to the front of the array. It goes through the array one value at a time, and keeps track of the lowest value, which is moved to the front. The time complexity for this algorithm is O(n^2) as on average, there are about (n/2) elements compared to find the lowest value, and it must run the loop n times to find the lowest value.
            "
            />

            <OneDescription
            title="Gnome Sort"
            description="
            The Gnome Sort algorithm works by sorting one element at a time, he first looks at the flower pots adjacent to the element, if they are, it moves one step forward and continues the process unless it is at the last one.
            "
            />

            <OneDescription
            title="Merge Sort"
            description="
            The Merge Sort algorithm works by breaking the array down into smaller arrays, then building the array back together the correct way. The time complexity for this O(n * log n)
            "
            />

            <OneDescription
            title="Quick Sort"
            description="
            The Quick Sort algorithm is one of the fastest sorting algorithms, it takes in an array of values, chooses one of the values as the “pivot” element and moves all lower values on the left of the pivot element. The average time complexity for this algorithm is O(n * logn)
            "
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