from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.supported_types import SupportedTypes


@bp.route("/admin_menu/update_supported_types_order", methods=["POST"])
def update_supported_types_order():
    data = request.json
    types_id = data.get("id")
    new_order = data.get("newOrder")

    try:
        types = SupportedTypes.query.get(types_id)
        if types:
            old_order = types.order
            types.order = new_order

            # Обновляем порядок для других записей
            if new_order > old_order:
                SupportedTypes.query.filter(
                    SupportedTypes.order <= new_order,
                    SupportedTypes.order > old_order,
                    SupportedTypes.id != types_id,
                ).update({SupportedTypes.order: SupportedTypes.order - 1})
            else:
                SupportedTypes.query.filter(
                    SupportedTypes.order >= new_order,
                    SupportedTypes.order < old_order,
                    SupportedTypes.id != types_id,
                ).update({SupportedTypes.order: SupportedTypes.order + 1})

            db.session.commit()
            return jsonify({"success": True, "message": "Order updated successfully"})
        else:
            return jsonify({"success": False, "message": "Type not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
