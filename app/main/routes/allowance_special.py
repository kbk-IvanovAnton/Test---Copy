from flask import jsonify, request

from app import db
from app.admin import bp
from app.main.models.allowance_specials import AllowanceSpecials


@bp.route("/admin_menu/allowance_special", methods=["POST"])
def allowance_special():
    data = request.get_json()
    print(data)

    event_dates = data.get("eventDates")
    unit_price = data.get("unitPrice")
    days = data.get("days")

    if event_dates and unit_price and days:
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
