# type: ignore


from flask import jsonify, request

from app import db
from app.admin import bp
from app.admin.models.travel import Travel


@bp.route("/admin_menu/update_single_order", methods=["POST"])
def update_single_order():
    data = request.json
    travel_id = data.get("id")
    new_order = data.get("newOrder")

    try:
        travel = Travel.query.get(travel_id)
        if travel:
            old_order = travel.order
            travel.order = new_order

            # Обновляем порядок для других записей
            if new_order > old_order:
                Travel.query.filter(
                    Travel.order <= new_order, Travel.order > old_order, Travel.id != travel_id
                ).update({Travel.order: Travel.order - 1})
            else:
                Travel.query.filter(
                    Travel.order >= new_order, Travel.order < old_order, Travel.id != travel_id
                ).update({Travel.order: Travel.order + 1})

            db.session.commit()
            return jsonify({"success": True, "message": "Order updated successfully"})
        else:
            return jsonify({"success": False, "message": "Travel not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
