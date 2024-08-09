from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.account_items import AccountItems


@bp.route("/admin_menu/update_account_items_order", methods=["POST"])
def update_account_items_order():
    data = request.json
    item_id = data.get("id")
    new_order = data.get("newOrder")

    try:
        item = AccountItems.query.get(item_id)
        if item:
            old_order = item.order
            item.order = new_order

            # Обновляем порядок для других записей
            if new_order > old_order:
                AccountItems.query.filter(
                    AccountItems.order <= new_order,
                    AccountItems.order > old_order,
                    AccountItems.id != item_id,
                ).update({AccountItems.order: AccountItems.order - 1})
            else:
                AccountItems.query.filter(
                    AccountItems.order >= new_order,
                    AccountItems.order < old_order,
                    AccountItems.id != item_id,
                ).update({AccountItems.order: AccountItems.order + 1})

            db.session.commit()
            return jsonify({"success": True, "message": "Order updated successfully"})
        else:
            return jsonify({"success": False, "message": "Travel not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
