from flask import jsonify, request

from app import db
from app.admin import bp
from app.main.models.allowance_works import AllowanceWorks


@bp.route("/admin_menu/allowance_work", methods=["POST"])
def allowance_work():
    data = request.get_json()
    print(data)

    event_dates = data.get("eventDates")
    unit_price = data.get("unitPrice")
    days = data.get("days")

    if event_dates and unit_price and days:
        new_allowance_work = AllowanceWorks(
            applying_dates=event_dates,
            unit_prices=unit_price,
            days=days,
        )

        db.session.add(new_allowance_work)
        db.session.commit()

        return jsonify({"success": True, "message": "Данные успешно обработаны!"})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
