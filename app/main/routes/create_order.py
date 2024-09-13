import datetime

from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import db
from app.main import bp
from app.main.forms.order import CompleteOrderForm
from app.main.models.allowance_lodgments import AllowanceLodgments
from app.main.models.allowance_moves import AllowanceMoves
from app.main.models.allowance_special_cases import AllowanceSpecialCases
from app.main.models.allowance_specials import AllowanceSpecials
from app.main.models.allowance_works import AllowanceWorks
from app.main.models.allowances import Allowances
from app.main.models.details import Details
from app.main.models.order import Order
from app.main.models.rates import Rates


@bp.route("/create_order", methods=["GET", "POST"])
@login_required
def create_order():
    form = CompleteOrderForm(request.form)
    # data = request.get_json()
    # print("Form data before validation:", form.data)
    if form.validate_on_submit():
        order = Order(
            name_id=form.order.name_id.data,
            order=form.order.order.data,
            order_number=form.order.order_number.data,
            detail_number=form.order.detail_number.data,
            service_number=form.order.service_number.data,
            service_card_number=form.order.service_card_number.data,
            quote_number=form.order.quote_number.data,
            purchase_order_number=form.order.purchase_order_number.data,
            travel_id=form.order.travel_id.data,
            support_type_id=form.order.support_type_id.data,
        )
        # print("Form data after validation:", form.data)

        for rate_data in form.rates.data:
            rate = Rates(
                currency_id=rate_data["currency_id"],
                foreign_currency=rate_data["foreign_currency"],
                temporary_payment=rate_data["temporary_payment"],
                remaining_payment=rate_data["remaining_payment"],
            )
            order.rates.append(rate)

        for index, detail_data in enumerate(form.details.data, start=1):

            unit_price_str = detail_data["unit_price"]

            if unit_price_str:
                unit_price = float(unit_price_str.replace(",", ""))
            else:
                unit_price = 0.0

            detail = Details(
                row=index,
                account_item_id=detail_data["account_item_id"],
                content=detail_data["content"],
                applying_date=detail_data["applying_date"],
                currency_id=detail_data["currency_id"],
                unit_price=unit_price,
                quantity=detail_data["quantity"],
                payment_method_id=detail_data["payment_method_id"],
                receipt_id=detail_data["receipt_id"],
                remarks=detail_data["remarks"],
            )
            order.details.append(detail)

        # print(data)

        # accomodation_unit_price = data.get("accomodationUnitPrice")
        # accomodation_days = data.get("accomodationDays")
        # accomodation_allowance_check = data.get("accomodationAllowanceCheck")
        # accomodation_sum_days = data.get("accomodationSumDays")

        # event_work_dates = data.get("workDates")
        # unit_work_price = data.get("unitWorkPrice")
        # work_days = data.get("workDays")

        # event_special_dates = data.get("eventSpecialDates")
        # unit_special_price = data.get("unitSpecialPrice")
        # special_days = data.get("specialDays")

        # event_exception_dates = data.get("eventExeptionDates")
        # unit_exception_price = data.get("exeptionAllowanceUnitPrice_Int")
        # exception_days = data.get("exeptionAllowanceDays_Int")

        # move_events = data.get("moveEvents")
        # move_days = data.get("moveDays")
        # move_ids = data.get("moveIDs")
        # move_prices = data.get("movePrices")

        # start_year = int(data.get("startYear"))
        # start_month = int(data.get("startMonth"))
        # start_day = int(data.get("startDay"))
        # end_year = int(data.get("endYear"))
        # end_month = int(data.get("endMonth"))
        # end_day = int(data.get("endDay"))

        # calendar_dates = data.get("calendarDates")

        # earliest_date = datetime.date(start_year, start_month, start_day)
        # oldest_date = datetime.date(end_year, end_month, end_day)

        # if data:
        #     new_allowance = Allowances(
        #         departure_date=earliest_date,
        #         return_date=oldest_date,
        #         calendars=calendar_dates,
        #     )
        #     new_allowance.allowance_move = AllowanceMoves(
        #         location_ids=move_ids,
        #         applying_dates=move_events,
        #         unit_prices=move_prices,
        #         days=move_days,
        #     )
        #     new_allowance.allowance_special_case = AllowanceSpecialCases(
        #         applying_date=event_exception_dates,
        #         unit_price=unit_exception_price,
        #         days=exception_days,
        #     )
        #     new_allowance.allowance_special = AllowanceSpecials(
        #         applying_dates=event_special_dates,
        #         unit_prices=unit_special_price,
        #         days=special_days,
        #     )
        #     new_allowance.allowance_work = AllowanceWorks(
        #         applying_dates=event_work_dates,
        #         unit_prices=unit_work_price,
        #         days=work_days,
        #     )
        #     new_allowance.allowance_lodgment = AllowanceLodgments(
        #         unit_price=int(accomodation_unit_price),
        #         days=int(accomodation_days),
        #         validity=bool(accomodation_allowance_check),
        #         applying_date=accomodation_sum_days,
        #     )
        # order.allowances.append(new_allowance)

        db.session.add(order)
        db.session.commit()

        return redirect(url_for("main.index"))

    # if not form.validate_on_submit():
    #     print("Form errors:", form.errors)
    #     print("Order errors:", form.order.errors)
    #     for i, rate in enumerate(form.rates):
    #         print(f"Rate {i} errors:", rate.errors)
    #     for i, detail in enumerate(form.details):
    #         print(f"Detail {i} errors:", detail.errors)
    #     print("CSRF Token:", form.csrf_token.current_token)

    # if form.errors:
    #     flash("Пожалуйста, исправьте ошибки в форме", "error")

    return render_template("main/create_order_japan.html", title="Create Order", form=form)
