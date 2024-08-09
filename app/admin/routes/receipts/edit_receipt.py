# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.receipts import Receipts


@bp.route("/admin_menu/edit_receipt", methods=["POST"])
def edit_receipt():
    data = request.json
    receipt = Receipts.query.get(data["id"])
    if receipt:
        receipt.receiptName = data["name"]
        receipt.is_show = bool(data["is_show_receipt"])
        db.session.commit()
        return jsonify(success=True)
    return jsonify(success=False)
