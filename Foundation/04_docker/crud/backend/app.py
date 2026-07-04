from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = [
    {"id": 1, "name": "Write documentation", "description": "Summarize the project setup"},
    {"id": 2, "name": "Ship feature", "description": "Deploy the CRUD flow to production"},
]


@app.get("/api/items")
def get_items():
    return jsonify(items)


@app.get("/api/items/<int:item_id>")
def get_item(item_id):
    item = next((entry for entry in items if entry["id"] == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found."}), 404
    return jsonify(item)


@app.post("/api/items")
def create_item():
    payload = request.get_json(silent=True) or {}
    name = payload.get("name")
    description = payload.get("description")

    if not name or not description:
        return jsonify({"error": "Name and description are required."}), 400

    new_item = {"id": len(items) + 1, "name": name, "description": description}
    items.append(new_item)
    return jsonify(new_item), 201


@app.put("/api/items/<int:item_id>")
def update_item(item_id):
    payload = request.get_json(silent=True) or {}
    name = payload.get("name")
    description = payload.get("description")

    if not name or not description:
        return jsonify({"error": "Name and description are required."}), 400

    item = next((entry for entry in items if entry["id"] == item_id), None)
    if item is None:
        return jsonify({"error": "Item not found."}), 404

    item["name"] = name
    item["description"] = description
    return jsonify(item)


@app.delete("/api/items/<int:item_id>")
def delete_item(item_id):
    global items
    original_count = len(items)
    items = [entry for entry in items if entry["id"] != item_id]
    if len(items) == original_count:
        return jsonify({"error": "Item not found."}), 404
    return "", 204


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
