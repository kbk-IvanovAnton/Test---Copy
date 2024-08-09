# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.payment_metods import PaymentMethods


@bp.route("/admin_menu/update_payment_methods_order", methods=["POST"])
def update_payment_methods_order():
    data = request.json
    method_id = data.get("id")
    new_order = data.get("newOrder")

    try:
        method = PaymentMethods.query.get(method_id)
        if method:
            old_order = method.order
            method.order = new_order

            # Обновляем порядок для других записей
            if new_order > old_order:
                PaymentMethods.query.filter(
                    PaymentMethods.order <= new_order,
                    PaymentMethods.order > old_order,
                    PaymentMethods.id != method_id,
                ).update({PaymentMethods.order: PaymentMethods.order - 1})
            else:
                PaymentMethods.query.filter(
                    PaymentMethods.order >= new_order,
                    PaymentMethods.order < old_order,
                    PaymentMethods.id != method_id,
                ).update({PaymentMethods.order: PaymentMethods.order + 1})

            db.session.commit()
            return jsonify({"success": True, "message": "Order updated successfully"})
        else:
            return jsonify({"success": False, "message": "Travel not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
