from flask import Flask, request, jsonify
from flask_cors import CORS
from route_engine import graph, dijkstra

app = Flask(__name__)
CORS(app)

@app.route("/route")
def get_route():
    start = request.args.get("start")
    end = request.args.get("end")

    if start not in graph or end not in graph:
        return jsonify({"error": "Invalid location"}), 400

    dist, path, ops = dijkstra(start, end)

    return jsonify({
        "path": path,
        "distance": dist,
        "operations": ops
    })


if __name__ == "__main__":
    app.run(debug=True)
