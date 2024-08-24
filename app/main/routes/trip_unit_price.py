from flask import jsonify, request

from app import db
from app.main import bp
from app.main.models.locations1 import (
    Locations1,  # Предполагается, что ваша модель находится в файле models.py
)


@bp.route("/admin_menu/get_allowance", methods=["POST"])
def get_allowance():
    data = request.json
    allowance = Locations1.query.get(data["id"])
    if allowance:
        return jsonify(success=True, allowance=allowance.allowance)
    return jsonify(success=False)
