import datetime

from flask import jsonify, redirect, request, url_for

from app import db
from app.admin import bp
from app.main.models.allowance_lodgments import AllowanceLodgments
from app.main.models.allowance_moves import AllowanceMoves
from app.main.models.allowance_special_cases import AllowanceSpecialCases
from app.main.models.allowance_specials import AllowanceSpecials
from app.main.models.allowance_works import AllowanceWorks
from app.main.models.allowances import Allowances
from app.main.models.details import Details
from app.main.models.order import Order
from app.main.models.rates import Rates


def safe_int_convert(value):
    try:
        return int(value) if value != "" else 0
    except ValueError:
        return 0


def safe_float_convert(value):
    try:
        return float(value.replace(",", "")) if value != "" else 0.0
    except ValueError:
        return 0.0


@bp.route("/admin_menu/allowances", methods=["POST"])
def allowances():
    data = request.get_json()
    # print(data)

    name_id = data.get("personName")
    order = data.get("orderName")
    order_number = data.get("orderNumber")
    detail_number = data.get("detailNumber")
    service_number = data.get("serviceNumber")
    service_card_number = data.get("serviceCardNumber")
    quote_number = data.get("quoteNumber")
    purchase_order_number = data.get("purchaseOrderNumber")
    travel_id = data.get("travelID")
    support_type_id = data.get("supportTypeID")

    row_rate_data = data.get("rowRateData")

    row_datails_data = data.get("rowDetailsData")

    accomodation_unit_price = data.get("accomodationUnitPrice")
    accomodation_days = data.get("accomodationDays")
    accomodation_allowance_check = data.get("accomodationAllowanceCheck")
    accomodation_sum_days = data.get("accomodationSumDays")

    event_work_dates = data.get("workDates")
    unit_work_price = data.get("unitWorkPrice")
    work_days = data.get("workDays")

    event_special_dates = data.get("eventSpecialDates")
    unit_special_price = data.get("unitSpecialPrice")
    special_days = data.get("specialDays")

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

    calendar_dates = data.get("calendarDates")

    earliest_date = datetime.date(start_year, start_month, start_day)
    oldest_date = datetime.date(end_year, end_month, end_day)

    if data:
        new_allowance = Allowances(
            departure_date=earliest_date,
            return_date=oldest_date,
            calendars=calendar_dates,
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
        new_allowance.allowance_special = AllowanceSpecials(
            applying_dates=event_special_dates,
            unit_prices=unit_special_price,
            days=special_days,
        )
        new_allowance.allowance_work = AllowanceWorks(
            applying_dates=event_work_dates,
            unit_prices=unit_work_price,
            days=work_days,
        )
        new_allowance.allowance_lodgment = AllowanceLodgments(
            unit_price=int(accomodation_unit_price),
            days=int(accomodation_days),
            validity=bool(accomodation_allowance_check),
            applying_date=accomodation_sum_days,
        )
        new_allowance.order = Order(
            name_id=name_id,
            order=order,
            order_number=order_number,
            detail_number=detail_number,
            service_number=service_number,
            service_card_number=service_card_number,
            quote_number=quote_number,
            purchase_order_number=purchase_order_number,
            travel_id=travel_id,
            support_type_id=support_type_id,
        )

        rates_list = []
        for item in row_rate_data:
            new_rate = Rates(
                currency_id=safe_int_convert(item.get("1", " ")),
                foreign_currency=safe_float_convert(item.get("2", " ")),
                temporary_payment=safe_float_convert(item.get("3", " ")),
                remaining_payment=safe_float_convert(item.get("4", " ")),
            )
            rates_list.append(new_rate)

        new_allowance.order.rates = rates_list

        details_list = []
        for index, item in enumerate(row_datails_data, start=1):
            new_detail = Details(
                row=index,
                account_item_id=safe_int_convert(item.get("1", " ")),
                content=item.get("2", " "),
                applying_date=item.get("3", " "),
                currency_id=safe_int_convert(item.get("4", " ")),
                unit_price=safe_float_convert(item.get("5", " ")),
                quantity=safe_int_convert(item.get("6", " ")),
                payment_method_id=safe_int_convert(item.get("7", " ")),
                receipt_id=safe_int_convert(item.get("8", " ")),
                remarks=item.get("9", " "),
            )
            details_list.append(new_detail)

        new_allowance.order.details = details_list

        db.session.add(new_allowance)
        db.session.commit()

        return jsonify({"success": True, "redirect_url": url_for("main.index")})
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
