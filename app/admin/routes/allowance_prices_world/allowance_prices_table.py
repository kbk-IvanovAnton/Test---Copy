# type: ignore

import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.admin.models.allowance_prices_japan import AllowancePricesJapan
from app.admin.models.allowance_prices_world import AllowancePricesWorld


@bp.route("/admin_menu/allowance_prices_table")
@login_required
def allowance_prices_table():
    allowance_prices_world = db.session.scalars(sa.select(AllowancePricesWorld)).all()
    allowance_prices_japan = db.session.scalars(sa.select(AllowancePricesJapan)).all()
    return render_template(
        "admin/allowance_prices_table.html",
        title="Allowance Prices Table",
        allowance_prices_world=allowance_prices_world,
        allowance_prices_japan=allowance_prices_japan,
    )
