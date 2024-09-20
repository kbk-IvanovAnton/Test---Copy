import datetime

import openpyxl as opl
from flask import jsonify, redirect, request, url_for

from app import db
from app.main import bp


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
    print(data)

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

        file_path = "template.xlsx"
        wb = opl.load_workbook(file_path)

        ws = wb["国内用"]

        return jsonify({"success": True, "message": "Данные успешно добавленны."}), 200
    else:
        return jsonify({"success": False, "message": "Некоторые данные отсутствуют."}), 400
