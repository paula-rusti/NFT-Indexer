from flask import Flask, jsonify, request

from main import get_token_metadata

app = Flask(__name__)


@app.route('/python-crawler', methods=['POST'])
def my_api():
    # Access the JSON payload sent from JavaScript
    data = request.get_json()

    contract_address = data['contract_address']
    token_ids = data['token_ids']

    metadata_arr = []

    for token_id in token_ids:
        metadata = get_token_metadata(contract_address, token_id)
        metadata_arr.append(metadata)
        print(metadata)

    # Process the data and generate a result
    result = {'message': 'Hello from Python!', 'processed_data': metadata_arr}

    # Return the result as JSON
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='localhost', port=5000)
