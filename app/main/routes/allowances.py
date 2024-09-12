import datetime

from flask import jsonify, request

from app import db
from app.admin import bp

# from app.main.models.allowance_lodgments import AllowanceLodgments
from app.main.models.allowance_moves import AllowanceMoves
from app.main.models.allowance_special_cases import AllowanceSpecialCases

# from app.main.models.allowance_specials import AllowanceSpecials
# from app.main.models.allowance_works import AllowanceWorks
from app.main.models.allowances import Allowances


@bp.route("/admin_menu/allowances", methods=["POST"])
def allowances():
    data = request.get_json()
    print(data)

    event_exception_dates = data.get("eventExeptionDates")
    unit_exception_price = data.get("exeptionAllowanceUnitPrice_Int")
    exception_days = data.get("exeptionAllowanceDays_Int")

    move_events = data.get("moveEvents")
    move_days = data.get("moveDays")
    move_ids = data.get("moveIDs")
    move_prices = data.get("movePrices")

    start_year = int(data.get("startYear"))
    start_month = int(data.get("startMonth"))
    start_day = int(data.get("startDay"))
    end_year = int(data.get("endYear"))
    end_month = int(data.get("endMonth"))
    end_day = int(data.get("endDay"))

    earliest_date = datetime.date(start_year, start_month, start_day)
    oldest_date = datetime.date(end_year, end_month, end_day)

    if data:
        new_allowance = Allowances(
            departure_date=earliest_date,
            return_date=oldest_date,
        )
        new_allowance.allowance_move = AllowanceMoves(
            location_ids=move_ids,
            applying_dates=move_events,
            unit_prices=move_prices,
            days=move_days,
        )
        new_allowance.allowance_special_case = AllowanceSpecialCases(
            applying_date=event_exception_dates,
            unit_price=unit_exception_price,
            days=exception_days,
        )

        db.session.add(
            new_allowance,
        )
        # print(new_allowance)
        db.session.commit()

        return jsonify({"success": True, "message": "Данные успешно обработаны!"})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
