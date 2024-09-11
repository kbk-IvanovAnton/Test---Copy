import datetime

from flask import jsonify, request

from app import db
from app.admin import bp

# from app.main.models.allowance_lodgments import AllowanceLodgments
from app.main.models.allowance_moves import AllowanceMoves

# from app.main.models.allowance_special_cases import AllowanceSpecialCases
# from app.main.models.allowance_specials import AllowanceSpecials
# from app.main.models.allowance_works import AllowanceWorks
from app.main.models.allowances import Allowances


@bp.route("/admin_menu/allowances", methods=["POST"])
def allowances():
    data = request.get_json()
    print(data)

    earliest_date_str = data.get("earliestDate")
    oldest_date_str = data.get("oldestDate")

    earliest_date = datetime.datetime.strptime(earliest_date_str, "%Y-%m-%d").date()
    oldest_date = datetime.datetime.strptime(oldest_date_str, "%Y-%m-%d").date()

    if data:
        new_allowance = Allowances(
            departure_date=earliest_date,
            return_date=oldest_date,
        )
        # new_allowance.allowance_move = AllowanceMoves(
        #     location_ids=1,
        #     applying_dates=1,
        #     unit_prices=1,
        #     days=1,
        # )

        db.session.add(new_allowance)
        # print(new_allowance)
        db.session.commit()

        return jsonify({"success": True, "message": "Данные успешно обработаны!"})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
