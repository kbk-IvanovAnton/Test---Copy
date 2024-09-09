from flask import jsonify, request

from app import db
from app.admin import bp
from app.main.models.allowance_special_cases import AllowanceSpecialCases


@bp.route("/admin_menu/allowance_special_case", methods=["POST"])
def allowance_special_case():
    data = request.get_json()
    print(data)

    event_dates = data.get("eventExeptionDates")
    unit_price = data.get("exeptionAllowanceUnitPrice_Int")
    days = data.get("exeptionAllowanceDays_Int")

    if data:
        new_allowance_special_case = AllowanceSpecialCases(
            applying_date=event_dates,
            unit_price=unit_price,
            days=days,
        )

        db.session.add(new_allowance_special_case)
        db.session.commit()

        return jsonify({"success": True, "message": "Данные успешно обработаны!"})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
