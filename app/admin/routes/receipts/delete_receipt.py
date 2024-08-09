# type: ignore

from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.receipts import Receipts


@bp.route("/admin_menu/delete_receipt", methods=["POST"])
def delete_receipt():
    data = request.json
    receipt = Receipts.query.get(data["id"])
    if receipt:
        db.session.delete(receipt)
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
