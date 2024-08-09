# type: ignore

from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.currencies import Currencies


@bp.route("/admin_menu/delete_currency", methods=["POST"])
def delete_currency():
    data = request.json
    currency = Currencies.query.get(data["id"])
    if currency:
        db.session.delete(currency)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
