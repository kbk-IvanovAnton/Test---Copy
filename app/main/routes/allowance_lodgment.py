from flask import jsonify, request

from app import db
from app.admin import bp
from app.main.models.allowance_lodgments import AllowanceLodgments


@bp.route("/admin_menu/allowance_lodgment", methods=["POST"])
def allowance_lodgment():
    data = request.get_json()
    print(data)

    accomodation_unit_price = data.get("accomodationUnitPrice")
    accomodation_days = data.get("accomodationDays")
    accomodation_allowance_check = data.get("accomodationAllowanceCheck")
    accomodation_sum_days = data.get("accomodationSumDays")

    if accomodation_unit_price and accomodation_days:
        new_allowance_lodgment = AllowanceLodgments(
            unit_price=int(accomodation_unit_price),
            days=int(accomodation_days),
            validity=bool(accomodation_allowance_check),
            applying_date=accomodation_sum_days,
        )

        db.session.add(new_allowance_lodgment)
        db.session.commit()

        return jsonify({"success": True, "message": "Данные успешно обработаны!"})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
