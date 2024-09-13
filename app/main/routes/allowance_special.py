from flask import jsonify, request

from app import db
from app.admin import bp
from app.main.models.allowance_specials import AllowanceSpecials


@bp.route("/admin_menu/allowance_special", methods=["POST"])
def allowance_special():
    data = request.get_json()
    print(data)

    event_dates = data.get("eventSpecialDates")
    unit_price = data.get("unitSpecialPrice")
    days = data.get("specialDays")

    if data:
        new_allowance_special = AllowanceSpecials(
            applying_dates=event_dates,
            unit_prices=unit_price,
            days=days,
        )

        db.session.add(new_allowance_special)
        db.session.commit()

        return jsonify({"success": True, "message": "Данные успешно обработаны!"})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
