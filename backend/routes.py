from flask import request, jsonify
import json
import random

from chatbot import get_chat_response


def register_routes(app):

    @app.route("/")
    def home():

        return "GramSathi AI Backend Running"


    @app.route(
        "/chat",
        methods=["POST"]
    )
    def chat():

        data = request.json

        message = data.get(
            "message",
            ""
        )

        reply = get_chat_response(
            message
        )

        return jsonify({
            "reply": reply
        })


    @app.route(
        "/complaint",
        methods=["POST"]
    )
    def complaint():
        data = request.json

        complaint_id = (
            "CMP-2026-"
            + str(
                random.randint(
                    1000,
                    9999
                )
            )
        )

        data["complaint_id"] = complaint_id

        with open(
            "database/complaints.json",
            "a",
            encoding="utf-8"
        ) as file:
            file.write(json.dumps(data) + "\n")

        return jsonify({
            "message": "Complaint Submitted Successfully",
            "complaint_id": complaint_id
        })

    @app.route(
        "/track-complaint",
        methods=["POST"]
    )
    def track_complaint():
        data = request.json

        complaint_id = data.get(
            "complaint_id",
            ""
        )

        try:
            with open(
                "database/complaints.json",
                "r",
                encoding="utf-8"
            ) as file:
                lines = file.readlines()

            for line in lines:
                try:
                    complaint = json.loads(line.strip())

                    if complaint.get("complaint_id") == complaint_id:
                        return jsonify({
                            "found": True,
                            "name": complaint.get("name"),
                            "village": complaint.get("village"),
                            "complaint": complaint.get("complaint"),
                            "status": "Pending"
                        })
                except json.JSONDecodeError:
                    continue

            return jsonify({
                "found": False
            })
        except Exception as e:
            return jsonify({
                "found": False,
                "error": str(e)
            })