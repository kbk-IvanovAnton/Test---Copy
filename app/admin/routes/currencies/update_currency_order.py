# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.currencies import Currencies


@bp.route("/admin_menu/update_currency_order", methods=["POST"])
def update_currency_order():
    data = request.json
    currency_id = data.get("id")
    new_order = data.get("newOrder")

    try:
        currency = Currencies.query.get(currency_id)
        if currency:
            old_order = currency.order
            currency.order = new_order

            # Обновляем порядок для других записей
            if new_order > old_order:
                Currencies.query.filter(
                    Currencies.order <= new_order,
                    Currencies.order > old_order,
                    Currencies.id != currency_id,
                ).update({Currencies.order: Currencies.order - 1})
            else:
                Currencies.query.filter(
                    Currencies.order >= new_order,
                    Currencies.order < old_order,
                    Currencies.id != currency_id,
                ).update({Currencies.order: Currencies.order + 1})

            db.session.commit()
            return jsonify({"success": True, "message": "Order updated successfully"})
        else:
            return jsonify({"success": False, "message": "Currency not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
