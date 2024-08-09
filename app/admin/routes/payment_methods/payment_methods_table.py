# type: ignore

import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.admin.models.payment_metods import PaymentMethods


@bp.route("/admin_menu/payment_methods_table")
@login_required
def payment_methods_table():
    payment_methods = db.session.scalars(
        sa.select(PaymentMethods).order_by(PaymentMethods.order)
    ).all()
    return render_template(
        "admin/payment_methods.html",
        title="Payment Methods Table",
        payment_methods=payment_methods,
    )
