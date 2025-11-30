from flask import Flask, request, jsonify
from flask_cors import CORS 
import numpy as np
from typing import List, Dict, Generator, Any
app = Flask(__name__)
CORS(app)

# route -> what url should trigger our function
# function returns what we want to display in the users browser

# have to generate array first
def gen_array(size: int, mode: str): # mode has 3 options, sorted, reverse, or random
    if mode == "sorted":
        array = np.arange(size)
    elif mode == "reverse":
        array = np.arange(size)
        array = np.flip(array)
    else:
        array = np.random.randint(0, 100, size=size)
    return array.tolist()

#bubble sort
def bubble_sort(array: list):
    arr = list(array)
    n = len(arr)
    #metrics for visualization
    comparisons = 0
    swaps = 0

    for i in range(n-1):
        for j in range(n-i-1):
            comparisons += 1
            yield {
                "array": list(arr), 
                "metrics": {"comps": comparisons, "swaps": swaps}, 
                "comparing": [j, j + 1]
            }
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swaps += 1
                yield {
                    "array": list(arr), 
                    "metrics": {"comps": comparisons, "swaps": swaps}, 
                    "swapping": [j, j + 1]
                }
    yield {
        "array": list(arr),
        "metrics": {"comps": comparisons, "swaps": swaps}, 
        "sorted": True
    }


def insertion_sort(array: list):
    arr = list(array)
    n = len(arr)
    comparisons = 0
    swaps = 0

    for i in range(1, n):
        current_value = arr[i]
        j = i - 1
        
        while True:
            comparisons += 1
            
            yield {
                "array": list(arr), 
                "metrics": {"comps": comparisons, "swaps": swaps}, 
                "comparing": [j + 1, j],
                "pivot_value_index": i
            }
            
            if j < 0 or arr[j] <= current_value:
                break
            
            arr[j + 1] = arr[j]
            swaps += 1
            
            yield {
                "array": list(arr), 
                "metrics": {"comps": comparisons, "swaps": swaps}, 
                "swapping": [j, j + 1]
            }
            
            j -= 1

        arr[j + 1] = current_value
        swaps += 1
        
        yield {
            "array": list(arr), 
            "metrics": {"comps": comparisons, "swaps": swaps}, 
            "inserting": [j + 1]
        }
    
    yield {
        "array": list(arr),
        "metrics": {"comps": comparisons, "swaps": swaps}, 
        "sorted": True
    }


def selection_sort(array: list):
    arr = list(array)
    n = len(arr)
    comparisons = 0
    swaps = 0
    
    for i in range(n - 1):
        min_index = i
        
        yield {
            "array": list(arr), 
            "metrics": {"comps": comparisons, "swaps": swaps}, 
            "pivot": [i], 
            "min_index": [min_index]
        }
        
        for j in range(i + 1, n):
            comparisons += 1
            
            yield {
                "array": list(arr), 
                "metrics": {"comps": comparisons, "swaps": swaps}, 
                "comparing": [j, min_index],
                "pivot": [i]
            }
            
            if arr[j] < arr[min_index]:
                min_index = j
                
                yield {
                    "array": list(arr), 
                    "metrics": {"comps": comparisons, "swaps": swaps}, 
                    "min_index": [min_index],
                    "pivot": [i]
                }
        
        arr[i], arr[min_index] = arr[min_index], arr[i]
        swaps += 1
        
        yield {
            "array": list(arr), 
            "metrics": {"comps": comparisons, "swaps": swaps}, 
            "swapping": [i, min_index],
            "sorted_index": [i]
        }

    yield {
        "array": list(arr), 
        "metrics": {"comps": comparisons, "swaps": swaps}, 
        "sorted": True
    }

