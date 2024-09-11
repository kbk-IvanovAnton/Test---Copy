from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import db
from app.main import bp
from app.main.forms.order import CompleteOrderForm
from app.main.models.details import Details
from app.main.models.order import Order
from app.main.models.rates import Rates


@bp.route("/create_order", methods=["GET", "POST"])
@login_required
def create_order():
    form = CompleteOrderForm(request.form)
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
            detail = Details(
                row=index,
                account_item_id=detail_data["account_item_id"],
                content=detail_data["content"],
                applying_date=detail_data["applying_date"],
                currency_id=detail_data["currency_id"],
                unit_price=detail_data["unit_price"],
                quantity=detail_data["quantity"],
                payment_method_id=detail_data["payment_method_id"],
                receipt_id=detail_data["receipt_id"],
                remarks=detail_data["remarks"],
            )
            order.details.append(detail)

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
