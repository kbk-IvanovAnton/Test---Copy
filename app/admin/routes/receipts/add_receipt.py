# type: ignore
from flask import jsonify, redirect, request, url_for
from sqlalchemy import func

from app import db
from app.admin import bp
from app.admin.models.receipts import Receipts


@bp.route("/admin_menu/add_receipt", methods=["POST"])
def add_receipt():
    data = request.json
    new_receipt = Receipts(receiptName=data["receiptName"])
    if new_receipt:
        db.session.add(new_receipt)
        max_order = db.session.query(func.max(Receipts.order)).scalar() or 0
        new_receipt.order = max_order + 1
        db.session.commit()
        return jsonify(success=True, id=new_receipt.id)
    return redirect(url_for("admin/receipts_table"))
