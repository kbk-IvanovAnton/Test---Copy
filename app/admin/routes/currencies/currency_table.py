# type: ignore


import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.admin.models.currencies import Currencies


@bp.route("/admin_menu/currency_table")
@login_required
def currency_table():
    currencies = db.session.scalars(sa.select(Currencies).order_by(Currencies.order)).all()
    return render_template(
        "admin/currency_table.html", title="Currency Table", currencies=currencies
    )
