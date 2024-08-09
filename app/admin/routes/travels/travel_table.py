# type: ignore

import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.admin.models.travel import Travel


@bp.route("/admin_menu/travel_table")
@login_required
def travel_table():
    travels = db.session.scalars(sa.select(Travel).order_by(Travel.order)).all()
    return render_template("admin/travel_table.html", title="Travel Table", travels=travels)
