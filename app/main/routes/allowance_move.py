from flask import jsonify, request

from app import db
from app.admin import bp
from app.main.models.allowance_moves import AllowanceMoves


@bp.route("/admin_menu/allowance_move", methods=["POST"])
def allowance_move():
    data = request.get_json()
    print(data)

    move_events = data.get("moveEvents")
    move_days = data.get("moveDays")
    move_ids = data.get("moveIDs")
    move_prices = data.get("movePrices")

    if data:
        new_allowance_move = AllowanceMoves(
            location_ids=move_ids,
            applying_dates=move_events,
            unit_prices=move_prices,
            days=move_days,
        )

        db.session.add(new_allowance_move)
        db.session.commit()

        return jsonify({"success": True, "message": "Данные успешно обработаны!"})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
