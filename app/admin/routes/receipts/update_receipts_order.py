# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.receipts import Receipts


@bp.route("/admin_menu/update_receipts_order", methods=["POST"])
def update_receipts_order():
    data = request.json
    receipt_id = data.get("id")
    new_order = data.get("newOrder")

    try:
        receipt = Receipts.query.get(receipt_id)
        if receipt:
            old_order = receipt.order
            receipt.order = new_order

            # Обновляем порядок для других записей
            if new_order > old_order:
                Receipts.query.filter(
                    Receipts.order <= new_order,
                    Receipts.order > old_order,
                    Receipts.id != receipt_id,
                ).update({Receipts.order: Receipts.order - 1})
            else:
                Receipts.query.filter(
                    Receipts.order >= new_order,
                    Receipts.order < old_order,
                    Receipts.id != receipt_id,
                ).update({Receipts.order: Receipts.order + 1})

            db.session.commit()
            return jsonify({"success": True, "message": "Order updated successfully"})
        else:
            return jsonify({"success": False, "message": "Travel not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
