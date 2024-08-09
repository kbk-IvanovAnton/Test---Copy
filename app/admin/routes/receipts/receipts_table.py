# type: ignore

import sqlalchemy as sa
from flask import render_template
from flask_login import login_required

from app import db
from app.admin import bp
from app.admin.models.receipts import Receipts


@bp.route("/admin_menu/receipts_table")
@login_required
def receipts_table():
    receipts = db.session.scalars(sa.select(Receipts).order_by(Receipts.order)).all()
    return render_template("admin/receipts_table.html", title="Receipts Table", receipts=receipts)
