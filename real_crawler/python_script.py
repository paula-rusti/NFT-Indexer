# dummy script to test IPC between Python and Node.js
import sys

if __name__ == '__main__':
    # Access command line arguments
    args = sys.argv[1:]  # Exclude the script name from the arguments list

    # Process the arguments
    result = {'message': 'Hello from Python!', 'arguments': args}

    # Print the result
    print(result)
    print(result)
    print(result)
