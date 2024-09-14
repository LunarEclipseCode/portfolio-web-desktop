import React, { Component } from "react";

export class Algo extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      isSorting: false,
      sorted: false,
      currentIndexes: [],
      maxHeight: 0, // Tracks the maximum height for the bars
      speed: 75, // Set 75% as the default speed
      selectedAlgorithm: "Bubble Sort", // Default selected algorithm
      comparisons: 0,
      accesses: 0,
      writes: 0,
    };
    this.sortingProcess = null;
    this.containerRef = React.createRef();
    this.topBarRef = React.createRef();
    this.resizeObserver = null;
  }

  componentDidMount() {
    this.updateMaxHeight(); // Calculate max height after the component mounts
    this.generateRandomArray();

    // ResizeObserver to monitor changes in the container's size
    this.resizeObserver = new ResizeObserver(() => {
      this.updateMaxHeight();
    });

    if (this.containerRef.current) {
      this.resizeObserver.observe(this.containerRef.current);
    }
  }

  componentWillUnmount() {
    if (this.resizeObserver && this.containerRef.current) {
      this.resizeObserver.unobserve(this.containerRef.current);
    }
    if (this.sortingProcess) {
      clearTimeout(this.sortingProcess);
    }
  }

  updateMaxHeight = () => {
    if (this.containerRef.current && this.topBarRef.current) {
      const containerHeight = this.containerRef.current.clientHeight;
      const topBarHeight = this.topBarRef.current.clientHeight;
      const availableHeight = containerHeight - topBarHeight - 60; // 60px for padding/margin and bottom bar
      const maxHeight = Math.max(availableHeight, 100); // Ensure at least 100px height
      this.setState({ maxHeight });
    }
  };

  generateRandomArray = () => {
    if (this.sortingProcess) {
      clearTimeout(this.sortingProcess);
      this.sortingProcess = null;
    }
    const array = [];
    for (let i = 0; i < 30; i++) {
      array.push(Math.floor(Math.random() * 100) + 1);
    }
    this.setState({
      array,
      sorted: false,
      currentIndexes: [],
      isSorting: false,
      comparisons: 0,
      accesses: 0,
      writes: 0,
    });
    this.updateMaxHeight(); // Recalculate height after generating the new array
  };

  incrementComparisons = () => {
    this.setState((prevState) => ({ comparisons: prevState.comparisons + 1 }));
  };

  incrementAccesses = () => {
    this.setState((prevState) => ({ accesses: prevState.accesses + 1 }));
  };

  incrementWrites = () => {
    this.setState((prevState) => ({ writes: prevState.writes + 1 }));
  };

  getSpeedDelay = () => {
    const minDelay = 20; // Minimum delay (fastest speed)
    const maxDelay = 1000; // Maximum delay (slowest speed)

    // Adjust the speed scale:
    // 75% on the new slider corresponds to 90% of the current scale
    const adjustedSpeed = this.state.speed <= 75 ? (this.state.speed / 75) * 90 : 90 + ((this.state.speed - 75) / 25) * 10;

    const speedFactor = (100 - adjustedSpeed) / 100;
    return minDelay + speedFactor * (maxDelay - minDelay);
  };

  bubbleSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.setState({ currentIndexes: [j, j + 1] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          this.setState({ array });
          this.incrementWrites();
        }

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  quickSort = async (low = 0, high = this.state.array.length - 1) => {
    let array = [...this.state.array];
    this.setState({ isSorting: true, sorted: false });

    const partition = async (low, high) => {
      let pivot = array[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        this.setState({ currentIndexes: [j, high] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          this.setState({ array });
          this.incrementWrites();
        }

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      this.setState({ array });
      this.incrementWrites();

      await new Promise((resolve) => {
        this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
      });

      return i + 1;
    };

    const quickSortRecursive = async (low, high) => {
      if (low < high) {
        let pi = await partition(low, high);

        await quickSortRecursive(low, pi - 1);
        await quickSortRecursive(pi + 1, high);
      }
    };

    await quickSortRecursive(low, high);
    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  mergeSort = async (start = 0, end = this.state.array.length - 1) => {
    let array = [...this.state.array];
    this.setState({ isSorting: true, sorted: false });

    const merge = async (start, mid, end) => {
      let leftArray = array.slice(start, mid + 1);
      let rightArray = array.slice(mid + 1, end + 1);
      let leftIndex = 0,
        rightIndex = 0;
      let sortedIndex = start;

      while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        this.setState({ currentIndexes: [sortedIndex] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
          array[sortedIndex] = leftArray[leftIndex];
          leftIndex++;
        } else {
          array[sortedIndex] = rightArray[rightIndex];
          rightIndex++;
        }

        this.setState({ array });
        this.incrementWrites();

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });

        sortedIndex++;
      }

      while (leftIndex < leftArray.length) {
        this.setState({ currentIndexes: [sortedIndex] });

        array[sortedIndex] = leftArray[leftIndex];
        leftIndex++;
        sortedIndex++;

        this.setState({ array });
        this.incrementWrites();

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }

      while (rightIndex < rightArray.length) {
        this.setState({ currentIndexes: [sortedIndex] });

        array[sortedIndex] = rightArray[rightIndex];
        rightIndex++;
        sortedIndex++;

        this.setState({ array });
        this.incrementWrites();

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }
    };

    const mergeSortRecursive = async (start, end) => {
      if (start < end) {
        let mid = Math.floor((start + end) / 2);

        await mergeSortRecursive(start, mid);
        await mergeSortRecursive(mid + 1, end);
        await merge(start, mid, end);
      }
    };

    await mergeSortRecursive(start, end);
    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  insertionSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > key) {
        this.setState({ currentIndexes: [j, j + 1] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        array[j + 1] = array[j];
        this.setState({ array });
        this.incrementWrites();

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });

        j--;
      }
      array[j + 1] = key;
      this.setState({ array });
      this.incrementWrites();

      await new Promise((resolve) => {
        this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
      });
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  selectionSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        this.setState({ currentIndexes: [minIndex, j] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        if (array[j] < array[minIndex]) {
          minIndex = j;
        }

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }

      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        this.setState({ array });
        this.incrementWrites();

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  heapify = async (array, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    this.incrementComparisons();
    this.incrementAccesses();

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    this.incrementComparisons();
    this.incrementAccesses();

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      this.setState({ currentIndexes: [i, largest] });
      [array[i], array[largest]] = [array[largest], array[i]];
      this.setState({ array });
      this.incrementWrites();

      await new Promise((resolve) => {
        this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
      });

      await this.heapify(array, n, largest);
    }
  };

  heapSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      this.setState({ currentIndexes: [0, i] });
      [array[0], array[i]] = [array[i], array[0]];
      this.setState({ array });
      this.incrementWrites();

      await new Promise((resolve) => {
        this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
      });

      await this.heapify(array, i, 0);
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  cocktailSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    let swapped = true;
    let start = 0;
    let end = n - 1;

    while (swapped) {
      swapped = false;

      for (let i = start; i < end; i++) {
        this.setState({ currentIndexes: [i, i + 1] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          this.setState({ array });
          this.incrementWrites();
          swapped = true;
        }

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }

      if (!swapped) break;

      swapped = false;
      end--;

      for (let i = end - 1; i >= start; i--) {
        this.setState({ currentIndexes: [i, i + 1] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          this.setState({ array });
          this.incrementWrites();
          swapped = true;
        }

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }

      start++;
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  pancakeSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    const flip = async (end) => {
      this.setState({ currentIndexes: [...Array(end + 1).keys()] });
      let start = 0;
      while (start < end) {
        [array[start], array[end]] = [array[end], array[start]];
        start++;
        end--;
        this.incrementWrites();
      }
      this.setState({ array });

      await new Promise((resolve) => {
        this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
      });
    };

    for (let currSize = n; currSize > 1; currSize--) {
      let maxIndex = 0;
      for (let i = 1; i < currSize; i++) {
        this.setState({ currentIndexes: [i, maxIndex] });

        this.incrementComparisons();
        this.incrementAccesses();

        if (array[i] > array[maxIndex]) {
          maxIndex = i;
        }

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }

      if (maxIndex !== currSize - 1) {
        await flip(maxIndex);
        await flip(currSize - 1);
      }
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  combSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    let gap = n;
    let swapped = true;
    const shrinkFactor = 1.3;

    while (gap > 1 || swapped) {
      gap = Math.floor(gap / shrinkFactor);
      if (gap < 1) {
        gap = 1;
      }

      swapped = false;

      for (let i = 0; i + gap < n; i++) {
        this.setState({ currentIndexes: [i, i + gap] });

        this.incrementComparisons();
        this.incrementAccesses();
        this.incrementAccesses();

        if (array[i] > array[i + gap]) {
          [array[i], array[i + gap]] = [array[i + gap], array[i]];
          this.setState({ array });
          this.incrementWrites();
          swapped = true;
        }

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  shellSort = async () => {
    let array = [...this.state.array];
    let n = array.length;
    this.setState({ isSorting: true, sorted: false });

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = array[i];
        let j;
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          this.setState({ currentIndexes: [j, j - gap] });

          this.incrementComparisons();
          this.incrementAccesses();
          this.incrementAccesses();

          array[j] = array[j - gap];
          this.setState({ array });
          this.incrementWrites();

          await new Promise((resolve) => {
            this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
          });
        }
        array[j] = temp;
        this.setState({ array });
        this.incrementWrites();

        await new Promise((resolve) => {
          this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
        });
      }
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  bogoSort = async () => {
    let array = [...this.state.array];
    this.setState({ isSorting: true, sorted: false });

    while (!this.isSorted(array)) {
      this.shuffleArray(array);
      this.setState({ array });
      this.incrementWrites();

      await new Promise((resolve) => {
        this.sortingProcess = setTimeout(resolve, this.getSpeedDelay());
      });
    }

    this.setState({ isSorting: false, sorted: true, currentIndexes: [] });
  };

  isSorted = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  handleSpeedChange = (event) => {
    this.setState({ speed: event.target.value });
  };

  handleAlgorithmChange = (event) => {
    this.setState({ selectedAlgorithm: event.target.value });
  };

  handleRun = () => {
    const { isSorting, sorted, selectedAlgorithm } = this.state;

    if (!isSorting && !sorted) {
      // Start Sorting
      if (selectedAlgorithm === "Bubble Sort") {
        this.bubbleSort();
      } else if (selectedAlgorithm === "Quick Sort") {
        this.quickSort();
      } else if (selectedAlgorithm === "Merge Sort") {
        this.mergeSort();
      } else if (selectedAlgorithm === "Insertion Sort") {
        this.insertionSort();
      } else if (selectedAlgorithm === "Selection Sort") {
        this.selectionSort();
      } else if (selectedAlgorithm === "Heap Sort") {
        this.heapSort();
      } else if (selectedAlgorithm === "Cocktail Sort") {
        this.cocktailSort();
      } else if (selectedAlgorithm === "Pancake Sort") {
        this.pancakeSort();
      } else if (selectedAlgorithm === "Comb Sort") {
        this.combSort();
      } else if (selectedAlgorithm === "Shell Sort") {
        this.shellSort();
      } else if (selectedAlgorithm === "Bogo Sort") {
        this.bogoSort();
      }
    }
  };

  renderArray = () => {
    const { array, maxHeight } = this.state;
    const barCount = array.length;
    const barSpacing = 2; // spacing between bars in pixels
    const totalSpacing = barSpacing * (barCount - 1);
    const barWidth = `calc(${100 / barCount}% - ${totalSpacing / barCount}px)`;
    const maxArrayValue = Math.max(...array);

    return (
      <div className="flex justify-center items-end h-full w-full">
        {array.map((value, index) => (
          <div
            key={index}
            className={`mx-0.5 ${this.state.currentIndexes.includes(index) ? "bg-red-500" : "bg-blue-500"}`}
            style={{
              height: `${(value / maxArrayValue) * maxHeight}px`,
              width: barWidth,
              transition: "height 0.1s ease",
            }}
          ></div>
        ))}
      </div>
    );
  };

  render() {
    const { isSorting, sorted, speed, selectedAlgorithm, comparisons, accesses, writes } = this.state;
    const runButtonLabel = !isSorting && !sorted ? "Run" : "";
    const isRunButtonDisabled = isSorting || (!isSorting && sorted) || (!isSorting && !sorted && !selectedAlgorithm);

    return (
      <div className="w-full h-full flex flex-col bg-gray-800 text-white select-none" ref={this.containerRef}>
        <div className="w-full bg-gray-700 text-sm p-1 flex flex-wrap items-center justify-between" ref={this.topBarRef}>
          <div className="flex items-center space-x-2">
            <button onClick={this.generateRandomArray} className="border border-gray-600 bg-gray-600 px-3 py-1 rounded hover:bg-gray-500 focus:outline-none">
              Generate
            </button>
            <select
              value={selectedAlgorithm}
              onChange={this.handleAlgorithmChange}
              disabled={isSorting || sorted}
              className={`border border-gray-600 bg-gray-600 px-3 py-1 rounded focus:outline-none ${isSorting || sorted ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"}`}
            >
              <option>Bubble Sort</option>
              <option>Quick Sort</option>
              <option>Merge Sort</option>
              <option>Insertion Sort</option>
              <option>Selection Sort</option>
              <option>Heap Sort</option>
              <option>Cocktail Sort</option>
              <option>Pancake Sort</option>
              <option>Comb Sort</option>
              <option>Shell Sort</option>
              <option>Bogo Sort</option>
            </select>
            <button onClick={this.handleRun} disabled={isRunButtonDisabled} className={`border border-gray-600 bg-gray-600 px-3 py-1 rounded focus:outline-none ${isRunButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"}`}>
              {isSorting ? <div className="loading-spinner"></div> : sorted ? "Sorted" : runButtonLabel}
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-1 sm:mt-0">
            <label htmlFor="speedRange" className="text-white">
              Speed:
            </label>
            <input id="speedRange" type="range" min="1" max="100" value={speed} onChange={this.handleSpeedChange} className="w-32" />
          </div>
        </div>
        <div className="flex-grow flex justify-center items-center bg-gray-900 overflow-hidden relative">{this.renderArray()}</div>
        <div className="w-full bg-gray-700 text-sm p-1 flex justify-around items-center">
          <div>Comparisons: {comparisons}</div>
          <div>Accesses: {accesses}</div>
          <div>Writes: {writes}</div>
        </div>
        <style jsx>{`
          .loading-spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Algo;

export const displayAlgo = () => {
  return <Algo />;
};