def gnome_sort(array: list):
    arr = list(array)
    comparisons = 0
    swaps = 0
    index = 0
    n = len(arr)
    
    while index < n:
        if index == 0:
            index += 1
        else:
            comparisons += 1
            
            yield {
                "array": list(arr), 
                "metrics": {"comps": comparisons, "swaps": swaps}, 
                "comparing": [index, index - 1]
            }
            
            if arr[index] >= arr[index - 1]:
                index += 1
            else:
                arr[index], arr[index - 1] = arr[index - 1], arr[index]
                swaps += 1
                
                yield {
                    "array": list(arr), 
                    "metrics": {"comps": comparisons, "swaps": swaps}, 
                    "swapping": [index, index - 1]
                }
                
                index -= 1
                
    yield {
        "array": list(arr), 
        "metrics": {"comps": comparisons, "swaps": swaps}, 
        "sorted": True
    }

def quick_sort(array: list):
    arr = list(array)
    metrics = {"comps": 0, "swaps": 0}
    stack = [(0, len(arr) - 1)]

    def partition(arr, low, high, metrics):
        pivot = arr[high]
        i = low - 1
        
        yield {
            "array": list(arr), 
            "metrics": metrics, 
            "pivot": [high]
        }
        
        for j in range(low, high):
            metrics["comps"] += 1
            
            yield {
                "array": list(arr), 
                "metrics": metrics, 
                "comparing": [j], 
                "pivot": [high]
            }
            
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                metrics["swaps"] += 1
                
                yield {
                    "array": list(arr), 
                    "metrics": metrics, 
                    "swapping": [i, j], 
                    "pivot": [high]
                }
        
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        metrics["swaps"] += 1
        
        yield {
            "array": list(arr), 
            "metrics": metrics, 
            "sorted_index": [i + 1]
        }
        
        return i + 1

    while stack:
        low, high = stack.pop()
        
        if low < high:
            
            partition_generator = partition(arr, low, high, metrics)
            for state in partition_generator:
                yield state
            
            pivot_index = state.get('sorted_index', [0])[0]
            
            stack.append((pivot_index + 1, high))
            stack.append((low, pivot_index - 1))
            
    yield {
        "array": list(arr), 
        "metrics": metrics, 
        "sorted": True
    }

def merge_sort(array: list):
    arr = list(array)
    metrics = {"comps": 0, "swaps": 0}
    
    def merge(left, right, arr, start_index, metrics):
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            metrics["comps"] += 1
            
            yield {
                "array": list(arr), 
                "metrics": metrics, 
                "comparing": [start_index + i, start_index + len(left) + j]
            }
            
            if left[i] < right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        
        result.extend(left[i:])
        result.extend(right[j:])
        
        for k in range(len(result)):
            arr[start_index + k] = result[k]
            metrics["swaps"] += 1
            
            yield {
                "array": list(arr), 
                "metrics": metrics, 
                "swapping": [start_index + k]
            }

    def _merge_sort(arr, low, high, metrics):
        if low >= high:
            return
            
        mid = (low + high) // 2
        
        yield from _merge_sort(arr, low, mid, metrics)
        yield from _merge_sort(arr, mid + 1, high, metrics)
        
        left = arr[low:mid + 1]
        right = arr[mid + 1:high + 1]
        
        yield from merge(left, right, arr, low, metrics)

    yield from _merge_sort(arr, 0, len(arr) - 1, metrics)
    
    yield {
        "array": list(arr), 
        "metrics": metrics,
        "sorted": True
    }

algorithms = {
    "bubble": bubble_sort,
    "insertion": insertion_sort,
    "selection": selection_sort,
    "gnome": gnome_sort,
    "merge": merge_sort,
    "quick": quick_sort,
}

@app.route('/api/sort/generate', methods=['POST'])
def generate_sort_steps():
    try:
        data = request.get_json()
        size = int(data.get('size', 50))
        mode = data.get('mode', 'random')
        algorithm_key = data.get('algorithm', 'bubble')
    except Exception:
        return jsonify({"error": "Invalid request format or missing parameters."}), 400

    generator_func = algorithms.get(algorithm_key)
    if not generator_func:
        return jsonify({"error": f"Algorithm '{algorithm_key}' not supported."}), 400

    try:
        initial_array = gen_array(size, mode)
        original_array = list(initial_array)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
    try:
        steps = list(generator_func(initial_array))
    except Exception as e:
        return jsonify({"error": f"Error during algorithm execution: {e}"}), 500

    return jsonify({
        "initial_array": original_array,
        "steps": steps
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)